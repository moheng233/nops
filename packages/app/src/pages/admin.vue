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
    <OverlayPanel ref="settingOverlay">
        <div class="flex flex-column gap-3 w-25rem">
            <div>
                <span class="font-medium text-900 block mb-2">{{ t('admin.toolbar.setting') }}</span>
                <ul class="list-none p-0 m-0 flex flex-column gap-3">
                    <li class="flex align-items-center gap-2">
                        <i class="pi pi-comment"></i>
                        <div class="font-medium">{{ t('admin.toolbar.settings.language') }}</div>
                        <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
                            <Dropdown v-model="locale" :options="Object.keys(messages)"></Dropdown>
                        </div>
                    </li>
                    <li class="flex align-items-center gap-2">
                        <i class="pi pi-palette"></i>
                        <div class="font-medium">{{ t('admin.toolbar.settings.themes') }}</div>
                        <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
                            <Dropdown v-model="theme" :options="themes"></Dropdown>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </OverlayPanel>
</template>
<script setup lang="ts">
import OverlayPanel from "primevue/overlaypanel";
import vTooltip from "primevue/tooltip";
import AppLayout from '../layouts/AppLayout.vue';
import AppMenuCategory from '../layouts/AppMenuCategory.vue';
import AppMenuItem from '../layouts/AppMenuItem.vue';
import { usePrimeVue } from "primevue/config";
import themes from "../assets/themes.json";

const { changeTheme } = usePrimeVue();
const { t, locale, messages } = useI18n();

const theme = ref('aura-light-green');

watch(theme, (newTheme, oldTheme) => {
    changeTheme(oldTheme, newTheme, "theme-link", () => { });
});

const settingOverlay = ref<InstanceType<typeof OverlayPanel>>();
</script>