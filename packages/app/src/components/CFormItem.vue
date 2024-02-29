<template>
<slot :value="value">

</slot>
</template>

<script setup lang="ts" generic="T extends Record<string, any>, K extends $Keys<T>">
import { $Keys } from "utility-types";

import type { CFormContext } from "./CForm.vue";

const { context, field } = defineProps<{
    context: CFormContext<T>
    field: K
}>();

const value = ref<T[K]>();

defineSlots<{
    default: (props: { value: Ref<T[K]> }) => any,
}>();

</script>