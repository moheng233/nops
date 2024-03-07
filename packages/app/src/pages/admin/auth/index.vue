<template>
    <div class="grid grid-cols-1">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">

            </CardHeader>
            <CardContent>
                <DataTable :table>
                            <template #pagination>
                        <DataTablePagination :table class="justify-between">
                                <div>
                                <Button variant="outline">{{ t('admin.actions.invite') }}</Button>
                                </div>
                        </DataTablePagination>
                    </template>
                </DataTable>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useVueTable, createColumnHelper, getCoreRowModel, getPaginationRowModel, CellContext } from "@tanstack/vue-table";

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
    }),
    helper.display({
        id: "action",
        header: () => t('admin.action'),
        cell: (cell) => h('div', { class: "flex space-x-4" }, [
            h(Button, { variant: "outline" }, t('admin.actions.edit')),
            h(Button, { variant: "outline" }, t('admin.actions.delete'))
        ])
    })
];


const users = ref<IUser[]>([...Array(50).keys()].map(i => {
    return {
        id: i.toString(),
        email: `test${i}@qq.com`,
        role: "ADMIN"
    };
}));

const table = useVueTable({
    data: users.value,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
});

</script>
