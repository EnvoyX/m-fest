import { db } from "@/server/db";

export async function getExamAttempt(userId: string | undefined) {
    if (!userId) return true;
    const stats = await db.quizResult.findMany({
        where: {
            userId: userId
        }
    })

    const examAttempted = stats.length >= 3;

    return examAttempted;
}

export async function getExamStatus() {
    const examState = await db.examState.findFirst({
        select: { examOpen: true }
    });

    const isExamOpen = examState?.examOpen as boolean;
    return isExamOpen;
}
