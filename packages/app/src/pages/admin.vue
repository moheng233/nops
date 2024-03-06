<template>
    <div class="hidden flex-col md:flex">
        <AppTopbar>
            <RouterLink to="/admin" v-slot="{ isExactActive }">
                <span class="text-sm font-medium transition-colors hover:text-primary"
                    :class="{ 'text-muted-foreground': !isExactActive }">
                    {{ t('admin.categoies.items.dashboard') }}
                </span>
            </RouterLink>
            <RouterLink to="/admin/machine" v-slot="{ isActive }">
                <span class="text-sm font-medium transition-colors hover:text-primary"
                    :class="{ 'text-muted-foreground': !isActive }">
                    {{ t('admin.categoies.machine') }}
                </span>
            </RouterLink>
            <RouterLink to="/admin/auth" v-slot="{ isActive }">
                <span class="text-sm font-medium transition-colors hover:text-primary"
                    :class="{ 'text-muted-foreground': !isActive }">
                    {{ t('admin.categoies.auth') }}
                </span>
            </RouterLink>

            <template #flooter>
                <div class="ml-auto flex items-center space-x-4">
                    <div>
                        <Input type="search" class="md:w-[100px] lg:w-[300px]" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" class=" relative h-8 w-8 rounded-full">
                                <Avatar class="h-8 w-8">
                                    <AvatarFallback>Nops</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56" align="end">

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </template>
        </AppTopbar>
        <div class="flex-1 space-y-4 p-8 pt-6">
            <RouterView v-slot="{ Component }">
                <div class=" flex items-center justify-between space-y-2">
                    <h2 class="text-3xl font-bold tracking-tight">
                        {{ t('admin.categoies.items.dashboard') }}
                    </h2>
                </div>
                <component :is="Component"></component>
            </RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppTopbar from '@/components/layouts/AppTopbar.vue';

const { t } = useI18n();
</script>
