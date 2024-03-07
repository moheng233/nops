<template>
    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
                {{ t('admin.actions.invite') }}
            </h1>
            <p class="text-sm text-muted-foreground">
                {{ t('auth.invite_into_continue') }}
            </p>
        </div>

        <div class="grid gap-6">

            <CFormSubmit v-slot="{ submit, isLoading }">
                <Button @click="submit" :disabled="isLoading">
                    {{ t('auth.create') }}
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