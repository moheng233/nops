<template>
    <slot :submit="context!.submit"></slot>
</template>

<script setup lang="ts">
import { FormContext, useFormContext } from "../util";
import { assert } from "@vueuse/core";

const context = useFormContext();

assert(context != undefined);

defineSlots<{
    default: (props: { submit:  FormContext<any>["submit"]}) => any;
}>();

</script>
