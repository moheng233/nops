<template>
    <Dropdown v-model="value" :options="roles" option-label="label" option-value="value">
        <template #value="{ value }">
            <Tag v-if="value" :value="roles.find(r => r.value == value)?.label"></Tag>
        </template>
        <template #option="{ option }">
            <Tag :value="option.label"></Tag>
        </template>
    </Dropdown>
</template>

<script setup lang="ts">
const value = defineModel<string>();

const { t } = useI18n();

const roles = reactive([
    { label: t('admin.roles.admin'), value: "ADMIN" },
    { label: t('admin.roles.user'), value: "USER" }
]);

</script>