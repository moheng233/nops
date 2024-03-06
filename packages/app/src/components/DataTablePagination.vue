<template>
    <div class="flex items-center py-4 space-x-2" v-if="table._getPaginationRowModel">
        <Pagination v-slot="{ page }" :total="table.getRowCount()"
            :items-per-page="table.getState().pagination.pageSize" v-model:page="page" show-edges>
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="item.value" :value="item.value" as-child>
                        <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                            {{ item.value }}
                        </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>

                <PaginationNext />
                <PaginationLast />
            </PaginationList>
        </Pagination>
        <slot></slot>
    </div>
</template>

<script setup lang="ts" generic="O">
import { Pagination, PaginationList, PaginationListItem } from "@/components/ui/pagination";
import { type Table } from "@tanstack/vue-table";

const page = computed({
    get: () => props.table.getState().pagination.pageIndex + 1,
    set: (value) => props.table.setPageIndex(value - 1)
});


const props = defineProps<{
    table: Table<O>,
}>();
</script>
