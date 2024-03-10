<script setup lang="ts">
</script>

<template>
    <div class="border-b">
        <div class="flex h-16 items-center px-4">
            <slot name="header"></slot>
            <nav class="flex items-center space-x-4 lg:space-x-6">
                <slot></slot>
            </nav>
            <slot name="flooter">

            </slot>
        </div>
    </div>
</template>

<style></style>
