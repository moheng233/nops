<template>
    <AppLayout>
        <template #menu>
            <AppMenuCategory label="Home">
                <AppMenuItem icon="pi pi-fw pi-home" label="Dashboard" to="/admin"></AppMenuItem>
            </AppMenuCategory>
        </template>
        <RouterView></RouterView>
    </AppLayout>
</template>
<script setup lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
import AppMenuCategory from '../layouts/AppMenuCategory.vue';
import AppMenuItem from '../layouts/AppMenuItem.vue';
</script>