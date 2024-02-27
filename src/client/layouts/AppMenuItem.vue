<template>
    <li>
        <RouterLink :to="props.to">
            <i :class="props.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ props.label }}</span>
        </RouterLink>
    </li>
</template>
    
<script setup lang="ts">
import { RouteNamedMap } from 'vue-router/auto-routes';



const props = defineProps<{
    icon: string,
    label: string,
    to: RouteNamedMap[keyof RouteNamedMap]['path']
}>();

</script>