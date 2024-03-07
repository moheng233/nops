<template>
    <slot :submit="context!.submit" :is-loading="context.isLoading"></slot>
</template>

<script setup lang="ts" generic="O extends FormObj">
import { type Ref } from "vue";
import { FormContext, FormObj, useFormContext } from "../util";
import { assert } from "@vueuse/core";

const context = useFormContext();

assert(context != undefined);

defineSlots<{
    default: (props: { submit:  FormContext<O>["submit"], isLoading: Ref<Boolean>}) => any;
}>();

</script>
