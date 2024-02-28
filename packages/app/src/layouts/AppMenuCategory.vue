<template>
    <li class="layout-root-menuitem">
        <div class="layout-menuitem-root-text">{{ props.label }}</div>
        <Transition name="layout-submenu">
            <ul class="layout-submenu">
                <slot></slot>
            </ul>
        </Transition>
    </li>
</template>
<script setup lang="ts">
const props = defineProps<{
    label: string
}>();
</script>