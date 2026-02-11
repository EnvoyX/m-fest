"use client";

import * as React from "react";
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table";
import { ListFilter, Loader2, MoreHorizontal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import Image from "next/image";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IconFileExport, IconTableExport } from "@tabler/icons-react";
import {
    exportAllToXlsx,
    exportCurrentPageToXlsx,
    exportFilteredRowsToXlsx,
} from "@/utils/xlsx";

export default function ETUDataTable() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [filterColumn, setFilterColumn] = React.useState<string>("id");
    const {
        data: events,
        isLoading,
        isFetching,
    } = useQuery({
        ...trpc.admin.getEvents.queryOptions({ eventType: "ETU" }),
    });
    const unified = React.useMemo(() => {
        if (!events) return [];

        return events;
    }, [events]);

    type Unified = (typeof unified)[number];

      const addPresence = useMutation({
        ...trpc.admin.addPresenceParticipant.mutationOptions(),
        onMutate: () => {
          toast.loading("Adding presence...", {
            id: "add-presence",
          });
        },
        onError: (error) => {
          toast.dismiss("add-presence");
          toast.error("Failed to add presence", {
            description: error.message,
          });
          // console.log(error.message);
        },
        onSuccess() {
          toast.dismiss("add-presence");
          toast.success(`Presence added successfully`);
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: trpc.admin.getEvents.queryKey(),
          });
        },
      });
      const removePresence = useMutation({
        ...trpc.admin.removePresenceParticipant.mutationOptions(),
        onMutate: () => {
          toast.loading("Removing presence...", {
            id: "remove-presence",
          });
        },
        onError: (error) => {
          toast.dismiss("remove-presence");
          toast.error("Failed to remove presence", {
            description: error.message,
          });
          // console.log(error.message);
        },
        onSuccess() {
          toast.dismiss("remove-presence");
          toast.success(`Presence removed successfully`);
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: trpc.admin.getEvents.queryKey(),
          });
        },
      });

    const deleteEvent = useMutation({
        ...trpc.admin.deleteEvent.mutationOptions(),
        onMutate: () => {
            toast.loading("Deleting event...", {
                id: "delete-event",
            });
        },

        onError: (error) => {
            toast.dismiss("delete-event");
            toast.error("Failed to delete event", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess() {
            toast.dismiss("delete-event");
            toast.success(`Event deleted successfully`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getEvents.queryKey(),
            });
        },
    });

    const deleteEventsByMany = useMutation({
        ...trpc.admin.deleteEventByMany.mutationOptions(),
        onMutate: () => {
            toast.loading("Deleting events...", {
                id: "delete-events",
            });
        },
        onError: (error) => {
            toast.dismiss("delete-events");
            toast.error("Failed to delete events", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("delete-events");
            toast.success(`Deleted ${variables.eventIds.length} events successfully`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getEvents.queryKey(),
            });
            table.resetRowSelection();
        },
    });

    const columns: ColumnDef<Unified>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="bg-transparent! backdrop-glass-lg"
                            align="end"
                        >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                             <DropdownMenuItem
                                            className="cursor-pointer text-green-500 hover:text-green-500! hover:bg-green-900/60!"
                                            onClick={() =>
                                              addPresence.mutate({ eventId: item.id })
                                            }
                                          >
                                            Add presence
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            variant="destructive"
                                            className="cursor-pointer"
                                            onClick={() =>
                                              removePresence.mutate({
                                                eventId: item.id,
                                              })
                                            }
                                          >
                                            Remove presence
                                          </DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={() =>
                                    deleteEvent.mutate({ eventId: item.id, userId: item.userId })
                                }
                            >
                                Delete event
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer hover:bg-white/20!">
                                <Link
                                    href={`/admin/users/${item.userId}`}
                                    target="_blank"
                                    className="w-full"
                                >
                                    View User
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            accessorKey: "id",
            accessorFn: (row) => row.id,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Event Id" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "userId",
            accessorFn: (row) => row.userId,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="User Id" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("userId")}</div>,
            filterFn: "includesString",
        },
        {
              accessorKey: "isPresent",
              accessorFn: (row) => (row.isPresence ? "Present" : "Absent"),
              header: ({ column }) => {
                return (
                  <DataTableColumnHeader column={column} title="Presence Status" />
                );
              },
              cell: ({ row }) => <div className="">{row.getValue("isPresent")}</div>,
              filterFn: "includesString",
            },
        {
            accessorKey: "userName",
            accessorFn: (row) => row.user.name,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="User Name" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("userName")}</div>,
            filterFn: "includesString",
        },
        {
            accessorKey: "userEmail",
            accessorFn: (row) => row.user.email,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="User Email" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("userEmail")}</div>,
            filterFn: "includesString",
        },

        {
            accessorKey: "image",
            accessorFn: (row) => {
                return row.user?.image ?? "";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Image" />;
            },
            cell: ({ row }) => {
                const imageUrl = row.getValue("image") as string;
                return (
                    <>
                        {imageUrl ? (
                            <Link href={imageUrl} target="_blank">
                                <div className="w-10 h-10 relative">
                                    <Image
                                        src={imageUrl}
                                        alt="User's Image"
                                        fill
                                        className=" object-cover rounded-full "
                                    />
                                </div>
                            </Link>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300" />
                        )}
                    </>
                );
            },
        },
        {
            accessorKey: "participantName",
            accessorFn: (row) => row.participantName,
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Participant Name" />
                );
            },
            cell: ({ row }) => (
                <div className="">{row.getValue("participantName")}</div>
            ),
            filterFn: "includesString",
        },
        {
            accessorKey: "isITB",
            accessorFn: (row) => (row.isITB ? "True" : "False"),
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Status Civitas Akademika ITB"
                    />
                );
            },
            cell: ({ row }) => <div className="">{row.getValue("isITB")}</div>,
        },
        {
            accessorKey: "nimOrNip",
            accessorFn: (row) =>
                row.nimOrNip ? row.nimOrNip : "Not an ITB Civitas Academica",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="NIM/NIP" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("nimOrNip")}</div>,
        },
        {
            accessorKey: "merekKendaraan",
            accessorFn: (row) => {
                return row.merekKendaraan;
            },
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Merek Kendaraan" />
                );
            },
            cell: ({ row }) => <span>{row.getValue("merekKendaraan")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "tahunBuat",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Tahun Buat" />;
            },
            accessorFn: (row) => {
                return row.tahunBuat;
            },
            cell: ({ row }) => <span>{row.getValue("tahunBuat")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "platNomor",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Plat Nomor" />;
            },
            accessorFn: (row) => {
                return row.platNomor;
            },
            cell: ({ row }) => <span>{row.getValue("platNomor")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "lastServiceDate",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Last Service" />;
            },
            accessorFn: (row) => {
                return row.lastServiceDate;
            },
            cell: ({ row }) => <span>{row.getValue("lastServiceDate")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "isSopCompliant",
            accessorFn: (row) => (row.isSopCompliant ? "Agreed" : "Refuse"),
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="SOP Compliant" />;
            },
            cell: ({ row }) => (
                <div className="">{row.getValue("isSopCompliant")}</div>
            ),
        },
        {
            accessorKey: "createdAt",
            accessorFn: (row) => row.createdAt,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Created At" />;
            },
            cell: ({ row }) => (
                <div className="">
                    {row.getValue("createdAt")
                        ? new Date(row.getValue("createdAt")).toLocaleString()
                        : "Null"}
                </div>
            ),
        },
        {
            accessorKey: "updatedAt",
            accessorFn: (row) => row.updatedAt,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Updated At" />;
            },
            cell: ({ row }) => (
                <div className="">
                    {row.getValue("updatedAt")
                        ? new Date(row.getValue("updatedAt")).toLocaleString()
                        : "Null"}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: unified ?? [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center py-4">
                <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full md:w-auto">
                    <Input
                        placeholder="Filter..."
                        value={
                            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm w-full"
                    />
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-fit cursor-pointer">
                                    <ListFilter />
                                    <span className="">Filter:</span>
                                    <span className="capitalize">{filterColumn}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-transparent! backdrop-glass-xl"
                                align="end"
                            >
                                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("id");
                                        table.getColumn("id")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Event Id
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("userId");
                                        table.getColumn("userId")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    User Id
                                </DropdownMenuItem>
                                 <DropdownMenuItem
                                                  className="cursor-pointer hover:bg-white/20!"
                                                  onClick={() => {
                                                    setFilterColumn("isPresent");
                                                    table.getColumn("isPresent")?.setFilterValue("");
                                                    table.resetColumnFilters();
                                                  }}
                                                >
                                                  Presence
                                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("userName");
                                        table.getColumn("userName")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    User Name
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("userEmail");
                                        table.getColumn("userEmail")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    User Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("participantName");
                                        table.getColumn("participantName")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Participant Name
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("isITB");
                                        table.getColumn("isITB")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Status Civitas Akademika ITB
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("nimOrNip");
                                        table.getColumn("nimOrNip")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    NIM or NIP
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("merekKendaraan");
                                        table.getColumn("merekKendaraan")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Vehicle Brand
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("tahunBuat");
                                        table.getColumn("tahunBuat")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Tahun Buat
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("platNomor");
                                        table.getColumn("platNomor")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Plat Nomor
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("lastServiceDate");
                                        table.getColumn("lastServiceDate")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Last Service
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Button
                        variant="outline"
                        className={cn(
                            "cursor-pointer w-fit",
                            isFetching && "cursor-not-allowed",
                        )}
                        disabled={isFetching}
                        onClick={() => queryClient.invalidateQueries()}
                    >
                        <RefreshCw
                            className={cn("w-4 h-4", {
                                "animate-spin": isFetching,
                            })}
                        />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative cursor-pointer"
                                disabled={isFetching}
                            >
                                <IconTableExport />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="bg-transparent backdrop-glass-xl"
                            align="end"
                        >
                            <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/20!"
                                onClick={() => {
                                    exportCurrentPageToXlsx(table, "events.xlsx");
                                }}
                            >
                                <IconFileExport />
                                Export current rows to .xlsx
                            </DropdownMenuItem>
                            {table.getFilteredSelectedRowModel().rows.length ? (
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        exportFilteredRowsToXlsx(table, "events.xlsx");
                                    }}
                                >
                                    <IconFileExport />
                                    Export selected to .xlsx
                                </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/20!"
                                onClick={() => {
                                    exportAllToXlsx(table, "events.xlsx");
                                }}
                            >
                                <IconFileExport />
                                Export all rows to .xlsx
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {table.getFilteredSelectedRowModel().rows.length ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="relative cursor-pointer"
                                    disabled={isFetching}
                                >
                                    <div
                                        className={cn(
                                            "absolute -top-1 -right-1 w-4 h-4 border rounded-full bg-white text-black flex justify-center items-center",
                                            {
                                                "w-6":
                                                    table.getFilteredSelectedRowModel().rows.length > 9,
                                                "w-7":
                                                    table.getFilteredSelectedRowModel().rows.length > 99,
                                            },
                                        )}
                                    >
                                        <p>{table.getFilteredSelectedRowModel().rows.length}</p>
                                    </div>
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-transparent backdrop-glass-xl"
                                align="end"
                            >
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        exportFilteredRowsToXlsx(table, "events.xlsx");
                                    }}
                                >
                                    <IconFileExport />
                                    Export selected to .xlsx
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        const eventIds = table
                                            .getFilteredSelectedRowModel()
                                            .rows.map((row) => row.original.id);
                                        deleteEventsByMany.mutate({
                                            eventIds,
                                        });
                                    }}
                                >
                                    Delete {table.getFilteredSelectedRowModel().rows.length}{" "}
                                    events
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <div className="overflow-x-auto rounded-md border mb-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <span className="flex justify-center items-center">
                                        <Loader2 className="animate-spin w-6 h-6" />
                                    </span>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
