import { makeDestructurable } from "@vueuse/core";
import { IValidation } from "typia";
import { InjectionKey, Ref, inject, ref, type SetupContext, EmitsOptions, Slot, SlotsType } from "vue";

export type MaybePromise<T> = Promise<T> | T;

export type FormValue = string | number | boolean;
export type FormObj = Record<string, FormValue>;

export type FormRef<V extends FormValue, K extends any> = Ref<V> & { field: K };
export type FormRefs<O extends FormObj> = {
    [K in keyof O]: FormRef<O[K], K>
};

export type FormValidateFn<O extends FormObj> = (obj: O) => MaybePromise<IValidation<O>>;

export type FormSubmitFn<O extends FormObj> = (obj: IValidation<O>) => MaybePromise<boolean>;

export type FormContext<O extends FormObj> = {
    fields: (keyof O)[],
    refs: FormRefs<O>,
    isLoading: Ref<boolean>,
    reset: () => void,
    validate: (data?: Readonly<O>) => MaybePromise<IValidation<O>>,
    submit: () => Promise<boolean>
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

function useFormField<O extends FormObj>(form: FormContext<O>) {
    return <F extends keyof O>(props: { field: F }, context: SetupContext<EmitsOptions, SlotsType<{
        default: { value: Ref<O[F]>, field: F, isLoading: Ref<boolean> }
    }>>) => {
        return context.slots.default({ value: form.refs[props.field], field: props.field, isLoading: form.isLoading });
    };
}

function useFormSubmit<O extends FormObj>(form: FormContext<O>) {
    return (props: {}, context: SetupContext<EmitsOptions, SlotsType<{
        default: { submit:  () => Promise<boolean>, isLoading: Ref<boolean>}
    }>>) => {
        return context.slots.default({ submit: form.submit, isLoading: form.isLoading });
    };
}

export function useForm<O extends FormObj>(obj: O, options?: { onValidate?: FormValidateFn<O>, onSubmit?: FormSubmitFn<O> }) {
    const fields = Object.keys(obj) as (keyof O)[];
    const refs = getRefsFromObj(obj);
    const isLoading = ref(false);

    const form: FormContext<O> = {
        fields,
        refs,
        isLoading,
        reset() {
            for (const key of fields) {
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
        async submit() {
            const data = getObjFromRefs(refs);

            if (options?.onSubmit != undefined) {
                isLoading.value = true;
                try {
                    const ret = await options.onSubmit(await form.validate(data));
                } finally {
                    isLoading.value = false;
                }
            }

            return false;
        }
    };

    const FormField = useFormField(form);
    const FormSubmit = useFormSubmit(form);

    return makeDestructurable(
        { FormField, FormSubmit, form } as const,
        [FormField, FormSubmit, form] as const,
    );
}

export type UseFormReturn<O extends FormObj> = ReturnType<typeof useForm<O>>;
export type UseFormObj<U> = U extends typeof useForm<infer O extends FormObj> ? O : unknown;
