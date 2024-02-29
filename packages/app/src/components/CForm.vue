<template>
    <slot :context="context">

    </slot>
</template>
<script lang="ts">
import { $Keys } from "utility-types";

export interface CFormContext<T extends Record<string, any>> {
    public change<K extends $Keys<T>>(field: K, value: T[K]): void;
    public get<K extends $Keys<T>>(field: K): T[K];
}
</script>
<script setup lang="ts" generic="T extends Record<string, any>">

const props = defineProps<{
    modelValue: T
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: T): void,
}>();

const context: CFormContext<T> = {
    change(field, value) {
        props.modelValue[field] = value;
        emit('update:modelValue', props.modelValue);
    },
    get(field) {
        return props.modelValue[field];
    },
};

defineSlots<{
    default(props: { context: CFormContext<T> }): any
}>();

</script>