import { Ref, inject, ref } from "vue";
import { makeDestructurable } from "@vueuse/core";
import { IValidation } from "typia";
import { $Keys } from "utility-types";
import { InjectionKey } from "vue";

export type MaybePromise<T> = Promise<T> | T;

export type FormValues = string | number | boolean;
export type FormObj = {
    [K in string]: FormValues
};
export type FormRefs<O extends FormObj> = {
    [K in keyof O]: Ref<O[K]>
};

export type FormValidateFn<O extends FormObj> = (obj: Readonly<O>) => MaybePromise<IValidation<O>>;

export type FormSubmitFn<O extends FormObj> = (obj: Readonly<O>) => MaybePromise<boolean>;

export type FormContext<O extends FormObj> = {
    keys: $Keys<O>[],
    reset: () => void,
    validate: (data?: Readonly<O>) => MaybePromise<IValidation<O>>,
    submit: (data?: Readonly<O>) => Promise<boolean>
};

function getRefsFromObj<O extends FormObj>(obj: O) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, ref(value)])) as FormRefs<O>;
}

function getObjFromRefs<O extends FormObj>(refs: FormRefs<O>) {
    return Object.fromEntries(Object.entries(refs).map(([key, r]) => [key, r.value])) as O;
}

export const FormContextKey = Symbol() as InjectionKey<FormContext<any>>;

export function useFormContext<O extends FormObj>() {
    return inject(FormContextKey) as FormContext<O>;
}

export function useForm<O extends FormObj>(obj: O, options?: { onValidate?: FormValidateFn<O>, onSubmit?: FormSubmitFn<O> }) {
    const keys = Object.keys(obj) as $Keys<O>[];
    const refs = getRefsFromObj(obj);

    const actions = {
        keys,
        reset() {
            for (const key of keys) {
                refs[key].value = obj[key];
            }
        },
        async validate(data?: Readonly<O>) {
            if (data == undefined) {
                data = getObjFromRefs(refs);
            }

            if (options?.onValidate != undefined) {
                return await options.onValidate(data);
            }

            return {
                success: true,
                data,
                errors: []
            } as IValidation.ISuccess<O>;
        },
        async submit(data?: Readonly<O>) {
            if (data == undefined) {
                data = getObjFromRefs(refs);
            }

            if (options?.onSubmit != undefined) {
                return await options.onSubmit(data);
            }

            return false;
        }
    } satisfies FormContext<O>;

    return makeDestructurable(
        { refs, actions } as const,
        [refs, actions] as const,
    );
}

export type UseFormReturn<O extends FormObj> = ReturnType<typeof useForm<O>>;
export type UseFormObj<U> = U extends typeof useForm<infer O extends FormObj> ? O : unknown;
