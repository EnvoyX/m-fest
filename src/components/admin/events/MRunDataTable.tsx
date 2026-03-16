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
import { BadgeCheckIcon, BadgeX, Clock, ListFilter, Loader2, MoreHorizontal, RefreshCw } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export default function MRunDataTable() {
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
        ...trpc.admin.getEvents.queryOptions({ eventType: "M_RUN" }),
    });
    const unified = React.useMemo(() => {
        if (!events) return [];

        return events;
    }, [events]);

    type Unified = (typeof unified)[number];

    const updateStatus = useMutation({
        ...trpc.admin.updateEventStatus.mutationOptions(),
        onMutate: () => {
            toast.loading("Updating status...", {
                id: "update-status",
            });
        },
        onError: (error) => {
            toast.dismiss("update-status");
            toast.error("Failed to update status", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess() {
            toast.dismiss("update-status");
            toast.success(`Status updated successfully`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getEvents.queryKey(),
            });
        },
    });
    const updateStatusByMany = useMutation({
        ...trpc.admin.updateEventStatusByMany.mutationOptions(),
        onMutate: () => {
            toast.loading("Updating statuses...", {
                id: "update-statuses",
            });
        },
        onError: (error) => {
            toast.dismiss("update-statuses");
            toast.error("Failed to update statuses", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("update-statuses");
            toast.success(`${variables.eventIds.length} registration statuses updated successfully`);
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
                            <DropdownMenuLabel className="text-muted-foreground">Registration</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer text-green-500 hover:text-green-500! hover:bg-green-900/60!"
                                onClick={() => updateStatus.mutate({ eventId: item.id, action: "Approve", context: "Registration" })}
                            >
                                Approve registration
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-yellow-500 hover:text-yellow-500! hover:bg-yellow-900/60!"
                                onClick={() => updateStatus.mutate({ eventId: item.id, action: "Pending", context: "Registration" })}
                            >
                                Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={() =>
                                    updateStatus.mutate({
                                        eventId: item.id,
                                        action: "Reject",
                                        context: "Registration"
                                    })
                                }
                            >
                                Reject registration
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={() =>
                                    deleteEvent.mutate({ eventId: item.id, userId: item.userId })
                                }
                            >
                                Delete registration
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-muted-foreground">Payment</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer text-green-500 hover:text-green-500! hover:bg-green-900/60!"
                                onClick={() => updateStatus.mutate({ eventId: item.id, action: "Approve", context: "Payment" })}
                            >
                                Approve payment
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-yellow-500 hover:text-yellow-500! hover:bg-yellow-900/60!"
                                onClick={() => updateStatus.mutate({ eventId: item.id, action: "Pending", context: "Payment" })}
                            >
                                Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-muted-foreground">Misc</DropdownMenuLabel>
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
            accessorKey: "eventStatus",
            accessorFn: (row) => (row.eventStatus === "ACCEPTED" ? "VERIFIED" : row.eventStatus === "PENDING" ? "PENDING" : "REJECTED"),
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Registration Status" />
                );
            },
            cell: ({ row }) => <div className="">   <span>
                {row.getValue("eventStatus") === "PENDING" ? (
                    <Badge variant="secondary" className="bg-yellow-600 text-white">
                        <Clock />
                        PENDING
                    </Badge>
                ) : row.getValue("eventStatus") === "VERIFIED" ? (
                    <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                    >
                        <BadgeCheckIcon />
                        VERIFIED
                    </Badge>
                ) : (
                    <Badge className="bg-red-500 text-white">
                        <BadgeX />
                        REJECTED</Badge>
                )}
            </span></div>,
            filterFn: "includesString",
        },
        {
            accessorKey: "paymentStatus",
            accessorFn: (row) => (row.paymentStatus === "ACCEPTED" ? "VERIFIED" : row.paymentStatus === "PENDING" ? "PENDING" : "REJECTED"),
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Payment Status" />
                );
            },
            cell: ({ row }) => <div className="">   <span>
                {row.getValue("paymentStatus") === "PENDING" ? (
                    <Badge variant="secondary" className="bg-yellow-600 text-white">
                        <Clock />
                        PENDING
                    </Badge>
                ) : row.getValue("paymentStatus") === "VERIFIED" ? (
                    <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                    >
                        <BadgeCheckIcon />
                        VERIFIED
                    </Badge>
                ) : (
                    <Badge className="bg-red-500 text-white">
                        <BadgeX />
                        REJECTED</Badge>
                )}
            </span></div>,
            filterFn: "includesString",
        },
        {
            accessorKey: "ktpUrl",
            accessorFn: (row) => row.ktpUrl,
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="KTP/KTM/Kartu Pelajar" />
                );
            },
            cell: ({ row }) => {
                const ktpUrl = row.getValue("ktpUrl") as string;
                return (
                    <Link
                        href={(ktpUrl as string) ?? ""}
                        className={cn(ktpUrl ? "underline italic font-bold" : "")}
                        target="_blank"
                    >
                        {ktpUrl ? "View" : "No File"}
                    </Link>
                );
            },
        },
        {
            accessorKey: "buktiBayarUrl",
            accessorFn: (row) => row.buktiBayarUrl,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Bukti Bayar" />;
            },
            cell: ({ row }) => {
                const buktiBayarUrl = row.getValue("buktiBayarUrl") as string;
                return (
                    <Link
                        href={(buktiBayarUrl as string) ?? ""}
                        className={cn(buktiBayarUrl ? "underline italic font-bold" : "")}
                        target="_blank"
                    >
                        {buktiBayarUrl ? "View" : "No File"}
                    </Link>
                );
            },
        },
        {
            accessorKey: "followIgUrl",
            accessorFn: (row) => row.followIgUrl,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Follow IG Proof" />;
            },
            cell: ({ row }) => {
                const followIgProofUrl = row.getValue("followIgUrl") as string;
                return (
                    <Link
                        href={(followIgProofUrl as string) ?? ""}
                        className={cn(followIgProofUrl ? "underline italic font-bold" : "")}
                        target="_blank"
                    >
                        {followIgProofUrl ? "View" : "No File"}
                    </Link>
                );
            },
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
            accessorKey: "activeEmail",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Active Email" />;
            },
            accessorFn: (row) => {
                return row.activeEmail;
            },
            cell: ({ row }) => <span>{row.getValue("activeEmail")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "age",
            accessorFn: (row) => {
                return row.age;
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Age" />;
            },
            cell: ({ row }) => <span>{row.getValue("age")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "gender",
            accessorFn: (row) => {
                return row.gender;
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Gender" />;
            },
            cell: ({ row }) => (
                <span className="capitalize">{row.getValue("gender")}</span>
            ),
            filterFn: "includesString",
        },
        {
            accessorKey: "phoneNumber",
            accessorFn: (row) => row.phoneNumber,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Phone Number" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("phoneNumber")}</div>,
        },
        {
            accessorKey: "fullAddress",
            accessorFn: (row) => {
                return row.fullAddress;
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Full Address" />;
            },
            cell: ({ row }) => <span>{row.getValue("fullAddress")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "emergencyContact",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Emergency Contact" />
                );
            },
            accessorFn: (row) => {
                return row.emergencyContact;
            },
            cell: ({ row }) => <span>{row.getValue("emergencyContact")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "emergencyContactName",
            accessorFn: (row) => row.emergencyContactName,
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Emergency Contact Name"
                    />
                );
            },
            cell: ({ row }) => (
                <div className="">{row.getValue("emergencyContactName")}</div>
            ),
        },
        {
            accessorKey: "category",
            accessorFn: (row) => row.category,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Category" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("category")}</div>,
        },
        {
            accessorKey: "jerseySize",
            accessorFn: (row) => row.jerseySize,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Jersey Size" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("jerseySize")}</div>,
        },
        {
            accessorKey: "isAlumniHMM",
            accessorFn: (row) => (row.isAlumniHMM ? "True" : "False"),
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Alumni HMM" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("isAlumniHMM")}</div>,
        },
        {
            accessorKey: "isHMM",
            accessorFn: (row) => (row.isHMM ? "True" : "False"),
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="HMM Member" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("isHMM")}</div>,
        },
        {
            accessorKey: "nimHMM",
            accessorFn: (row) => (row.nimHMM ? row.nimHMM : "Not an HMM ITB student"),
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="NIM HMM" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("nimHMM")}</div>,
        },
        {
            accessorKey: "bloodType",
            accessorFn: (row) => row.bloodType,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Blood Type" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("bloodType")}</div>,
        },
        {
            accessorKey: "rhesus",
            accessorFn: (row) => row.rhesus,
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Rhesus" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("rhesus")}</div>,
        },
        {
            accessorKey: "riwayatPenyakit",
            accessorFn: (row) => (row.riwayatPenyakit ? "True" : "False"),
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Riwayat Penyakit" />
                );
            },
            cell: ({ row }) => (
                <div className="">{row.getValue("riwayatPenyakit")}</div>
            ),
        },
        {
            accessorKey: "detailPenyakit",
            accessorFn: (row) =>
                row.detailPenyakit ? row.detailPenyakit : "Tidak ada riwayat penyakit",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Detail Penyakit" />
                );
            },
            cell: ({ row }) => <div>{row.getValue("detailPenyakit")}</div>,
        },
        {
            accessorKey: "alergi",
            accessorFn: (row) => (row.alergi ? "True" : "False"),
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Alergi" />;
            },
            cell: ({ row }) => <div>{row.getValue("alergi")}</div>,
        },
        {
            accessorKey: "detailAlergi",
            accessorFn: (row) =>
                row.detailAlergi ? row.detailAlergi : "Tidak ada riwayat alergi",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Detail Alergi" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("detailAlergi")}</div>,
        },
         {
            accessorKey: "batch",
            accessorFn: (row) => row.batch,
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Batch"
                    />
                );
            },
            cell: ({ row }) => (
                <div className="">{row.getValue("batch")}</div>
            ),
        },
           {
            accessorKey: "price",
            accessorFn: (row) => row.price,
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Price"
                    />
                );
            },
            cell: ({ row }) => (
                <div className="">{row.getValue("price")}</div>
            ),
        },
        {
            accessorKey: "siapLomba",
            accessorFn: (row) => (row.siapLomba ? "Agreed" : "Refuse"),
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Siap Lomba" />;
            },
            cell: ({ row }) => <div className="">{row.getValue("siapLomba")}</div>,
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
                                        setFilterColumn("eventStatus");
                                        table.getColumn("eventStatus")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Registration Status
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("paymentStatus");
                                        table.getColumn("paymentStatus")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Payment Status
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
                                        setFilterColumn("gender");
                                        table.getColumn("gender")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Gender
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("age");
                                        table.getColumn("age")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Age
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("phoneNumber");
                                        table.getColumn("phoneNumber")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Phone Number
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
                                        setFilterColumn("activeEmail");
                                        table.getColumn("activeEmail")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Active Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("fullAddress");
                                        table.getColumn("fullAddress")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Full Address
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("emergencyContact");
                                        table.getColumn("emergencyContact")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Emergency Contact
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("emergencyContactName");
                                        table.getColumn("emergencyContactName")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Emergency Contact Name
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("category");
                                        table.getColumn("category")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Category
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("jerseySize");
                                        table.getColumn("jerseySize")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Jersey Size
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("isAlumniHMM");
                                        table.getColumn("isAlumniHMM")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    isAlumniHMM
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("isHMM");
                                        table.getColumn("isHMM")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    isHMM
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("nimHMM");
                                        table.getColumn("nimHMM")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    NIM HMM
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("bloodType");
                                        table.getColumn("bloodType")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Blood Type
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("rhesus");
                                        table.getColumn("rhesus")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Rhesus
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("riwayatPenyakit");
                                        table.getColumn("riwayatPenyakit")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Riwayat Penyakit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("detailPenyakit");
                                        table.getColumn("detailPenyakit")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Detail Penyakit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("alergi");
                                        table.getColumn("alergi")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Alergi
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        setFilterColumn("detailAlergi");
                                        table.getColumn("detailAlergi")?.setFilterValue("");
                                        table.resetColumnFilters();
                                    }}
                                >
                                    Detail Alergi
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
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="text-muted-foreground">Registration</DropdownMenuLabel>
                                <DropdownMenuItem
                                    className="cursor-pointer text-green-500 hover:text-green-500! hover:bg-green-900/60!"
                                    onClick={() => {
                                        const itemIds = table
                                            .getFilteredSelectedRowModel()
                                            .rows.map((row) => row.original.id);
                                        updateStatusByMany.mutate({ eventIds: itemIds, action: "Approve", context: "Registration" })
                                    }}
                                >
                                    Approve {table.getFilteredSelectedRowModel().rows.length} registrations
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-yellow-500 hover:text-yellow-500! hover:bg-yellow-900/60!"
                                    onClick={() => {
                                        const itemIds = table
                                            .getFilteredSelectedRowModel()
                                            .rows.map((row) => row.original.id);
                                        updateStatusByMany.mutate({ eventIds: itemIds, action: "Pending", context: "Registration" })
                                    }}
                                >
                                    Mark {table.getFilteredSelectedRowModel().rows.length} rows as Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        const itemIds = table
                                            .getFilteredSelectedRowModel()
                                            .rows.map((row) => row.original.id);
                                        updateStatusByMany.mutate({ eventIds: itemIds, action: "Reject", context: "Registration" })
                                    }}
                                >
                                    Reject {table.getFilteredSelectedRowModel().rows.length} registrations
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
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="text-muted-foreground">Payment</DropdownMenuLabel>
                                <DropdownMenuItem
                                    className="cursor-pointer text-green-500 hover:text-green-500! hover:bg-green-900/60!"
                                    onClick={() => {
                                        const itemIds = table
                                            .getFilteredSelectedRowModel()
                                            .rows.map((row) => row.original.id);
                                        updateStatusByMany.mutate({ eventIds: itemIds, action: "Approve", context: "Payment" })
                                    }}
                                >
                                    Approve {table.getFilteredSelectedRowModel().rows.length} payments
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-yellow-500 hover:text-yellow-500! hover:bg-yellow-900/60!"
                                    onClick={() => {
                                        const itemIds = table
                                            .getFilteredSelectedRowModel()
                                            .rows.map((row) => row.original.id);
                                        updateStatusByMany.mutate({ eventIds: itemIds, action: "Pending", context: "Payment" })
                                    }}
                                >
                                    Mark {table.getFilteredSelectedRowModel().rows.length} rows as Pending
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="text-muted-foreground">Export</DropdownMenuLabel>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        exportFilteredRowsToXlsx(table, "events.xlsx");
                                    }}
                                >
                                    <IconFileExport />
                                    Export selected to .xlsx
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
