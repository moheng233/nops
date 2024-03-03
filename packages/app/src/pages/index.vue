<template>
    <div class="dock-demo">
        <div class="dock-window dock-advanced flex flex-column">
            <Menubar style="height: 3vh;user-select: none">
                <template #start>
                    <i @click="() => visible = true" class="pi pi-apple px-2"></i>
                </template>

                <template #end>
                    <i class="pi pi-video px-2" />
                    <i class="pi pi-wifi px-2" />
                    <i class="pi pi-volume-up px-2" />
                    <span class="px-2">{{ d(Date.now()) }}</span>
                    <i class="pi pi-search px-2" />
                    <i class="pi pi-bars px-2" />
                </template>
            </Menubar>

            <div class="flex-grow-1" @drop="onLayerDrop" @dragover="onLayerDragOver">
                <CLayer v-model="visible" icon="pi-video" title="Test" :width="100" :height="200">
                    <CForm :context="form">
                        <label for="username" class="block text-900 text-xl font-medium mb-2">
                            {{ t("admin.email") }}
                        </label>
                        <InputText type="email" v-model="field.email.value" :placeholder="t('admin.email')"
                            class="w-full mb-3" inputClass="w-full" style="padding: 1rem" />

                        <label for="password"
                            class="block text-900 font-medium text-xl mb-2">{{ t("password") }}</label>
                        <Password id="password" v-model="field.password.value" :placeholder="t('password')"
                            :toggleMask="true" class="w-full mb-3" inputClass="w-full"
                            :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme" binary class="mr-2"></Checkbox>
                                <label for="rememberme">{{ t("auth.remember_me") }}</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">{{ t("auth.forgot_password") }}</a>
                        </div>
                        <CFormSubmit v-slot="{ submit }">
                            <Button :label="t('auth.sign_in')" @click="() => submit()"
                                class="w-full p-3 text-xl"></Button>
                        </CFormSubmit>
                    </CForm>
                </CLayer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import typia, { tags } from "typia";
import { CLayer } from "@nops/layer";
import { useForm, CForm, CFormSubmit } from "@nops/form";
const { t, d } = useI18n();

const visible = ref(false);
const [field, form] = useForm({
    email: "" as string & tags.Format<"email"> & tags.MaxLength<30>,
    password: "" as string & tags.MinLength<8> & tags.MaxLength<20>
}, {
    onValidate(data) {
        return typia.validate<typeof data>(data);
    },
    onSubmit(data) {
        console.log(data);
        return false;
    }
});

function onLayerDragOver(ev: DragEvent) {
    ev.preventDefault();
    ev.dataTransfer!.dropEffect = "move";
}

function onLayerDrop(ev: DragEvent) {
    ev.preventDefault();
}
</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
}
</style>

<style scoped>
.dock-demo>.dock-window {
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url("https://primefaces.org/cdn/primevue/images/dock/window.jpg");
    background-repeat: no-repeat;
    background-size: cover;

}

.dock-demo .p-menubar {
    padding: 0;
    border-radius: 0;
}
</style>
