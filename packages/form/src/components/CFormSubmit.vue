<template>
    <slot :submit="context!.submit"></slot>
</template>

<script setup lang="ts" generic="O extends FormObj">
import { inject } from "vue";
import { FormContextKey, FormContext, FormObj } from "../util";
import { assert } from "@vueuse/core";

const context = inject(FormContextKey) as FormContext<O>;

assert(context != undefined);

defineSlots<{
    default: (props: { submit:  FormContext<O>["submit"]}) => any;
}>();

</script>
