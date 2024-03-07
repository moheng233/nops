<template>
    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
                {{ t('auth.sign_in') }}
            </h1>
            <p class="text-sm text-muted-foreground">
                {{ t('auth.sign_into_continue') }}
            </p>
        </div>

        <div class="grid gap-6">
            <div class="grid gap-2">
                <CFormField field="email" v-slot="{ value, field, isLoading }">
                    <div class="grid gap-1">
                        <Label class="sr-only" :for="field">{{ t('admin.email') }}</Label>
                        <Input placeholder="name@example.com" type="email" autocapitalize="none" autocomplete="email"
                            :disabled="isLoading.value" v-model="value.value" />
                    </div>
                </CFormField>
                <CFormField field="password" v-slot="{ value, field, isLoading }">
                    <div class="grid gap-1">
                        <Label class="sr-only" :for="field">{{ t('password') }}</Label>
                        <Input :placeholder="t('password')" type="password" autocapitalize="none"
                            :disabled="isLoading.value" autocomplete="current-password" v-model="value.value" />
                    </div>
                </CFormField>
            </div>

            <CFormSubmit v-slot="{ submit, isLoading }">
                <Button @click="submit" :disabled="isLoading">
                    {{ t('auth.sign_in') }}
                </Button>
            </CFormSubmit>
        </div>

        <p class="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            <a href="/terms" class="underline underline-offset-4 hover:text-primary">
                Terms of Service
            </a>
            and
            <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
                Privacy Policy
            </a>
            .
        </p>
    </div>
</template>

<script setup lang="ts">
import { useForm } from '@nops/form';
import { promiseTimeout } from '@vueuse/core';
import typia, { tags } from 'typia';


const { t } = useI18n();

const [CFormField, CFormSubmit] = useForm({
    email: "" as string & tags.Format<"email"> & tags.MaxLength<30>,
    password: "" as string & tags.MinLength<8> & tags.MaxLength<20>
}, {
    onValidate(data) {
        return typia.validate(data);
    },
    async onSubmit(data) {
        console.log(data);
        await promiseTimeout(2000);
        return true;
    }
});

</script>
