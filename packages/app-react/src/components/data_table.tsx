import { flexRender, type Table as RTable } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { ElementRef, HTMLAttributes, ReactNode, useRef } from "react";

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
        <Table className={`rounded-md border-collapse border border-slate-400 table`} {...props}>
            <TableHeader className='z-1 sticky top-0'>
                {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id} className='flex absolute w-full'>
                        {hg.headers.map((h) => (
                            <TableHead
                                key={h.id}
                                className='flex border border-slate-300 justify-center items-center'
                                colSpan={h.colSpan}
                                style={{ width: `${h.getSize()}rem` }}
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
                    className="absolute "
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
            className='relative'
            style={{ height: `${props.virtualizer.getTotalSize() + props.virtualizer.options.estimateSize(0)}px` }}
        >
            {props.virtualizer.getVirtualItems().map((vi) => {
                const row = props.table.getRowModel().rows[vi.index];
                return (
                    <TableRow
                        key={row.id}
                        className='absolute flex w-full'
                        style={{
                            height: `${vi.size}px`,
                            transform: `translateY(${vi.start + vi.size}px)`,
                        }}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell
                                key={cell.id}
                                className='flex border border-slate-300 items-center justify-center'
                                style={{ width: `${cell.column.getSize()}rem`}}
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
                    <PaginationItem key={option}>
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
