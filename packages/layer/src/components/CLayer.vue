<template>
    <div ref="popover" :class="{ hide: isDragging }" :show="visible" :style="[{ 'left': x + 'px', 'top': y + 'px' }]"
        class="layer" @dragstart="onLayerDragStart" @dragend="onLayerDragEnd" draggable="true">
        <Menubar style="user-select: none" ref="handle">
            <template #start>
                <div class="flex">
                    <div class="icon flex justify-content-center">
                        <i class="pi" :class="props.icon"></i>
                    </div>
                    <div class="px-1 flex align-items-center">
                        <h5>{{ props.title }}</h5>
                    </div>
                </div>
            </template>

            <template #end>
                <Button text outlined icon="pi pi-chevron-downs"></Button>
                <Button text outlined icon="pi pi-window-maximize"></Button>
                <Button text outlined icon="pi pi-times"></Button>
            </template>
        </Menubar>

        <div ref="container" :style="{ width: defineWidth, height: defineHeight }" class="p-3">
            <slot>
                <div>

                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useElementBounding, clamp, assert } from "@vueuse/core";
import { LayerContainerKey } from "../util";
import { inject, ref } from "vue";

const popover = ref<HTMLElement>();
const handle = ref<HTMLElement>();
const container = ref<HTMLElement>();

const isDragging = ref(false);
const dragOffset = ref({
    offsetX: 0,
    offsetY: 0
});

const visible = defineModel<boolean>({ default: false });
const defineWidth = defineModel<number | "auto" | `${number}px`>("width", { default: "auto" });
const defineHeight = defineModel<number | "auto" | `${number}px`>("height", { default: "auto" });
const x = defineModel<number>("x", { default: 0 });
const y = defineModel<number>("y", { default: 0 });

const containerBounding = inject(LayerContainerKey);
const popoverBounding = useElementBounding(popover);
const handleBounding = useElementBounding(handle);

const props = defineProps<{
    icon: string,
    title: string
}>();

function inBounding(x: number, y: number, bounding: typeof handleBounding) {
    return x > bounding.left.value && x < bounding.right.value && y > bounding.top.value && y < bounding.bottom.value;
}

function onLayerDragStart(ev: DragEvent) {
    handleBounding.update();
    if (inBounding(ev.x, ev.y, handleBounding)) {
        isDragging.value = true;

        popoverBounding.update();
        dragOffset.value = {
            offsetX: (ev.x - popoverBounding.left.value),
            offsetY: (ev.y - popoverBounding.top.value)
        };
        ev.dataTransfer?.setDragImage(popover.value!, dragOffset.value.offsetX, dragOffset.value.offsetY);
        ev.dataTransfer!.effectAllowed = "move";
    } else {
        ev.preventDefault();
    }
}

function onLayerDragEnd(ev: DragEvent) {
    assert(containerBounding != undefined);

    x.value = clamp(ev.clientX - dragOffset.value.offsetX, containerBounding!.left.value, containerBounding!.right.value);
    y.value = clamp(ev.clientY - dragOffset.value.offsetY, containerBounding!.top.value, containerBounding!.bottom.value);

    isDragging.value = false;
    ev.preventDefault();
}

</script>

<style scoped>
.layer {
    display: block;
    position: fixed;
    min-width: 300px;
    min-height: 200px;
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    overflow: hidden;
    resize: both;
}

.layer .icon {
    width: 3rem;
    padding: 0.75rem 0;
}

.layer::hover {}

.layer.hide {
    transition: 0.01s;
    opacity: 0;
}

.layer .p-menubar {
    padding: 2px;
    border-radius: 0;
}
</style>
