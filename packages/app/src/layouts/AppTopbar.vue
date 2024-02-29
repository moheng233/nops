<script setup lang="ts">
</script>
<template>
    <div class="layout-topbar">
        <RouterLink to="/" class="layout-topbar-logo">
            <img alt="logo" src="/logo.png" />
            <span>Nops</span>
        </RouterLink>

        <div class="layout-topbar-menu">
            <slot></slot>
        </div>
    </div>
</template>
<style>
</style>