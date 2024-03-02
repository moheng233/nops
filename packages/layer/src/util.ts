import type { UseElementBoundingReturn } from "@vueuse/core";
import type { InjectionKey } from "vue";

export const LayerContainerKey = Symbol() as InjectionKey<UseElementBoundingReturn>;
