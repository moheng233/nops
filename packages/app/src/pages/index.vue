<template>
    <div class="dock-demo">
        <div class="dock-window dock-advanced">
            <Menubar style="height: 3vh;">
                <template #start>
                    <i class="pi pi-apple px-2"></i>
                </template>
                <template #end>
                    <i class="pi pi-video px-2" />
                    <i class="pi pi-wifi px-2" />
                    <i class="pi pi-volume-up px-2" />
                    <span class="px-2">{{ d(Date.now()) }}</span>
                    <i class="pi pi-search px-2" />
                    <i class="pi pi-bars px-2" />
                </template>
            </Menubar>

            <Dock :model="docks">
                <template #item="{ item }">
                    <div v-tooltip="item.label" href="#" class="p-dock-link" >
                        <img :src="item.icon" style="width: 100%;" />
                    </div>
                </template>
            </Dock>
        </div>
    </div>
</template>

<script setup lang="ts">
import vTooltip from "primevue/tooltip";
import { useTimeAgo } from "@vueuse/core";

const { t, d } = useI18n();


const docks = ref([
    {
        label: 'Finder',
        icon: "https://primefaces.org/cdn/primevue//images/dock/finder.svg",
        command: () => {
            
        }
    },
    {
        label: 'Terminal',
        icon: "https://primefaces.org/cdn/primevue//images/dock/terminal.svg",
        command: () => {
            
        }
    },
    {
        label: 'App Store',
        icon: "https://primefaces.org/cdn/primevue//images/dock/appstore.svg",
        command: () => {
            
        }
    },
    {
        label: 'Safari',
        icon: "https://primefaces.org/cdn/primevue//images/dock/safari.svg",
        command: () => {
            
        }
    },
    {
        label: 'Photos',
        icon: "https://primefaces.org/cdn/primevue//images/dock/photos.svg",
        command: () => {
            
        }
    },
    {
        label: 'GitHub',
        icon: "https://primefaces.org/cdn/primevue//images/dock/github.svg",
    },
    {
        label: 'Trash',
        icon: "https://primefaces.org/cdn/primevue//images/dock/trash.png",
        command: () => {
            
        }
    }
]);

</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
}
</style>

<style scoped>
.dock-demo>.dock-window {
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url("https://primefaces.org/cdn/primevue/images/dock/window.jpg");
    background-repeat: no-repeat;
    background-size: cover;

}

.dock-demo .p-menubar {
    padding: 0;
    border-radius: 0;
}
</style>