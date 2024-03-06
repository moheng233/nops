<template>
    <template v-if="table._getPaginationRowModel">
        <Pagination v-slot="{ page }" :total="table.getPageCount()" show-edges>
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
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
    </template>
</template>

<script setup lang="ts" generic="O">
import { Pagination, PaginationList, PaginationListItem } from "@/components/ui/pagination";
import { type Table } from "@tanstack/vue-table";

const props = defineProps<{
    table: Table<O>,
}>();
</script>