<script setup lang="ts">
import Logo from "../assets/image/logo.png";
</script>
<template>
    <div class="layout-topbar">
        <RouterLink to="/" class="layout-topbar-logo">
            <img alt="logo" :src="Logo" />
            <span>Nops</span>
        </RouterLink>

        <div class="layout-topbar-menu">
            <slot></slot>
        </div>
    </div>
</template>
<style>
</style>