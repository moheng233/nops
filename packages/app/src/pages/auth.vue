<template>
    <div
        class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <RouterLink to="/auth/login"
            :class="cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')">
            {{ t('auth.sign_in') }}
        </RouterLink>
        <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div class="absolute inset-0 bg-zinc-900" />
            <div class="relative z-20 flex items-center text-lg font-medium">
                <img src="/logo.png" class="mr-2 h-6 w-6" />
                Nops
            </div>
            <div class="relative z-20 mt-auto">
                <blockquote class="space-y-2">
                    <p class="text-lg">
                        &ldquo;This library has saved me countless hours of work and
                        helped me deliver stunning designs to my clients faster than
                        ever before.&rdquo;
                    </p>
                    <footer class="text-sm">
                        Sofia Davis
                    </footer>
                </blockquote>
            </div>
        </div>
        <div class="lg:p-8">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const { t } = useI18n();

const isLogging = ref(false);

const form = reactive({
    email: "",
    password: ""
});
const rememberme = ref(false);

async function login() {
    isLogging.value = true;

}
</script>
