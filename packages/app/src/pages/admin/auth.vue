<template>
    <div>
        <div class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <RouterLink to="/admin/auth" exact-active-class="bg-background text-foreground shadow-sm"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {{ t('admin.categoies.items.user') }}
            </RouterLink>
            <RouterLink to="/admin/auth/roles" exact-active-class="bg-background text-foreground shadow-sm"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {{ t('admin.categoies.items.roles') }}
            </RouterLink>
        </div>
        <div
            class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <RouterView v-slot="{ Component }">
                <Transition>
                    <component :is="Component"></component>
                </Transition>
            </RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>