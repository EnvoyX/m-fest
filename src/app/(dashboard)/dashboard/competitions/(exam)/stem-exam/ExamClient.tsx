"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Award,
    Timer,
    AlertCircle,
    List,
    ArrowRight,
    RefreshCw,
} from "lucide-react";
import { sessionsDataA, sessionsDataB, sessionsDataC, sessionsDataTechMeet } from "@/lib/examQuestion";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { QuizTypes } from "../../../../../../../prisma/generated/prisma/enums";
import type { User, TeamMember } from "../../../../../../../prisma/generated/prisma/client";
import { cn, getCurrentDate } from "@/lib/utils";
import MathRenderer from "@/components/dashboard/competitions/MathRenderer";
import { Button } from "@/components/ui/button";

export default function ExamClient({ user, teamMember }: { user: User, teamMember: TeamMember }) {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    // --- 1. State Global Sesi ---
    const [activeSession, setActiveSession] = useState<1 | 2 | 3>(1);
    const [isLoading, setIsLoading] = useState(false);
    const kodeSoal = (teamMember.kodeSoal as "A" | "B" | "C" | "TECHMEET");

    const { data: isEssayOpen, isFetching } = useQuery(trpc.stemExam.getEssayState.queryOptions())


    // --- 2. Derivasi Data (Memoized) ---
    const currentSessionData = useMemo(() => {
        const currentDate = getCurrentDate();
        const techMeetThreshold = new Date("2024-07-01T00:00:00");

        if (currentDate < techMeetThreshold && kodeSoal === "TECHMEET") {
            return sessionsDataTechMeet[activeSession];
        }

        const dataMap = {
            A: sessionsDataA,
            B: sessionsDataB,
            C: sessionsDataC,
            TECHMEET: sessionsDataTechMeet,
        };

        return dataMap[kodeSoal]?.[activeSession];
    }, [activeSession, kodeSoal]);

    const quizQuestions = currentSessionData?.questions || [];

    // --- 3. State Kuis ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    const [showScore, setShowScore] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const INITIAL_TIME = 2 * 60 * 60; // 1 Jam
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

    // --- 4. Reset Logic (Kunci Perbaikan) ---
    // Setiap kali activeSession berubah, kita reset state kuis ke awal
    useEffect(() => {
        if (quizQuestions.length > 0) {
            setCurrentQuestionIndex(0);
            setUserAnswers(Array(quizQuestions.length).fill(null));
            setShowScore(false);
        }
    }, [activeSession, quizQuestions.length]);

    // --- 5. Mutation & Submission ---
    const submitExamMutation = useMutation({
        ...trpc.stemExam.submitExam.mutationOptions(),
        onMutate: () => {
            setIsLoading(true);
            toast.loading("Submitting...", { id: "submit-exam" });
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.dismiss("submit-exam");
            toast.success(`Submitted Successfully`);
            setShowScore(true);
        },
        onError: (error) => {
            setIsLoading(false);
            toast.dismiss("submit-exam");
            toast.error("Failed to submit", { description: error.message });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.stemExam.submitExam.mutationKey(),
            });
        },
    });

    const handleSubmitQuiz = useCallback(async () => {
        if (isSaving || !user) return;
        setIsSaving(true);

        let calculatedScore = 0;
        quizQuestions.forEach((question, index) => {
            const selectedIndex: number = userAnswers[index];
            if (selectedIndex !== null && question.answerOptions[selectedIndex]?.isCorrect) {
                calculatedScore += 1;
            }
        });

        const submissionData = {
            userId: user.id as string,
            score: calculatedScore,
            totalQuestions: quizQuestions.length,
            timeSpent: INITIAL_TIME - timeLeft,
            answers: userAnswers.map((a) => (a !== null ? Number(a) : null)),
            type: currentSessionData.subject as QuizTypes,
        };

        submitExamMutation.mutate(submissionData, {
            onSettled: () => setIsSaving(false),
        });
    }, [isSaving, user, userAnswers, quizQuestions, currentSessionData, timeLeft, submitExamMutation]);

    // --- 6. Handlers ---
    const handleNextSession = () => {
        if (activeSession < 3) {
            setActiveSession((prev) => (prev + 1) as 1 | 2 | 3);
        } else {
            router.push("/dashboard");
        }
    };

    const handleAnswerSelection = (index: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = index;
        setUserAnswers(newAnswers);
    };

    // Timer logic
    useEffect(() => {
        if (showScore) return;
        if (timeLeft <= 0) {
            handleSubmitQuiz();
            return;
        }
        const timerId = setInterval(() => setTimeLeft((p) => p - 1), 1000);
        return () => clearInterval(timerId);
    }, [showScore, timeLeft, handleSubmitQuiz]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // Safety check jika data belum load
    if (!currentSessionData) return <div className="p-10 text-center">Loading session data...</div>;

    return (
        <div className="min-h-screen bg-transparent backdrop-glass-lg flex-1 min-w-0 items-start justify-center p-0 lg:p-8 font-sans overflow-x-hidden">
            <div className="w-full max-w-7xl bg-white shadow-2xl lg:rounded-2xl border border-slate-200 min-h-screen lg:min-h-0 overflow-hidden flex flex-col lg:flex-row mx-auto">

                {/* Sidebar */}
                {!showScore && (
                    <div className="lg:w-80 bg-slate-900 text-white p-6 flex flex-col shrink-0 border-r border-slate-800">
                        <div className="mb-8">
                            <h1 className="text-lg font-black tracking-tight">STEM Preliminary</h1>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{user?.name}</p>
                            <p className="text-xl font-black text-blue-100">{currentSessionData.subject}</p>
                        </div>

                        {/* Timer */}
                        <div className={`mb-8 p-4 rounded-xl border-2 flex items-center justify-between ${timeLeft < 60 ? "bg-red-500/10 border-red-500 animate-pulse" : "bg-white/5 border-white/10"}`}>
                            <div className="flex items-center space-x-3">
                                <Timer className={`w-5 h-5 ${timeLeft < 60 ? "text-red-400" : "text-blue-400"}`} />
                                <span className="text-2xl font-mono font-bold">{formatTime(timeLeft)}</span>
                            </div>
                        </div>

                        {/* Navigation Grid */}
                        <div className="flex-1">
                            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Question List</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {quizQuestions.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentQuestionIndex(index)}
                                        className={`h-10 rounded-lg font-bold text-sm transition-all ${index === currentQuestionIndex ? "bg-blue-600 text-white" :
                                            userAnswers[index] !== null ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-white/5 text-slate-500"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-white">
                    {showScore ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                            <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-200 max-w-lg w-full">
                                <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
                                    <Award className="w-16 h-16 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">
                                    {activeSession === 3 ? "Exam Completed!" : `Session ${currentSessionData.subject} Done!`}
                                </h2>
                                {
                                    activeSession === 2 && (
                                        <Button
                                            className="cursor-pointer"
                                            onClick={() => {
                                                queryClient.invalidateQueries({
                                                    queryKey: trpc.stemExam.getEssayState.queryKey()
                                                })
                                            }}>
                                            <RefreshCw className={cn("w-5 h-5", { "animate-spin": isFetching })} />
                                        </Button>
                                    )
                                }
                                <Button
                                    onClick={handleNextSession}
                                    disabled={activeSession === 2 && isEssayOpen === false}
                                    className="w-full mt-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all"
                                >
                                    {activeSession === 3 ? "Finish & Dashboard" : `Go to Session ${activeSession + 1}`}
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col p-6 lg:p-16 max-w-4xl mx-auto w-full">
                            <div className="mb-10 flex justify-between items-center border-b pb-6">
                                <div>
                                    <p className="text-blue-600 font-black uppercase text-[10px]">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                                    <h2 className="text-2xl font-black text-slate-800">Soal Nomor {currentQuestionIndex + 1}</h2>
                                </div>
                            </div>

                            <div className="mb-10">
                                {quizQuestions[currentQuestionIndex]?.questionPhoto && (
                                    <img
                                        src={quizQuestions[currentQuestionIndex].questionPhoto}
                                        alt="Question"
                                        height={100}
                                        className="mb-6 rounded-xl border object-contain max-h-80 w-full"
                                    />
                                )}
                                <h3 className="text-xl font-bold text-slate-900 leading-relaxed break-words text-justify">
                                    <MathRenderer equation={quizQuestions[currentQuestionIndex]?.questionText || ""} />
                                </h3>
                            </div>

                            {/* Opsi Jawaban */}
                            <div className="space-y-4 mb-12 flex-1">
                                {activeSession === 3 ? (
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-medium">
                                        Submit your answer via the forms provided in the WhatsApp group.
                                    </div>
                                ) : (
                                    quizQuestions[currentQuestionIndex]?.answerOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelection(index)}
                                            className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center space-x-5 ${userAnswers[currentQuestionIndex] === index
                                                ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                                                : "bg-white border-slate-100 text-slate-700 hover:border-blue-200"
                                                }`}
                                        >
                                            <span className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black ${userAnswers[currentQuestionIndex] === index ? "bg-white/20 border-white/20 text-white" : "bg-slate-50 text-slate-400"
                                                }`}>
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            <span className="text-lg font-bold"><MathRenderer equation={option.answerText} />  </span>
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Footer Navigasi */}
                            <div className="mt-auto pt-8 border-t flex justify-between items-center">
                                <button
                                    onClick={() => setCurrentQuestionIndex(p => p - 1)}
                                    disabled={currentQuestionIndex === 0}
                                    className="px-6 py-3 font-bold text-slate-500 disabled:opacity-30 flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-5 h-5" /> Back
                                </button>

                                {currentQuestionIndex < quizQuestions.length - 1 ? (
                                    <button
                                        onClick={() => setCurrentQuestionIndex(p => p + 1)}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2"
                                    >
                                        Next <ChevronRight className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmitQuiz}
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg"
                                    >
                                        {isLoading ? "Submitting..." : (activeSession === 3) ? "Submit Exam" : "Submit Session"}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
