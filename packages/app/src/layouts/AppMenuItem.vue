<template>
    <RouterLink :to="props.to" custom v-slot="{ isExactActive, navigate }">
        <li :class="{ 'active-menuitem': isExactActive }">
            <a @click="navigate" :class="{ 'active-route': isExactActive }">
                <i :class="props.icon" class="layout-menuitem-icon"></i>
                <span class="layout-menuitem-text">{{ props.label }}</span>
            </a>
        </li>
    </RouterLink>
</template>
    
<script setup lang="ts">
import { RouteNamedMap } from 'vue-router/auto-routes';

const props = defineProps<{
    icon: string,
    label: string,
    to: RouteNamedMap[keyof RouteNamedMap]['path']
}>();

</script>