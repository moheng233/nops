<template>
    <div class="layout-warpper">
        <AppTopbar></AppTopbar>
        <div class="layout-sidebar">
            <AppMenu>
                <slot name="menu"></slot>
            </AppMenu>
        </div>
        <div class="layout-main-container">
            <div class="layout-main">
                <slot></slot>
            </div>
        </div>
        <div class="layout-mask"></div>
    </div>
</template>
<script setup lang="ts">
import AppMenu from './AppMenu.vue';
import AppTopbar from './AppTopbar.vue';
</script>
<style lang="scss">

</style>