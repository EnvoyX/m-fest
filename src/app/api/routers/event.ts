import { router } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { CompetitionName } from "../../../../prisma/generated/prisma/enums";
import { getCurrentDate } from "@/lib/utils";

export const eventRouter = router({});
