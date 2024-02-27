<template>
    <div class="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <div class="">
                    <h5>{{ t('admin.user') }}</h5>
                </div>
                <DataTable :value="users" v-model:editing-rows="editing" edit-mode="row" data-key="id">
                    <Column style="width: 20%;" field="username" :header="t('username')">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]"></InputText>
                        </template>
                    </Column>
                    <Column style="width: 10%;" field="role" :header="t('admin.role')">
                        <template #body="{ data, field }">
                            <Tag v-if="data[field] == 'ADMIN'" :value="t('admin.roles.admin')"></Tag>
                            <Tag v-if="data[field] == 'USER'" :value="t('admin.roles.user')"></Tag>
                        </template>
                        <template #editor="{ data, field }">
                            <Dropdown v-model="data[field]" :options="roles" option-label="label" option-value="value">
                                <template #value="{ value, placeholder }">
                                    <Tag v-if="value" :value="roles.find(r => r.value == value)?.label"></Tag>
                                </template>
                                <template #option="{ option }">
                                    <Tag :value="option.label"></Tag>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column row-editor style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
const { t } = useI18n();

const roles = reactive([
    { label: t('admin.roles.admin'), value: "ADMIN" },
    { label: t('admin.roles.user'), value: "USER" }
]);

const editing = ref([]);

const users = ref([
    {
        id: 1,
        username: "test",
        role: "ADMIN"
    }
]);

</script>