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
import {
    ArrowUpRightSquare,
    BadgeCheckIcon,
    Clock,
    Edit,
    ListFilter,
    Loader2,
    MoreHorizontal,
    CalendarIcon,
    RefreshCw,
    ViewIcon,
} from "lucide-react";

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
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IconFileExport, IconTableExport } from "@tabler/icons-react";
import {
    exportAllToXlsx,
    exportCurrentPageToXlsx,
    exportFilteredRowsToXlsx,
} from "@/utils/xlsx";
import type { TeamDataTable, TeamMember } from "@/types/prisma";
import { format } from "date-fns";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export function TeamsDataTable() {
    const trpc = useTRPC();
    const [activeDialog, setActiveDialog] = React.useState<string | null>("");
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [currentDialogTeam, setCurrentDialogTeam] =
        React.useState<TeamDataTable | null>(null);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [filterColumn, setFilterColumn] = React.useState<string>("id");
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const queryClient = useQueryClient();
    const {
        data: teams,
        isLoading,
        isFetching,
    } = useQuery(trpc.admin.getTeams.queryOptions());

    const updateDeadlineVerification = useMutation({
        ...trpc.admin.updateVerificationDeadline.mutationOptions(),
        onMutate: () => {
            toast.loading("Updating deadline...", {
                id: "update-deadline",
            });
        },
        onError: (error) => {
            toast.dismiss("update-deadline");
            toast.error("Failed to update deadline", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("update-deadline");
            toast.success(
                `Team ${teams?.find((team) => team.id === variables.teamId)?.name
                }'s deadline updated`,
            );
        },
        onSettled: () => {
            // setActiveDialog(null);
            // setCurrentDialogTeam(null);
            setDate(undefined);
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getTeams.queryKey(),
            });
        },
    });

    const approveTeam = useMutation({
        ...trpc.admin.approveTeam.mutationOptions(),
        onMutate: () => {
            toast.loading("Updating team...", {
                id: "update-team",
            });
        },

        onError: (error) => {
            toast.dismiss("update-team");
            toast.error("Failed to verify team", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("update-team");
            toast.success(
                `Team ${teams?.find((team) => team.id === variables.teamId)?.name
                } verified successfully`,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getTeams.queryKey(),
            });
        },
    });
    const rejectTeam = useMutation({
        ...trpc.admin.rejectTeam.mutationOptions(),
        onMutate: () => {
            toast.loading("Updating team...", {
                id: "update-team",
            });
        },

        onError: (error) => {
            toast.dismiss("update-team");
            toast.error("Failed to unverify team", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("update-team");
            toast.success(
                `Team ${teams?.find((team) => team.id === variables.teamId)?.name
                } unverified successfully`,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getTeams.queryKey(),
            });
        },
    });
    const deleteTeam = useMutation({
        ...trpc.admin.deleteTeam.mutationOptions(),
        onMutate: () => {
            toast.loading("Deleting team...", {
                id: "delete-team",
            });
        },

        onError: (error) => {
            toast.dismiss("delete-team");
            toast.error("Failed to delete team", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("delete-team");
            toast.success(
                `Team ${teams?.find((team) => team.id === variables.teamId)?.name
                } deleted successfully`,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getTeams.queryKey(),
            });
        },
    });
    const approveTeamsByMany = useMutation({
        ...trpc.admin.approveTeamsByMany.mutationOptions(),
        onMutate: () => {
            toast.loading("Updating teams...", {
                id: "update-team",
            });
        },

        onError: (error) => {
            toast.dismiss("update-team");
            toast.error("Failed to verify teams", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("update-team");
            toast.success(
                `Teams verified successfully for ${variables.teamIds.length} teams`,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getTeams.queryKey(),
            });
            table.resetRowSelection();
        },
    });
    const rejectTeamsByMany = useMutation({
        ...trpc.admin.rejectTeamsByMany.mutationOptions(),
        onMutate: () => {
            toast.loading("Updating teams...", {
                id: "update-team",
            });
        },

        onError: (error) => {
            toast.dismiss("update-team");
            toast.error("Failed to unverify teams", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("update-team");
            toast.success(
                `Teams unverifed successfully for ${variables.teamIds.length} teams`,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getTeams.queryKey(),
            });
            table.resetRowSelection();
        },
    });
    const deleteTeamByMany = useMutation({
        ...trpc.admin.deleteTeamByMany.mutationOptions(),
        onMutate: () => {
            toast.loading("Deleting teams...", {
                id: "delete-team",
            });
        },

        onError: (error) => {
            toast.dismiss("delete-team");
            toast.error("Failed to delete teams", {
                description: error.message,
            });
            // console.log(error.message);
        },
        onSuccess(data, variables) {
            toast.dismiss("delete-team");
            toast.success(
                `Teams deleted successfully for ${variables.teamIds.length} teams`,
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.admin.getTeams.queryKey(),
            });
            table.resetRowSelection();
        },
    });

    const unified = React.useMemo(() => {
        if (!teams) return [];

        return teams;
    }, [teams]);

    // type of array
    // type Unified = typeof unified

    // type of one array element
    type Unified = (typeof unified)[number];

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
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
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
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="bg-transparent! backdrop-glass-lg"
                            align="end"
                        >
                            <DropdownMenuLabel>
                                Actions for <span className="font-bold">{item.name}</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => approveTeam.mutate({ teamId: item.id })}
                                className="cursor-pointer text-green-500 hover:text-green-500! hover:bg-green-900/60!"
                            >
                                Approve team
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => rejectTeam.mutate({ teamId: item.id })}
                                className="cursor-pointer text-yellow-500 hover:text-yellow-500! hover:bg-yellow-900/80!"
                            >
                                Reject team
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    deleteTeam.mutate({
                                        teamId: item.id,
                                        paymentId: item.paymentId,
                                    })
                                }
                                className="cursor-pointer"
                                variant="destructive"
                            >
                                Delete Team
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(item.id);
                                    toast.success("Team ID copied to clipboard");
                                }}
                                className="cursor-pointer hover:bg-white/20!"
                            >
                                Copy team ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(item.leaderUserId as string);
                                    toast.success("Leader User ID copied to clipboard");
                                }}
                                className="cursor-pointer hover:bg-white/20!"
                            >
                                Copy leader&apos;s user Id
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(item.leaderEmail as string);
                                    toast.success("Leader email copied to clipboard");
                                }}
                                className="cursor-pointer hover:bg-white/20!"
                            >
                                Copy leader&apos;s email
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        item.leaderPhoneNumber as string,
                                    );
                                    toast.success("Leader phone number copied to clipboard");
                                }}
                                className="cursor-pointer hover:bg-white/20!"
                            >
                                Copy leader&apos;s phone number
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            accessorKey: "id",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.id ?? "";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Team Id" />;
            },
            cell: ({ row }) => <span>{row.getValue("id")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "verificationDeadlineAt",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.verificationDeadlineAt
                    ? format(
                        team.verificationDeadlineAt as Date,
                        "EEEE, d MMMM yyyy, HH:mm",
                    )
                    : "Not set";
            },
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Verification Deadline"
                    />
                );
            },
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size={"sm"}
                            className="cursor-pointer"
                            onClick={(e) => {
                                setActiveDialog(row.original.id);
                            }}
                        >
                            <Edit className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-300" />
                        </Button>
                        <span>{row.getValue("verificationDeadlineAt")}</span>
                    </div>
                );
            },
            filterFn: "includesString",
        },
        {
            accessorKey: "paymentProofUrl",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.paymentProofUrl ?? null;
            },
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Payment Proof URL" />
                );
            },
            cell: ({ row }) => {
                const paymentProofUrl = row.getValue("paymentProofUrl") as
                    | string
                    | null;
                return (
                    <>
                        {paymentProofUrl ? (
                            <Link
                                href={(paymentProofUrl as string) ?? ""}
                                className={cn(
                                    paymentProofUrl ? "underline italic font-bold" : "",
                                )}
                                target="_blank"
                            >
                                {paymentProofUrl ? "View" : "No File"}
                            </Link>
                        ) : (
                            <span>No Payment Proof URL</span>
                        )}
                    </>
                );
            },
            filterFn: "includesString",
        },
        {
            accessorKey: "paymentStatus",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.status === "SUCCESS" ? "Verified" : "Pending";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Payment Status" />;
            },
            cell: ({ row }) => (
                <span>
                    {" "}
                    {row.getValue("paymentStatus") === "Pending" &&
                        row.getValue("teamStatus") !== "Not Registered" ? (
                        <Badge variant="secondary" className="bg-yellow-600 text-white">
                            <Clock />
                            Pending
                        </Badge>
                    ) : row.getValue("paymentStatus") === "Verified" &&
                        row.getValue("teamStatus") !== "Not Registered" ? (
                        <Badge
                            variant="secondary"
                            className="bg-green-500 text-white dark:bg-green-600"
                        >
                            <BadgeCheckIcon />
                            Verified
                        </Badge>
                    ) : (
                        <Badge className="bg-red-500 text-white">Not Paid yet</Badge>
                    )}
                </span>
            ),
            filterFn: "includesString",
        },
        {
            accessorKey: "teamStatus",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Team Status" />;
            },
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.teamStatus === "ACCEPTED"
                    ? "Verified"
                    : team?.teamStatus === "PENDING"
                        ? "Pending"
                        : "Not Registered";
            },
            cell: ({ row }) => (
                <span>
                    {row.getValue("teamStatus") === "Pending" ? (
                        <Badge variant="secondary" className="bg-yellow-600 text-white">
                            <Clock />
                            Pending
                        </Badge>
                    ) : row.getValue("teamStatus") === "Verified" ? (
                        <Badge
                            variant="secondary"
                            className="bg-blue-500 text-white dark:bg-blue-600"
                        >
                            <BadgeCheckIcon />
                            Verified
                        </Badge>
                    ) : (
                        <Badge className="bg-red-500 text-white">Not Registered</Badge>
                    )}
                </span>
            ),
            filterFn: "includesString",
        },
        {
            accessorKey: "name",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.name ?? "";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Team Name" />;
            },
            cell: ({ row }) => <span>{row.getValue("name")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "members",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.members ?? [];
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Members" />;
            },
            cell: ({ row }) => {
                const members = row.getValue("members") as TeamMember[];
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-fit h-fit border">
                                <span className="italic underline font-bold cursor-pointer">
                                    Members
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="bg-transparent backdrop-glass-lg"
                            align="end"
                        >
                            <DropdownMenuLabel>Members</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {members.map((member) => (
                                <DropdownMenuItem
                                    key={member.userId}
                                    className="cursor-pointer hover:bg-white/20!"
                                    asChild
                                >
                                    <Link href={`/admin/users/${member.userId}`} target="_blank">
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="relative h-10 w-10">
                                                <Image
                                                    src={member.user?.image as string}
                                                    alt={member.user?.name as string}
                                                    fill
                                                    className="object-cover rounded-full"
                                                />
                                            </div>
                                            <p>{member.user?.name}</p>
                                            {member.role === "Leader" ? (
                                                <>
                                                    <Badge variant={"default"} className="-ml-2">
                                                        {member.role}
                                                    </Badge>
                                                </>
                                            ) : (
                                                <Badge
                                                    variant={"outline"}
                                                    className="-ml-2 bg-white/50"
                                                >
                                                    {member.role}
                                                </Badge>
                                            )}
                                            <ArrowUpRightSquare className="w-4 h-4 text-gray-500" />
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            accessorKey: "competition",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.competition ?? "Not registered to any competition";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Competition" />;
            },
            cell: ({ row }) => (
                <span className="capitalize">{row.getValue("competition")}</span>
            ),
            filterFn: "includesString",
        },

        {
            accessorKey: "leaderImage",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                const data = team?.members.find((member) => member.role === "Leader");
                return data?.user?.image ?? "";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Leader Image" />;
            },
            cell: ({ row }) => {
                const imageUrl = row.getValue("leaderImage") as string;
                return (
                    <div className="flex justify-center">
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
                    </div>
                );
            },
        },
        {
            accessorKey: "leaderUserId",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.leaderUserId ?? "";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Leader User Id" />;
            },
            cell: ({ row }) => (
                <span className="capitalize">{row.getValue("leaderUserId")}</span>
            ),
            filterFn: "includesString",
        },
        {
            accessorKey: "leaderName",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.leaderName ?? "";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Leader Name" />;
            },
            cell: ({ row }) => <span className="">{row.getValue("leaderName")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "leaderEmail",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Leader Email" />;
            },
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.leaderEmail ?? "";
            },
            cell: ({ row }) => <span>{row.getValue("leaderEmail")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "leaderPhoneNumber",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.leaderPhoneNumber ?? "";
            },
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Leader Phone Number" />
                );
            },
            cell: ({ row }) => {
                const phoneNumber = row.getValue("leaderPhoneNumber") as string;
                return <span className="lowercase">{phoneNumber}</span>;
            },
            filterFn: "includesString",
        },
        {
            accessorKey: "teamInstitution",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.teamInstitution ?? "Not set";
            },
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Team Institution" />
                );
            },
            cell: ({ row }) => <span>{row.getValue("teamInstitution")}</span>,
            filterFn: "includesString",
        },
        {
            accessorKey: "createdAt",
            accessorFn: (row) => {
                const team = teams?.find((team) => team.id === row.id);
                return team?.createdAt
                    ? new Date(team.createdAt).toLocaleString()
                    : "Not set";
            },
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Created At" />;
            },
            cell: ({ row }) => <span>{row.getValue("createdAt")}</span>,
            filterFn: "includesString",
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

    const currentTeam = teams?.find((team) => team.id === activeDialog);

    return (
        <>
            <div className="flex items-center gap-2">
                <Dialog
                    open={!!activeDialog}
                    onOpenChange={(open) => {
                        setCurrentDialogTeam(currentTeam as TeamDataTable);
                        if (!open) {
                            setActiveDialog(null);
                            setCurrentDialogTeam(null);
                            setDate(undefined);
                        }
                    }}
                >
                    <DialogContent className="sm:max-w-106.25 border-white/10 bg-transparent backdrop-glass-xl shadow-2xl">
                        <DialogHeader className="gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <CalendarIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold tracking-tight">
                                    Edit Verification Deadline
                                </DialogTitle>
                                <DialogDescription className="text-muted-foreground mt-1">
                                    Adjust the deadline for team{" "}
                                    <span className="font-medium text-foreground underline decoration-primary/30">
                                        {currentTeam?.name}
                                    </span>
                                </DialogDescription>
                            </div>
                        </DialogHeader>

                        <div className="grid gap-6 py-4">
                            <div className="rounded-lg border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                                    Current Status
                                </p>
                                <div className="flex items-center gap-3">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">
                                        {currentTeam?.verificationDeadlineAt
                                            ? format(
                                                currentTeam.verificationDeadlineAt as Date,
                                                "EEEE, d MMMM yyyy, HH:mm",
                                            )
                                            : "No deadline set"}
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground italic">
                                    {currentTeam?.competition || "Not registered for competition"}
                                </p>
                            </div>
                            {date !== undefined && (
                                <div className="rounded-lg border bg-white/10 p-4 transition-colors hover:bg-white/20">
                                    <p className="text-xs font-bold uppercase tracking-wider text-green-500 mb-2">
                                        New Status
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-4 w-4 text-green-500" />
                                        <span className="text-sm font-bold text-green-500">
                                            {date
                                                ? format(date as Date, "EEEE, d MMMM yyyy, HH:mm")
                                                : "No deadline set"}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground italic">
                                        {currentTeam?.competition ||
                                            "Not registered for competition"}
                                    </p>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label
                                    htmlFor="deadline"
                                    className="text-sm font-medium leading-none"
                                >
                                    New Deadline
                                </label>
                                <Input
                                    id="deadline"
                                    type="datetime-local"
                                    className="focus-visible:ring-primary border-white/20 bg-background/50"
                                    onChange={(e) => {
                                        if (!e.target.value) return;
                                        // console.log(e.target.value);
                                        // console.log(new Date(e.target.value));
                                        setDate(new Date(e.target.value));
                                    }}
                                    onBlur={(e) => {
                                        if (!e.target.value) return;
                                        setDate(new Date(e.target.value));
                                    }}
                                />
                            </div>
                        </div>

                        <DialogFooter className="flex justify-center gap-2">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-primary hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                                disabled={date === undefined || date === null}
                                onClick={() => {
                                    updateDeadlineVerification.mutate({
                                        teamId: currentTeam?.id as string,
                                        newVerificationDate: date as Date,
                                    });
                                }}
                            >
                                Update Deadline
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="w-full">
                <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center py-4">
                    <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full md:w-auto">
                        <Input
                            placeholder="Filter..."
                            value={
                                (table.getColumn(filterColumn)?.getFilterValue() as string) ??
                                ""
                            }
                            onChange={(event) =>
                                table
                                    .getColumn(filterColumn)
                                    ?.setFilterValue(event.target.value)
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
                                        Team Id
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("name");
                                            table.getColumn("name")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Team Name
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("competition");
                                            table.getColumn("competition")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Competition
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("paymentId");
                                            table.getColumn("paymentId")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Payment Id
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("leaderUserId");
                                            table.getColumn("leaderUserId")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        LeaderUserId
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("leaderName");
                                            table.getColumn("leaderName")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Leader Name
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("leaderEmail");
                                            table.getColumn("leaderEmail")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Leader Email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("leaderPhoneNumber");
                                            table.getColumn("leaderPhoneNumber")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Leader Phone Number
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("teamInstitution");
                                            table.getColumn("teamInstitution")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Team Institution
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
                                            setFilterColumn("teamStatus");
                                            table.getColumn("teamStatus")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Team Status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            setFilterColumn("createdAt");
                                            table.getColumn("createdAt")?.setFilterValue("");
                                            table.resetColumnFilters();
                                        }}
                                    >
                                        Created at
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
                                        exportCurrentPageToXlsx(table, "teams.xlsx");
                                    }}
                                >
                                    <IconFileExport />
                                    Export current rows to .xlsx
                                </DropdownMenuItem>
                                {table.getFilteredSelectedRowModel().rows.length ? (
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-white/20!"
                                        onClick={() => {
                                            exportFilteredRowsToXlsx(table, "teams.xlsx");
                                        }}
                                    >
                                        <IconFileExport />
                                        Export selected to .xlsx
                                    </DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-white/20!"
                                    onClick={() => {
                                        exportAllToXlsx(table, "teams.xlsx");
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
                                                        table.getFilteredSelectedRowModel().rows.length >
                                                        99,
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
                                            exportFilteredRowsToXlsx(table, "users.xlsx");
                                        }}
                                    >
                                        <IconFileExport />
                                        Export selected to .xlsx
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            const teamIds = table
                                                .getFilteredSelectedRowModel()
                                                .rows.map((row) => row.original.id);
                                            approveTeamsByMany.mutate({ teamIds });
                                        }}
                                        className="cursor-pointer text-green-500 hover:text-green-500! hover:bg-green-900/60!"
                                    >
                                        Approve {table.getFilteredSelectedRowModel().rows.length}{" "}
                                        teams
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            const teamIds = table
                                                .getFilteredSelectedRowModel()
                                                .rows.map((row) => row.original.id);
                                            rejectTeamsByMany.mutate({ teamIds });
                                        }}
                                        className="cursor-pointer text-yellow-500 hover:text-yellow-500! hover:bg-yellow-900/80!"
                                    >
                                        Reject {table.getFilteredSelectedRowModel().rows.length}{" "}
                                        teams
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            const teamIds = table
                                                .getFilteredSelectedRowModel()
                                                .rows.map((row) => row.original.id);
                                            const paymentIds = table
                                                .getFilteredSelectedRowModel()
                                                .rows.map((row) => row.original.paymentId);
                                            deleteTeamByMany.mutate({
                                                teamIds,
                                                paymentIds,
                                            });
                                        }}
                                        className="cursor-pointer"
                                        variant="destructive"
                                    >
                                        Delete {table.getFilteredSelectedRowModel().rows.length}{" "}
                                        teams
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
        </>
    );
}
