"use client";

import { useTRPC } from "@/utils/trpc";
import {
  IconConfetti,
  IconInvoice,
  IconListDetails,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Clock4, FileClockIcon, UserCheck2Icon, Users } from "lucide-react";
import { PaymentsChartLine } from "./PaymentGraph";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { DashboardSkeleton } from "../DashboardSkeleton";

export default function DataOverview() {
  const trpc = useTRPC();
  const isLoading = useIsFetching();
  const { data: users } = useQuery(trpc.admin.getUsers.queryOptions());
  const { data: teams } = useQuery(trpc.admin.getTeams.queryOptions());
  const { data: registrations } = useQuery(
    trpc.admin.getRegistrations.queryOptions(),
  );
  const { data: documents } = useQuery(
    trpc.admin.getAllDocuments.queryOptions(),
  );

  const { data: eventRegistration } = useQuery(
    trpc.admin.getEventsRegistration.queryOptions(),
  );
  const { data: invoices } = useQuery(trpc.admin.getInvoices.queryOptions());

  const verifiedTeams = teams?.filter(
    (team) => team.status === "SUCCESS" && team.teamStatus === "ACCEPTED",
  );

  const pendingTeams = teams?.filter(
    (team) => team.status === "SUCCESS" && team.teamStatus === "PENDING",
  );

  const verifiedRegistrations = registrations?.filter(
    (registration) => registration.isVerified,
  );

  const pendingRegistrations = registrations?.filter(
    (registration) => !registration.isVerified,
  );

  const totalParticipants = registrations?.reduce(
    (acc, curr) =>
      acc +
      (curr.team?.members.length === undefined ? 0 : curr.team?.members.length),
    0,
  );

  const totalPendingVerifications = documents?.filter(
    (document) => document.status === "PENDING",
  );

  if (isLoading) return <DashboardSkeleton />;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1>Total Users</h1>
            <Users className="w-6 h-6" />
          </div>
          <p className="text-2xl">{users?.length}</p>
          <p className="text-muted-foreground text-sm">Signed in users</p>
        </div>
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1>Total Teams</h1>
            <IconUsersGroup className="w-6 h-6" />
          </div>
          <p className="text-2xl">{verifiedTeams?.length}</p>
          <p className="text-muted-foreground text-sm">Teams verified</p>
        </div>
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1>Total Competitions</h1>
            <IconListDetails className="w-6 h-6" />
          </div>
          <p className="text-2xl">{verifiedRegistrations?.length}</p>
          <p className="text-muted-foreground text-sm">Has been registered</p>
        </div>
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1>Total Events</h1>
            <IconConfetti className="w-6 h-6" />
          </div>
          <p className="text-2xl">{eventRegistration?.length}</p>
          <p className="text-muted-foreground text-sm">Participated</p>
        </div>
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1 className="line-clamp-1">Total Participants</h1>
            <UserCheck2Icon className="w-6 h-6" />
          </div>
          <p className="text-2xl">{totalParticipants}</p>
          <p className="text-muted-foreground text-sm">Total Participants</p>
        </div>
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1 className="line-clamp-1">Total Pending Teams</h1>
            <IconUsersGroup className="w-6 h-6" />
          </div>
          <p className="text-2xl">{pendingTeams?.length}</p>
          <p className="text-muted-foreground text-sm">
            Pending Teams to review
          </p>
        </div>
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1 className="line-clamp-1">Total Pending Competitions</h1>
            <Clock4 className="w-6 h-6" />
          </div>
          <p className="text-2xl">{pendingRegistrations?.length}</p>
          <p className="text-muted-foreground text-sm">
            Pending Payments to review
          </p>
        </div>
        <div className="p-6 flex flex-col border rounded-lg">
          <div className="flex justify-between mb-4">
            <h1 className="line-clamp-1">Total Pending Documents</h1>
            <FileClockIcon className="w-6 h-6" />
          </div>
          <p className="text-2xl">{totalPendingVerifications?.length}</p>
          <p className="text-muted-foreground text-sm">
            Pending Documents to review
          </p>
        </div>
      </div>
      <div className="w-full border rounded-lg p-6 flex justify-between mt-2">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h1 className="text-2xl">Invoices</h1>
            <IconInvoice className="w-6 h-6 ml-2" />
          </div>
          <span className="text-2xl font-bold">
            {" "}
            Total Revenue : Rp.{" "}
            {invoices?.reduce((acc, invoice) => acc + invoice.paymentFee, 0)}
          </span>
        </div>
        <div>
          <p className="text-2xl">{invoices?.length}</p>
          <p className="text-muted-foreground text-sm">
            Total payments created
          </p>
        </div>
      </div>
      <div className="mt-3">
        <PaymentsChartLine />
      </div>
    </section>
  );
}
