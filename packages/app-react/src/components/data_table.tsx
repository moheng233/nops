import { flexRender, type Table as RTable } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { HTMLAttributes, ReactNode } from "react";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

export type DataTableProps<TData> = {
    table: RTable<TData>;
    children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export function DataTable<TData>({
    table,
    children,
    ...props
}: DataTableProps<TData>) {
    return (
        <Table className='grid rounded-md border' {...props}>
            <TableHeader key={"header"} className='z-1 sticky top-0 grid'>
                {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id} className='flex w-[100%]'>
                        {hg.headers.map((h) => (
                            <TableHead
                                key={h.id}
                                className='flex justify-center items-center'
                                style={{ width: `${h.getSize()}px` }}
                            >
                                <div
                                    {...{
                                        className: h.column.getCanSort()
                                            ? "cursor-pointer select-none"
                                            : "",
                                        onClick:
                                            h.column.getToggleSortingHandler,
                                    }}
                                >
                                    {h.isPlaceholder
                                        ? null
                                        : flexRender(
                                              h.column.columnDef.header,
                                              h.getContext(),
                                          )}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow> 
                ))}
            </TableHeader>
            {children != undefined ? (
                children
            ) : (
                <DataTableRows table={table}></DataTableRows>
            )}
        </Table>
    );
}

export function DataTableRows<TData>({
    table,
    ...props
}: {
    table: RTable<TData>;
} & Omit<HTMLAttributes<HTMLTableCaptionElement>, "children">) {
    return (
        <TableBody className='grid relative' key={"body"} {...props}>
            {table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    className="flex absolute "
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='h-fit'>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}

export function DataTableVirtuailzerRows<
    TData,
    TScrollElement extends Element | Window,
    TItemElement extends Element,
>(props: {
    table: RTable<TData>;
    virtualizer: Virtualizer<TScrollElement, TItemElement>;
}) {
    return (
        <TableBody
            className='grid relative'
            style={{ height: `${props.virtualizer.getTotalSize()}px` }}
        >
            {props.virtualizer.getVirtualItems().map((vi) => {
                const row = props.table.getRowModel().rows[vi.index];
                return (
                    <TableRow
                        key={row.id}
                        className='absolute flex '
                        style={{
                            height: `${vi.size}px`,
                            transform: `translateY(${vi.start}px)`,
                        }}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell
                                key={cell.id}
                                className='flex items-center justify-center'
                                style={{ width: cell.column.getSize() }}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </TableBody>
    );
}

export function DataTablePagination<TData>(props: { table: RTable<TData> }) {
    return props.table._getPaginationRowModel ? (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={props.table.previousPage}
                    ></PaginationPrevious>
                </PaginationItem>

                {props.table.getPageOptions().map((option) => (
                    <PaginationItem>
                        <PaginationLink
                            isActive={
                                props.table.getState().pagination.pageIndex ==
                                option
                            }
                            onClick={() => props.table.setPageIndex(option)}
                        >
                            {option + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={props.table.nextPage}
                    ></PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ) : null;
}

export function DataTableHeadFilter() {
    
}
