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
            <button class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <button class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button>
        </div>
    </div>
</template>
<style>
</style>