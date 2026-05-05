import { TRPCError } from '@trpc/server';

import { eventsInputProcedureSchema } from '@/lib/event-schema';
import { getCurrentDate } from '@/lib/utils';
import { protectedProcedure, router } from '@/server/api/trpc';

export const eventRouter = router({
  getEventRegistrationByUserId: protectedProcedure.query(async ({ ctx }) => {
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
      if (input.registrationType === 'M-CARE') {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: 'M_CARE',
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
      } else if (input.registrationType === 'M-TALKS') {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: 'M_TALKS',
              participantName: input.participantName,
              isITB: input.isITB,
              nimITB: input.nimITB,
              majorITB: input.majorITB,
              institution: input.institution,
              talksSessions: input.talksSessions,
              followIgUrl: input.followIgUrl,
              sourceInfo: input.sourceInfo,
            },
          });
        });
      } else if (input.registrationType === 'M-EXPO') {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: 'M_EXPO',
              participantName: input.participantName,
              isITB: input.isITB,
              nimITB: input.nimITB,
              majorITB: input.majorITB,
              institution: input.institution,
              expoSessions: input.expoSessions,
              followIgUrl: input.followIgUrl,
              sourceInfo: input.sourceInfo,
            },
          });
        });
      } else if (input.registrationType === 'ETU') {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: 'ETU',
              participantName: input.participantName,
              phoneNumber: input.phoneNumber,
              isITB: input.isITB,
              nimOrNip: input.nimOrNip,
              merekKendaraan: input.merekKendaraan,
              tahunBuat: input.tahunBuat,
              platNomor: input.platNomor,
              lastServiceDate: input.lastServiceDate,
              motorType: input.motorType,
              isSopCompliant: input.isSopCompliant,
            },
          });
        });
      } else if (input.registrationType === 'M-RUN') {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.create({
            data: {
              userId,
              eventType: 'M_RUN',
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
              followIgUrl: input.followIgUrl,
              buktiBayarUrl: input.buktiBayarUrl,
              batch: input.batch,
              price: input.price,
            },
          });
        });
      }
    }),
  getTalksCount: protectedProcedure.query(async ({ ctx }) => {
    const sessions = ["TALKS_1", "TALKS_2", "TALKS_3", "TALKS_4"] as const;

    const counts = await Promise.all(
      sessions.map((session) =>
        ctx.db.eventRegistration.count({
          where: {
            eventType: "M_TALKS",
            talksSessions: {
              has: session,
            },
          },
        })
      )
    );

    return {
      TALKS_1: counts[0],
      TALKS_2: counts[1],
      TALKS_3: counts[2],
      TALKS_4: counts[3],
      total: counts.reduce((a, b) => a + b, 0),
    };
  }),
  updateRegistrationEvent: protectedProcedure
    .input(eventsInputProcedureSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id as string;
      if (input.registrationType === 'M-TALKS') {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.update({
            where: {
              id: input.eventId,
            },
            data: {
              userId,
              eventType: 'M_TALKS',
              participantName: input.participantName,
              isITB: input.isITB,
              nimITB: input.nimITB,
              majorITB: input.majorITB,
              institution: input.institution,
              talksSessions: input.talksSessions,
              followIgUrl: input.followIgUrl,
              sourceInfo: input.sourceInfo,
            },
          });
        });
      } else if (input.registrationType === 'M-EXPO') {
        await ctx.db.$transaction(async (tx) => {
          await tx.eventRegistration.update({
            where: {
              id: input.eventId,
            },
            data: {
              userId,
              eventType: 'M_EXPO',
              participantName: input.participantName,
              isITB: input.isITB,
              nimITB: input.nimITB,
              majorITB: input.majorITB,
              institution: input.institution,
              expoSessions: input.expoSessions,
              followIgUrl: input.followIgUrl,
              sourceInfo: input.sourceInfo,
            },
          });
        });
      }
    }),
    getTalksSessionsByUserId: protectedProcedure.input(eventsInputProcedureSchema).query(async ({ ctx, input }) => {
        const talksSessions = await ctx.db.eventRegistration.findMany({
            where: {
                userId: ctx.session.user.id as string,
                eventType: "M_TALKS",
            },
            select: {
                talksSessions: true,
            },
        });
        return talksSessions;
    })
})          