<template>
    <slot></slot>
</template>

<script setup lang="ts" generic="O extends FormObj">
import { provide } from "vue";
import { FormContext, FormContextKey, FormObj } from "../util";

const { context } = defineProps<{
    context: FormContext<O>
}>();

provide(FormContextKey, context);

</script>
