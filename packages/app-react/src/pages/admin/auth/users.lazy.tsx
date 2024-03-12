import { faker } from "@faker-js/faker/locale/zh_CN";
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
import { type ElementRef, useMemo, useRef, useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const Route = createLazyFileRoute("/admin/auth/users")({
    component: UsersComponent,
});

type EditerState<TData> =
    | {
          index: false;
          temp: null;
      }
    | {
          index: number;
          temp: Partial<TData>;
      };

function UsersComponent() {
    const { t } = useTranslation();

    interface IUser {
        id: string;
        email: string;
        nickname: string;
        role: string;
    }

    faker.seed(8888);
    const [users, setUsers] = useImmer<IUser[]>(
        [...Array(500).keys()].map((i) => {
            return {
                id: faker.string.nanoid(10),
                email: faker.internet.email(),
                nickname: faker.person.fullName(),
                role: i % 2 ? "ADMIN" : "USER",
            };
        }),
    );

    const [globalFilter, setGlobalFilter] = useState("");
    const [editer, setEditer] = useImmer<EditerState<IUser>>({
        index: false,
        temp: null,
    });
    const [columnFilters, setColumnFilters] = useImmer<ColumnFiltersState>([]);

    const helper = createColumnHelper<IUser>();
    const columns = useMemo(
        () => [
            helper.accessor("id", {
                header: "#",
            }),
            helper.accessor("email", {
                header: t("admin.email"),
                enableGlobalFilter: true,
                minSize: 200,
                cell(def) {
                    return editer.index === def.row.index ? (
                        <Input
                            type='email'
                            defaultValue={def.cell.getValue()}
                            onChange={(e) =>
                                (editer.temp["email"] = e.target.value)
                            }
                        ></Input>
                    ) : (
                        def.cell.getValue()
                    );
                },
            }),
            helper.accessor("nickname", {
                header: t("nickname"),
                cell(def) {
                    return editer.index === def.row.index ? (
                        <Input
                            defaultValue={def.cell.getValue()}
                            onChange={(e) =>
                                (editer.temp["nickname"] = e.target.value)
                            }
                        ></Input>
                    ) : (
                        def.cell.getValue()
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
                cell(def) {
                    return editer.index === def.row.index ? (
                        <Select
                            defaultValue={def.cell.getValue()}
                            onValueChange={(e) => (editer.temp["role"] = e)}
                        >
                            <SelectTrigger>
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='ADMIN'>
                                    <Badge>{t(`admin.roles.admin`)}</Badge>
                                </SelectItem>
                                <SelectItem value='USER'>
                                    <Badge>{t(`admin.roles.user`)}</Badge>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    ) : (
                        <Badge>
                            {t(
                                `admin.roles.${def.cell.getValue().toLowerCase()}`,
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
                        {editer.index === cell.row.index ? (
                            <>
                                <Button
                                    size={"sm"}
                                    variant={"outline"}
                                    onClick={() => {
                                        const temp = editer.temp;
                                        setEditer({ index: false, temp: null });
                                        setUsers((users) => {
                                            users[cell.row.index] = {
                                                ...users[cell.row.index],
                                                ...temp,
                                            };
                                        });
                                    }}
                                >
                                    {t("admin.actions.save")}
                                </Button>
                                <Button
                                    size={"sm"}
                                    variant={"outline"}
                                    onClick={() =>
                                        setEditer({ index: false, temp: null })
                                    }
                                >
                                    {t("admin.actions.cancel")}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    size={"sm"}
                                    variant={"outline"}
                                    onClick={() =>
                                        setEditer({
                                            index: cell.row.index,
                                            temp: {},
                                        })
                                    }
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
        ],
        [editer, helper, setEditer, setUsers, t],
    );

    const table = useReactTable({
        data: users,
        columns: columns,
        state: {
            columnFilters,
            globalFilter,
        },
        getRowId(originalRow) {
            return originalRow.id;
        },
        enableColumnResizing: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
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
                <div
                    ref={divRef}
                    className='relative h-[600px] overflow-auto scroll-smooth'
                >
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
