import { protectedProcedure, router } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { CompetitionName } from "../../../../prisma/generated/prisma/enums";
import { getCurrentDate } from "@/lib/utils";
import { eventsInputProcedureSchema } from "@/lib/event-schema";
import type { get } from "http";

export const eventRouter = router({
  getEventRegistration: protectedProcedure.query(async ({ ctx }) => {
    const eventRegistrations = await ctx.db.eventRegistration.findMany({
      where: {
        userId: ctx.session.user.id as string,
      },
    });
    return eventRegistrations;
  }),
  registerEvent: protectedProcedure
    .input(eventsInputProcedureSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id as string;
      if (input.registrationType === "M-CARE") {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: "M_CARE",
              participantName: input.participantName,
              gender: input.gender,
              phoneNumber: input.phoneNumber,
              fullAddress: input.fullAddress,
              emergencyContact: input.emergencyContact,
              emergencyContactName: input.emergencyContactName,
              clinicActivity: input.clinicActivity,
              memenuhiSyarat: input.memenuhiSyarat,
            },
          });
        });
      } else if (input.registrationType === "M-TALKS") {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: "M_TALKS",
              participantName: input.participantName,
              isITB: input.isITB,
              nimITB: input.nimITB,
              majorITB: input.majorITB,
              sourceInfo: input.sourceInfo,
            },
          });
        });
      } else if (input.registrationType === "ETU") {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: "ETU",
              participantName: input.participantName,
              phoneNumber: input.phoneNumber,
              isITB: input.isITB,
              nimOrNip: input.nimOrNip,
              merekKendaraan: input.merekKendaraan,
              tahunBuat: input.tahunBuat,
              platNomor: input.platNomor,
              lastServiceDate: input.lastServiceDate,
              isSopCompliant: input.isSopCompliant,
            },
          });
        });
      } else if (input.registrationType === "M-RUN") {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: "M_RUN",
              participantName: input.participantName,
              gender: input.gender,
              age: input.age,
              phoneNumber: input.phoneNumber,
              activeEmail: input.activeEmail,
              fullAddress: input.fullAddress,
              emergencyContact: input.emergencyContact,
              emergencyContactName: input.emergencyContactName,
              category: input.category,
              jerseySize: input.jerseySize,
              isAlumniHMM: input.isAlumniHMM,
              isHMM: input.isHMM,
              nimHMM: input.nimHMM,
              riwayatPenyakit: input.riwayatPenyakit,
              detailPenyakit: input.detailPenyakit,
              bloodType: input.bloodType,
              rhesus: input.rhesus,
              alergi: input.alergi,
              detailAlergi: input.detailAlergi,
              siapLomba: input.siapLomba,
              ktpUrl: input.ktpUrl,
              buktiBayarUrl: input.buktiBayarUrl,
            },
          });
        });
      }
    }),
});
