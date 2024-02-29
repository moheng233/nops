<template>
    <OverlayPanel ref="settingOverlay">
        <div class="flex flex-column gap-3 w-25rem">
            <div>
                <span class="font-medium text-900 block mb-2">{{ t('admin.toolbar.setting') }}</span>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">
                        <i class="pi pi-comment"></i>{{ t('admin.toolbar.settings.language') }}
                    </label>
                    <Dropdown class="flex-auto" v-model="locale" :options="Object.keys(messages)"></Dropdown>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">
                        <i class="pi pi-palette"></i>{{ t('admin.toolbar.settings.themes') }}
                    </label>
                    <Dropdown class="flex-auto" v-model="theme" :options="themes"></Dropdown>
                </div>
            </div>
        </div>
    </OverlayPanel>
</template>

<script setup lang="ts">
import { usePrimeVue } from 'primevue/config';
import OverlayPanel from 'primevue/overlaypanel';
import themes from "../assets/themes.json";

const { changeTheme } = usePrimeVue();
const { t, locale, messages } = useI18n();

const theme = ref('lara-light-indigo');

watch(theme, (newTheme, oldTheme) => {
    changeTheme(oldTheme, newTheme, "theme-link", () => { });
});

const settingOverlay = ref<InstanceType<typeof OverlayPanel>>();

defineExpose({
    show: (event: Event, target?: any) => settingOverlay.value?.show(event, target),
    hide: () => settingOverlay.value?.hide()
});

</script>