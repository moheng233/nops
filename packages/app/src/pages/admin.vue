<template>
    <AppLayout>
        <template #toolbar>
            <button v-tooltip.bottom="t('admin.toolbar.profile')" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>{{ t('admin.toolbar.profile') }}</span>
            </button>
            <button v-tooltip.bottom="t('admin.toolbar.setting')" class="p-link layout-topbar-button"
                @click="settingOverlay?.show">
                <i class="pi pi-cog"></i>
                <span>{{ t('admin.toolbar.setting') }}</span>
            </button>
        </template>
        <template #menu>
            <AppMenuCategory :label="t('admin.categoies.home')">
                <AppMenuItem icon="pi pi-fw pi-home" :label="t('admin.categoies.items.dashboard')" to="/admin">
                </AppMenuItem>
            </AppMenuCategory>
            <AppMenuCategory :label="t('admin.categoies.machine')"></AppMenuCategory>
            <AppMenuCategory :label="t('admin.categoies.auth')">
                <AppMenuItem icon="pi pi-fw pi-user" :label="t('admin.categoies.items.user')" to="/admin/auth/users">
                </AppMenuItem>
            </AppMenuCategory>
        </template>
        <div>
            <RouterView>
            </RouterView>
        </div>
    </AppLayout>
    <AppSettingOverlayPanel ref="settingOverlay"></AppSettingOverlayPanel>
</template>
<script setup lang="ts">
import vTooltip from "primevue/tooltip";
import AppLayout from '../layouts/AppLayout.vue';
import AppMenuCategory from '../layouts/AppMenuCategory.vue';
import AppMenuItem from '../layouts/AppMenuItem.vue';
import AppSettingOverlayPanel from "../components/AppSettingOverlayPanel.vue";

const { t } = useI18n();

const theme = ref('lara-light-indigo');

const settingOverlay = ref<InstanceType<typeof AppSettingOverlayPanel>>();
</script>