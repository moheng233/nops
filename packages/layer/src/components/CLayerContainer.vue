<template>
    <div ref="container">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useElementBounding } from "@vueuse/core";
import { provide, ref } from "vue";
import { LayerContainerKey } from "../util";

const container = ref<HTMLElement>();
const bounding = useElementBounding(container);

provide(LayerContainerKey, bounding);

</script>

<style scoped></style>
