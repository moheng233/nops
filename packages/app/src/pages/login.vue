<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="Logo" alt="logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">{{ t("auth.welcome_nops") }}</div>
                        <span class="text-600 font-medium">{{ t("auth.sign_into_continue") }}</span>
                    </div>

                    <div>
                        <label for="username" class="block text-900 text-xl font-medium mb-2">{{ t("username") }}</label>
                        <InputText type="text" :placeholder="t('username')" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="username" />

                        <label for="password" class="block text-900 font-medium text-xl mb-2">{{ t("password") }}</label>
                        <Password id="password" v-model="password" :placeholder="t('password')" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="rememberme" id="rememberme" binary class="mr-2"></Checkbox>
                                <label for="rememberme">{{ t("auth.remember_me") }}</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">{{ t("auth.forgot_password") }}</a>
                        </div>
                        <Button :label="t('auth.sign_in')" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from "../assets/image/logo.png";

const { t } = useI18n();

const username = ref("");
const password = ref("");
const rememberme = ref(false);
</script>