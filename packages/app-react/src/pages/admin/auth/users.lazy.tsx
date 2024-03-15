import { VRoles, VUser } from "@nops/server/validators";
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
import { type ElementRef } from "react";

import { DataTable, DataTableVirtuailzerRows } from "@/components/data_table";
import { trpc } from "@/lib/trpc";

export const Route = createLazyFileRoute("/admin/auth/users")({
    component: UsersComponent,
});

function UserCreate(props: { onSuccess: () => void }) {
    const { t } = useTranslation();

    const create = trpc.auth.createUser.useMutation({
        onSuccess() {
            props.onSuccess();
        },
    });

    const { handleSubmit, register } = useForm<{
        email: string;
        password: string;
        role: Zod.infer<typeof VRoles>;
    }>();

    const onSubmit = handleSubmit((data) => {
        return create.mutateAsync({
            email: data.email,
            password: data.password,
            role: data.role,
            nickname: "",
        });
    });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"}>{t("admin.actions.create")}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={onSubmit}>
                    <div className='grid w-full items-center gap-4 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <Label>{t("admin.email")}</Label>
                            <Input
                                disabled={create.isPending}
                                {...register("email")}
                            ></Input>
                        </div>
                    </div>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-2'>
                            <Label>{t("password")}</Label>
                            <Input
                                disabled={create.isPending}
                                {...register("password")}
                            ></Input>
                        </div>
                    </div>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-2'>
                            <Label>{t("admin.role")}</Label>
                            <Select
                                disabled={create.isPending}
                                {...register("role")}
                            >
                                <SelectTrigger></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='ADMIN'>
                                        <Badge>{t(`admin.roles.admin`)}</Badge>
                                    </SelectItem>
                                    <SelectItem value='USER'>
                                        <Badge>{t(`admin.roles.user`)}</Badge>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='grid w-full items-center gap-4'>
                        <Button disabled={create.isPending} type='submit'>
                            {t("admin.actions.create")}
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}

function UsersTable() {
    const { t } = useTranslation();

    type IUser = Zod.infer<typeof VUser>;

    const [users, query] = trpc.auth.getAllUsers.useSuspenseInfiniteQuery(
        {
            limit: 20,
        },
        {
            initialCursor: 0,
            getNextPageParam: (page, _allPages, pageParam) =>
                page.length >= 20 ? pageParam ?? 0 + page.length : null,
        },
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
            helper.accessor("serial", {
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
                            onValueChange={(e) =>
                                (editer.temp["role"]! = VRoles.parse(e))
                            }
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
                                        // setUsers((users) => {
                                        //     users[cell.row.index] = {
                                        //         ...users[cell.row.index],
                                        //         ...temp,
                                        //     };
                                        // });
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
                                    onClick={() => {}}
                                >
                                    {t("admin.actions.delete")}
                                </Button>
                            </>
                        )}
                    </div>
                ),
            }),
        ],
        [],
    );

    const table = useReactTable({
        data: users.pages.flat(),
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
        count: users.pages.flat().length,
        getScrollElement: () => divRef.current,
        estimateSize: () => 50,
    });

    return (
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
    );
}

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

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
                {/* <div>
                    <Input
                        className='flex-1'
                        placeholder={t("admin.actions.search")}
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    ></Input>
                </div> */}
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
                <UsersTable></UsersTable>
            </CardContent>
            <CardFooter className='flex flex-row justify-between'></CardFooter>
        </Card>
    );
}
