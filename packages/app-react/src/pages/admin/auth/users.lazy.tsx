import { createLazyFileRoute } from "@tanstack/react-router";
import {
    ColumnFiltersState,
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Filter } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";

import { DataTable, DataTableVirtuailzerRows } from "@/components/data_table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export const Route = createLazyFileRoute("/admin/auth/users")({
    component: UsersComponent,
});

type EditerState = false | number;

function UsersComponent() {
    const { t } = useTranslation();

    interface IUser {
        id: string;
        email: string;
        nickname: string;
        role: string;
    }

    const [users, setUsers] = useImmer<IUser[]>(
        [...Array(500).keys()].map((i) => {
            return {
                id: i.toString(),
                email: `test${i}@qq.com`,
                nickname: "",
                role: i % 2 ? "ADMIN" : "USER",
            };
        }),
    );

    const [globalFilter, setGlobalFilter] = useState("");
    const [editer, setEditer] = useState<EditerState>(false);
    const [columnFilters, setColumnFilters] = useImmer<ColumnFiltersState>([]);

    const helper = createColumnHelper<IUser>();
    const columns = useRef([
        helper.accessor("id", {
            header: "#",
        }),
        helper.accessor("email", {
            header: t("admin.email"),
            enableGlobalFilter: true,
        }),
        helper.accessor("nickname", {
            header: t("nickname"),
            cell(props) {
                return editer === props.row.index ? (
                    <Input></Input>
                ) : (
                    props.cell.getValue()
                );
            },
            enableGlobalFilter: true,
        }),
        helper.accessor("role", {
            header: () => (
                <span className='flex flex-row items-center justify-center'>
                    <span>{t("admin.role")}</span>
                    <Popover>
                        <PopoverTrigger>
                            <Filter size={16} className='mx-1' />
                        </PopoverTrigger>
                        <PopoverContent></PopoverContent>
                    </Popover>
                </span>
            ),
            cell(props) {
                return (
                    <Badge>
                        {t(
                            `admin.roles.${props.cell.getValue().toLowerCase()}`,
                        )}
                    </Badge>
                );
            },
            enableColumnFilter: true,
        }),
        helper.display({
            id: "action",
            header: () => <span>{t("admin.action")}</span>,
            cell: (cell) => (
                <div className='flex justify-end space-x-4'>
                    {editer === cell.row.index ? (
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => setEditer(false)}
                        >
                            {t("admin.actions.cancel")}
                        </Button>
                    ) : (
                        <>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => setEditer(cell.row.index)}
                            >
                                {t("admin.actions.edit")}
                            </Button>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => {
                                    setUsers((u) => {
                                        u.splice(
                                            u.findIndex(
                                                (u) =>
                                                    u.id ===
                                                    cell.row.getValue("id"),
                                            ),
                                            1,
                                        );
                                    });
                                }}
                            >
                                {t("admin.actions.delete")}
                            </Button>
                        </>
                    )}
                </div>
            ),
        }),
    ]);

    const table = useReactTable({
        data: users,
        columns: columns.current,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getRowId(originalRow) {
            return originalRow.id;
        },
        meta: {},
    });

    const divRef = useRef<ElementRef<"div"> | null>(null);

    const virtualizer = useVirtualizer({
        count: table.getRowCount(),
        getScrollElement: () => divRef.current,
        estimateSize: () => 50,
        debug: true,
    });

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                    <Input
                        className='flex-1'
                        placeholder={t("admin.actions.search")}
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    ></Input>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"}>
                                {t("admin.actions.invite")}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent></PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
            <CardContent>
                <div ref={divRef} className='relative h-[700px] overflow-auto'>
                    <DataTable table={table}>
                        <DataTableVirtuailzerRows
                            table={table}
                            virtualizer={virtualizer}
                        ></DataTableVirtuailzerRows>
                    </DataTable>
                </div>
            </CardContent>
            <CardFooter className='flex flex-row justify-between'></CardFooter>
        </Card>
    );
}
