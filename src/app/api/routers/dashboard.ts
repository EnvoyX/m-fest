import { getUser } from "@/action/user.action";
import {
    protectedProcedure,
    protectedRateLimitedProcedure,
    router,
} from "@/server/api/trpc";
import { type Document } from "@/types/types";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { documentsSchema, profileSchema, submitFileSchema } from "@/lib/schema";
import type { CompetitionName, MotorType } from "../../../../prisma/generated/prisma/enums";
import type { TeamMember } from "../../../../prisma/generated/prisma/client";

export const dashboardRouter = router({
    getUser: protectedProcedure.query(async () => {
        const user = await getUser();
        return user;
    }),
    getUserById: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
            });
            return user;
        }),
    getTeamById: protectedProcedure
        .input(
            z.object({
                teamId: z.string(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const team = await ctx.db.team.findUnique({
                where: { id: input.teamId },
                include: {
                    members: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
            return team;
        }),
    getDocumentsByUserId: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .output(
            z.object({
                documents: z.array(
                    z.object({
                        id: z.number(),
                        type: z.enum(["identityCard", "twibbon", "followIg"]),
                        title: z.string(),
                        submissionDetail: z.string(),
                        acceptedFiles: z.array(z.string()),
                        uploadThingRoute: z.enum(["identityCard", "twibbon", "followIg"]),
                        imageUrl: z.string().nullable(),
                        imageKey: z.string().nullable(),
                        verified: z.boolean().nullable(),
                        status: z
                            .enum(["AWAITING_UPLOAD", "PENDING", "VERIFIED"])
                            .nullable(),
                        createdAt: z.date().nullable(),
                    }),
                ),
                status: z.enum(["NOT_SUBMITTED", "PENDING", "ACCEPTED"]).nullable(),
            }),
        ) // @ts-expect-error documents is exist
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
                include: {
                    documents: true,
                },
            });

            const userDocuments = await ctx.db.documents.findUnique({
                where: {
                    userId: user?.id,
                },
            });

            if (!userDocuments) {
                const createUserDocuments = await ctx.db.documents.create({
                    data: {
                        userId: user?.id as string,
                    },
                });
                // console.log(createUserDocuments);
                return createUserDocuments;
            }

            const documents: Document[] = [
                {
                    id: 0,
                    type: "identityCard",
                    title: "Identity Card",
                    submissionDetail:
                        "Participant must upload associated identity card scan file such as Student Card of your institution or school and upload it here.",
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp", ".pdf"],
                    uploadThingRoute: "identityCard",
                    imageUrl: userDocuments?.identityCardImageUrl ?? null,
                    imageKey: userDocuments?.identityCardImageKey ?? null,
                    createdAt: userDocuments?.identityCardCreatedAt ?? null,
                    status: userDocuments?.identityCardStatus ?? null,
                    verified: userDocuments?.identityCardVerified ?? null,
                },
                {
                    id: 1,
                    type: "twibbon",
                    title: "Twibbon",
                    submissionDetail: `Twibbon is must uploaded to the Instagram account of each team participant in the form of an Instagram post by tagging the official M-FEST 2026 account @mfestitb. Instagram accounts must not be in private mode. Participants may not delete Instagram posts until the competition series is finished. Captions on Instagram post follow the template format and upload the Story Poster on Instagram story provided in link below. You can upload with image or pdf file with layout format example provided below and upload it here.`,
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp", ".pdf"],
                    uploadThingRoute: "twibbon",
                    imageUrl: userDocuments?.twibbonImageUrl ?? null,
                    imageKey: userDocuments?.twibbonImageKey ?? null,
                    createdAt: userDocuments?.twibbonCreatedAt ?? null,
                    status: userDocuments?.twibbonStatus ?? null,
                    verified: userDocuments?.twibbonVerified ?? null,
                },
                {
                    id: 2,
                    type: "followIg",
                    title: "Follow Instagram",
                    submissionDetail:
                        "Participants are required to have an Instagram account and must follow social media @mfestitb and @hmm_itb and upload the proof here.",
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp", ".pdf"],
                    uploadThingRoute: "followIg",
                    imageUrl: userDocuments?.followIgImageUrl ?? null,
                    imageKey: userDocuments?.followIgImageKey ?? null,
                    createdAt: userDocuments?.followIgCreatedAt ?? null,
                    status: userDocuments?.followIgStatus ?? null,
                    verified: userDocuments?.followIgVerified ?? null,
                },
            ];

            return {
                documents,
                status: userDocuments.status,
            };
        }),
    getUserDocuments: protectedProcedure
        .output(
            z.object({
                documents: z.array(
                    z.object({
                        id: z.number(),
                        type: z.enum(["identityCard", "twibbon", "followIg"]),
                        title: z.string(),
                        submissionDetail: z.string(),
                        acceptedFiles: z.array(z.string()),
                        uploadThingRoute: z.enum(["identityCard", "twibbon", "followIg"]),
                        imageUrl: z.string().nullable(),
                        imageKey: z.string().nullable(),
                        createdAt: z.date().nullable(),
                        status: z
                            .enum(["AWAITING_UPLOAD", "PENDING", "VERIFIED"])
                            .nullable(),
                        verified: z.boolean().nullable(),
                    }),
                ),
                status: z.enum(["NOT_SUBMITTED", "PENDING", "ACCEPTED"]).nullable(),
            }),
        ) // @ts-expect-error documents is exist
        .query(async ({ ctx }) => {
            const user = await getUser();

            const userDocuments = await ctx.db.documents.findUnique({
                where: {
                    userId: user?.id,
                },
            });

            if (!userDocuments) {
                const createUserDocuments = await ctx.db.documents.create({
                    data: {
                        userId: user?.id as string,
                    },
                });
                // console.log(createUserDocuments);
                return createUserDocuments;
            }

            const documents: Document[] = [
                {
                    id: 0,
                    type: "identityCard",
                    title: "Identity Card",
                    submissionDetail:
                        "Every participant must upload identity card scan file Student Card",
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp"],
                    uploadThingRoute: "identityCard",
                    imageUrl: userDocuments?.identityCardImageUrl ?? null,
                    imageKey: userDocuments?.identityCardImageKey ?? null,
                    createdAt: userDocuments?.identityCardCreatedAt ?? null,
                    status: userDocuments?.identityCardStatus ?? null,
                    verified: userDocuments?.identityCardVerified ?? null,
                },
                {
                    id: 1,
                    type: "twibbon",
                    title: "Twibbon",
                    submissionDetail: ` Twibbon is uploaded to the Instagram account of each team participant in the form of an Instagram post by tagging the official M-FEST 2026 account @mfestitb. Instagram accounts must not be in private mode. Participants may not delete Instagram posts until the competition series is finished. Captions on Instagram posts follow the template format.
                      `,
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp", ".pdf"],
                    uploadThingRoute: "twibbon",
                    imageUrl: userDocuments?.twibbonImageUrl ?? null,
                    imageKey: userDocuments?.twibbonImageKey ?? null,
                    createdAt: userDocuments?.twibbonCreatedAt ?? null,
                    status: userDocuments?.twibbonStatus ?? null,
                    verified: userDocuments?.twibbonVerified ?? null,
                },
                {
                    id: 2,
                    type: "followIg",
                    title: "Follow Ig",
                    submissionDetail:
                        "Participants are required to have an Instagram account and must follow social media @mfestitb and upload proof on the registration form provided.",
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp"],
                    uploadThingRoute: "followIg",
                    imageUrl: userDocuments?.followIgImageUrl ?? null,
                    imageKey: userDocuments?.followIgImageKey ?? null,
                    createdAt: userDocuments?.followIgCreatedAt ?? null,
                    status: userDocuments?.followIgStatus ?? null,
                    verified: userDocuments?.followIgVerified ?? null,
                },
            ];

            return {
                documents,
                status: userDocuments.status,
            };
        }),
    getUserComp: protectedProcedure.query(async ({ ctx }) => {
        const thisRegisteredCompUser = await ctx.db.compRegistration.findFirst({
            where: {
                team: {
                    members: {
                        some: {
                            userId: ctx.session.user.id,
                        },
                    },
                },
            },
        });
        if (!thisRegisteredCompUser) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "You are not registered for this competition",
            });
        }
        // console.log(thisRegisteredCompUser);
        return thisRegisteredCompUser;
    }),
    getUserRegisteredComp: protectedProcedure
        .input(
            z.object({
                comp: z.string(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const thisRegisteredCompUser = await ctx.db.compRegistration.findFirst({
                where: {
                    leaderUserId: ctx.session.user.id as string,
                    competitionName:
                        (input.comp as string) === "BCC"
                            ? "BCC"
                            : (input.comp as string) === "IPPC"
                                ? "IPPC"
                                : (input.comp as string) === "PDC"
                                    ? "PDC"
                                    : undefined,
                    statusOrder: "SUCCESS",
                },
            });
            if (!thisRegisteredCompUser) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "You are not registered for this competition",
                });
            }
            // console.log(thisRegisteredCompUser);
            return thisRegisteredCompUser;
        }),
    getTotalParticipantsComp: protectedProcedure
        .input(
            z.object({
                comp: z.enum(["IPPC", "PDC", "STEM", "BCC"]),
            }),
        )
        .query(async ({ ctx, input }) => {
            const totalRegisteredComp = await ctx.db.compRegistration.findMany({
                where: {
                    competitionName: input.comp.toUpperCase() as CompetitionName,
                },
                include: {
                    team: {
                        include: {
                            members: true,
                        },
                    },
                },
            });

            const compMembers = totalRegisteredComp.map(
                (comp) => comp.team?.members as TeamMember[],
            );
            const totalParticipants = compMembers.reduce(
                (acc, curr: TeamMember[]) => acc + curr?.length,
                0,
            );
            return totalParticipants;
        }),
    updateProfile: protectedRateLimitedProcedure
        .input(profileSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.db.user.update({
                where: { id: ctx.session.user.id as string },
                data: {
                    ...input,
                },
            });
        }),
    submitCompetitionFile: protectedRateLimitedProcedure
        .input(submitFileSchema)
        .mutation(async ({ input, ctx }) => {
            const thisRegisteredCompUser = await ctx.db.compRegistration.findFirst({
                where: {
                    leaderUserId: input.leaderUserId as string,
                    competitionName:
                        (input.competitionName as string) === "BCC"
                            ? "BCC"
                            : (input.competitionName as string) === "IPPC"
                                ? "IPPC"
                                : (input.competitionName as string) === "PDC"
                                    ? "PDC"
                                    : undefined,
                    statusOrder: "SUCCESS",
                },
            });
            if (!thisRegisteredCompUser) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "You are not registered for this competition",
                });
            }

            if (input.type && input.type === "full-paper") {
                console.log("Uploading full paper from TRPC")
                await ctx.db.compRegistration.update({
                    where: {
                        teamId: thisRegisteredCompUser?.teamId as string,
                    },
                    data: {
                        submissionFileName2: input.fileName,
                        submissionFileUrl2: input.fileUrl,
                        submissionFileUploaded2: true,
                        submissionFileCreatedAt2: new Date(),
                        submissionFileSubmitted2: true,
                    },
                });
                return
            }

            console.log("Uploading preliminary from TRPC")
            await ctx.db.compRegistration.update({
                where: {
                    teamId: thisRegisteredCompUser?.teamId as string,
                },
                data: {
                    submissionFileName: input.fileName,
                    submissionFileUrl: input.fileUrl,
                    submissionFileUploaded: true,
                    submissionFileCreatedAt: new Date(),
                    submissionFileSubmitted: true,
                },
            });
        }),
    submitDocuments: protectedRateLimitedProcedure
        .input(documentsSchema)
        .mutation(async ({ input, ctx }) => {
            console.log(input);
            const userId = input.userId;
            const requestedUser = await ctx.db.user.findUnique({
                where: { id: userId },
            });
            if (!requestedUser) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const [userVerification, userDocuments] = await Promise.all([
                ctx.db.documents.findUnique({
                    where: { userId },
                    select: { status: true },
                }),
                ctx.db.documents.findUnique({
                    where: {
                        userId,
                    },
                }),
            ]);
            if (!userVerification) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User documents not found",
                });
            }
            if (!userDocuments) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User documents not found",
                });
            }

            const documents: Document[] = [
                {
                    id: 0,
                    type: "identityCard",
                    title: "Identity Card",
                    submissionDetail:
                        "Every participant must upload identity card scan file Student Card",
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp"],
                    uploadThingRoute: "identityCard",
                    imageUrl: userDocuments?.identityCardImageUrl ?? null,
                    imageKey: userDocuments?.identityCardImageKey ?? null,
                    createdAt: userDocuments?.identityCardCreatedAt ?? null,
                    status: userDocuments?.identityCardStatus ?? null,
                    verified: userDocuments?.identityCardVerified ?? null,
                },
                {
                    id: 1,
                    type: "twibbon",
                    title: "Twibbon",
                    submissionDetail: ` Twibbon is uploaded to the Instagram account of each team participant in the form of an Instagram post by tagging the official M-FEST 2026 account @mfestitb. Instagram accounts must not be in private mode. Participants may not delete Instagram posts until the competition series is finished. Captions on Instagram posts follow the template format.
          `,
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp", ".pdf"],
                    uploadThingRoute: "twibbon",
                    imageUrl: userDocuments?.twibbonImageUrl ?? null,
                    imageKey: userDocuments?.twibbonImageKey ?? null,
                    createdAt: userDocuments?.twibbonCreatedAt ?? null,
                    status: userDocuments?.twibbonStatus ?? null,
                    verified: userDocuments?.twibbonVerified ?? null,
                },
                {
                    id: 2,
                    type: "followIg",
                    title: "Follow Ig",
                    submissionDetail:
                        "Participants are required to have an Instagram account and must follow social media @mfestitb and upload proof on the registration form provided.",
                    acceptedFiles: [".png", ".jpeg", ".jpg", ".webp", ".pdf"],
                    uploadThingRoute: "followIg",
                    imageUrl: userDocuments?.followIgImageUrl ?? null,
                    imageKey: userDocuments?.followIgImageKey ?? null,
                    createdAt: userDocuments?.followIgCreatedAt ?? null,
                    status: userDocuments?.followIgStatus ?? null,
                    verified: userDocuments?.followIgVerified ?? null,
                },
            ];

            // console.log("Documents: ", documents);
            // console.log("User documents: ", userVerification);
            if (userVerification?.status === "PENDING") {
                // AWAITING_UPLOAD means user has not submitted any pending documents
                // PENDING means user has submitted documents but not verified yet
                const documentsStatus = documents?.map((document) => document.status);
                const isDocumentsStillPendingExist =
                    documentsStatus.includes("AWAITING_UPLOAD");
                console.log(
                    "Is all documents still pending: ",
                    isDocumentsStillPendingExist,
                );
                if (!isDocumentsStillPendingExist) {
                    if (documentsStatus.includes("VERIFIED")) {
                        const documentsNotVerified = documents?.filter(
                            (document) => document.status === "PENDING",
                        );
                        if (!documentsNotVerified.length) {
                            await ctx.db.documents.update({
                                where: { userId },
                                data: {
                                    status: "ACCEPTED",
                                },
                            });
                            return {
                                message: "Your documents have been verified",
                            };
                        }
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: `Your ${documentsNotVerified?.length
                                } documents (${documentsNotVerified
                                    ?.map((document) => document.title)
                                    .join(", ")}) is waiting to be verified`,
                        });
                    }
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Your documents are being verified, please wait",
                    });
                }

                if (isDocumentsStillPendingExist) {
                    const documentsStillPending = documents?.filter(
                        (document) => document.status === "AWAITING_UPLOAD",
                    );
                    // console.log(
                    //     "Documents still pending: ",
                    //     documentsStillPending,
                    // );
                    documentsStillPending?.map(async (document) => {
                        if (document.status === "AWAITING_UPLOAD") {
                            await ctx.db.documents.update({
                                where: { userId },
                                data: {
                                    [`${document.type}Status`]: "PENDING",
                                },
                            });
                        }
                    });
                    return {
                        message: `Your pending ${documentsStillPending?.length
                            } documents (${documentsStillPending
                                ?.map((document) => document.title)
                                .join(", ")}) have been submitted`,
                    };
                }
            }

            if (userVerification?.status === "ACCEPTED") {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                        "Your documents have been verified, you can register for competitions",
                });
            }

            // If user verifaction status is NOT_SUBMITTED run the rest of the code

            await ctx.db.documents.update({
                where: {
                    userId,
                },
                data: {
                    identityCardStatus: "PENDING",
                    twibbonStatus: "PENDING",
                    followIgStatus: "PENDING",
                    status: "PENDING",
                },
            });

            return { message: "Your documents have been submitted" };
        }),
    getCurrentCompQuotas: protectedProcedure.query(async ({ ctx }) => {
        const stats = await ctx.db.compRegistration.groupBy({
            by: ["competitionName"],
            _count: { competitionName: true },
        });

        const counts = stats.reduce((acc, curr) => {
            acc[curr.competitionName] = curr._count.competitionName;
            return acc;
        }, {} as Record<string, number>);

        return counts
    }),
    getCurrentQuotaByCompName: protectedProcedure.input(z.object({
        comp: z.string()
    })).query(async ({ input, ctx }) => {
        const stats = await ctx.db.compRegistration.groupBy({
            by: ["competitionName"],
            _count: { competitionName: true },
        });

        const counts = stats.reduce((acc, curr) => {
            acc[curr.competitionName] = curr._count.competitionName;
            return acc;
        }, {} as Record<string, number>);

        const currentCompQuota = counts[input.comp.toUpperCase()] || 0;

        return currentCompQuota
    }),
    getCurrentMotorTypeQuota: protectedProcedure.query(async ({ ctx }) => {
        const stats = await ctx.db.eventRegistration.groupBy({
            by: ["motorType"],
            _count: { motorType: true },
        });
        const currentMotorTypeQuota = {
            "MATIC": stats.find((stat) => stat.motorType === "MATIC")?._count.motorType ?? 0,
            "MANUAL": stats.find((stat) => stat.motorType === "MANUAL")?._count.motorType ?? 0,
        }

        return currentMotorTypeQuota
    })
});
