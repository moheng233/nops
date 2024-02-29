<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex flex-wrap align-items-center justify-content-between gap-3 pb-3">
                    <div>
                        <h5>{{ t('admin.categoies.items.user') }}</h5>
                    </div>
                    <div class="flex gap-3">
                        <Button type="button" icon="pi pi-user-plus" rounded text @click="invitePanel?.show"
                            v-tooltip.bottom="t('admin.actions.invite')"></Button>
                        <Button type="button" icon="pi pi-plus" rounded text
                            v-tooltip.bottom="t('admin.actions.create')"></Button>
                    </div>
                </div>
                <DataTable :value="users" v-model:editing-rows="editing" edit-mode="row" data-key="id"
                    v-model:filters="filters" :global-filter-fields="['email', 'role']" paginator :rows="10" show-gridlines>
                    <Column field="id" header="#"></Column>
                    <Column style="width: 20%;" field="email" :header="t('admin.email')">
                        <template #body="{ data }">
                            {{ data['email'] }}
                        </template>
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]"></InputText>
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter"></InputText>
                        </template>
                    </Column>
                    <Column style="width: 10%;" field="role" :header="t('admin.role')">
                        <template #body="{ data, field }">
                            <Tag v-if="data[field] == 'ADMIN'" :value="t('admin.roles.admin')"></Tag>
                            <Tag v-if="data[field] == 'USER'" :value="t('admin.roles.user')"></Tag>
                        </template>
                        <template #editor="{ data, field }">
                            <RoleDropDown v-model="data[field]"></RoleDropDown>
                        </template>
                        <template #filter="{ filterModel }">
                            <RoleDropDown v-model="filterModel.value"></RoleDropDown>
                        </template>
                    </Column>
                    <Column row-editor style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <OverlayPanel ref="invitePanel">
        <div class="flex flex-column w-25rem">
            <div>
                <span class="font-medium text-900 block mb-2">{{ t('admin.actions.invite') }}</span>
                <div class="flex align-items-center gap-3 mb-3">
                    <label for="inviteEmail" class="font-semibold w-6rem">
                        {{ t('admin.email') }}
                    </label>
                    <InputText class="flex-auto" id="inviteEmail" type="email" autocomplete="off"></InputText>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label for="inviteRole" class="font-semibold w-6rem">
                        {{ t('admin.role') }}
                    </label>
                    <RoleDropDown class="flex-auto" id="inviteRole" />
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" :label="t('admin.actions.invite')"></Button>
                </div>
            </div>
        </div>
    </OverlayPanel>
</template> 

<script setup lang="ts">
import { DataTableFilterMeta } from "primevue/datatable";
import OverlayPanel from "primevue/overlaypanel";
import vTooltip from "primevue/tooltip";

const { t } = useI18n();

const invitePanel = ref<OverlayPanel>();

const filters = ref<DataTableFilterMeta>({});
const editing = ref([]);

const users = ref([
    {
        id: 1,
        email: "test@qq.com",
        role: "ADMIN"
    },
    {
        id: 2,
        email: "test2@qq.com",
        role: "ADMIN"
    },
    {
        id: 3,
        email: "test3@qq.com",
        role: "ADMIN"
    }
]);

</script>