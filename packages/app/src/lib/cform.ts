import { SetupContext, Ref, VNode, EmitsOptions, SlotsType, Slot } from "vue";
import { Table, RowData, ColumnDef } from "@tanstack/vue-table";

export type TableColumnSlot<T extends RowData, F extends keyof T> = {
    header: { field: F },
    data: { value: T[F] },
    editor: { value: T[F] }
};

function useTableColumn<T extends RowData>(columns: ColumnDef<T>) {
    return <F extends keyof T>(props: { field: F }, context: SetupContext<EmitsOptions, SlotsType<TableColumnSlot<T, F>>>) => {
        
    }
}

export function useTable<T extends RowData>(table: Table<T>) {
    const columns = [] as ColumnDef<T>;

    const TableColumn = useTableColumn(columns);

    return [TableColumn];
}