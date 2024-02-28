<template>
    <AppLayout>
        <template #toolbar>
            <button class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <button class="p-link layout-topbar-button" @click="settingOverlay?.show">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button>
        </template>
        <template #menu>
            <AppMenuCategory :label="t('admin.home')">
                <AppMenuItem icon="pi pi-fw pi-home" :label="t('admin.dashboard')" to="/admin"></AppMenuItem>
            </AppMenuCategory>
            <AppMenuCategory :label="t('admin.categoies.machine')"></AppMenuCategory>
            <AppMenuCategory :label="t('admin.auth')">
                <AppMenuItem icon="pi pi-fw pi-user" :label="t('admin.user')" to="/admin/auth/users"></AppMenuItem>
            </AppMenuCategory>
        </template>
        <div>
            <RouterView>
            </RouterView>
        </div>
    </AppLayout>
    <OverlayPanel ref="settingOverlay">

    </OverlayPanel>
</template>
<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel';
import AppLayout from '../layouts/AppLayout.vue';
import AppMenuCategory from '../layouts/AppMenuCategory.vue';
import AppMenuItem from '../layouts/AppMenuItem.vue';

const { t } = useI18n();

const settingOverlay = ref<InstanceType<typeof OverlayPanel>>();
</script>