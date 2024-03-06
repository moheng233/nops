<template>
    <div class="grid grid-cols-1">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    {{ t('admin.categoies.items.user') }}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable :table></DataTable>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useVueTable, createColumnHelper, getCoreRowModel } from "@tanstack/vue-table";

const { t } = useI18n();

interface IUser {
    id: string,
    email: string,
    role: string,
}

const helper = createColumnHelper<IUser>();
const columns = [
    helper.accessor('id', {
        header: "#"
    }),
    helper.accessor('email', {
        header: () => t('admin.email')
    }),
    helper.accessor('role', {
        header: () => t('admin.role')
    })
];


const users = ref<IUser[]>([
    {
        id: "1",
        email: "test@qq.com",
        role: "ADMIN"
    },
    {
        id: "2",
        email: "test2@qq.com",
        role: "ADMIN"
    },
    {
        id: "3",
        email: "test3@qq.com",
        role: "ADMIN"
    }
]);

const table = useVueTable({
    data: users.value,
    columns,
    getCoreRowModel: getCoreRowModel()
});

</script>