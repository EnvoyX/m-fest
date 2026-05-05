"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { mTalksSchema } from "@/lib/event-schema";
import { useEffect, useRef, useState, useTransition } from "react";
import { useTRPC } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaInstagram } from "react-icons/fa";
import type { MTalksSessionType } from "../../../../prisma/generated/prisma/enums";
import UploadEventDialog from "./UploadEventDialog";

const TALKS_SESSIONS = [
{ 
        value: "TALKS_1", 
        label: "Sesi 1", 
        day: 1,
        time: "09.30 - 11.00",
        speaker: "Ryan Aditya",
        role: "VP Non Rig Services Operation Pertamina Drilling Services Indonesia"
    },
    { 
        value: "TALKS_2", 
        label: "Sesi 2", 
        day: 1,
        time: "13.00 - 14.30",
        speaker: "Mochamad Safarudin, S.T., M.T. & Bintang Kurniadi, S.T.",
        role: "Country Manager and Principal Engineer at GEXCON Indonesia & Senior Engineer at GEXCON Indonesia"
    },
    { 
        value: "TALKS_3", 
        label: "Sesi 1", 
        day: 2,
        time: "09.30 - 11.00",
        speaker: "Achmad Rizal Roesindrawan",
        role: "Direktur Corporate Business Development PT Energia Prima Nusantara"
    },
    { 
        value: "TALKS_4", 
        label: "Sesi 2", 
        day: 2,
        time: "11.15 - 12.45",
        speaker: "Zahid Azmi Ibrahim",
        role: "Content Creator (Tiktok, Instagram, Youtube) & Youtuber and Author"
    },
];
const TALKS_DAYS = [
    { day: 1, label: "Day 1 - 8 Mei 2026" },
    { day: 2, label: "Day 2 - 9 Mei 2026" },
]


export default function MTalksForm() {
    const form = useForm<mTalksSchema>({
        resolver: zodResolver(mTalksSchema),
        defaultValues: {
            participantName: "",
            isITB: false,
            nimITB: "",
            majorITB: "",
            institution: "",
            talksSessions: [],
            followIgUrl: "",
        },
    });

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;
    });

    const trpc = useTRPC();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);

    const { data: events } = useQuery({
        ...trpc.event.getEventRegistrationByUserId.queryOptions()
    })

    const { data: talks4Count } = useQuery({
        ...trpc.event.getTalks4Count.queryOptions()
    })

    const mTalksEvent = events?.filter((e) => e.eventType === "M_TALKS")
    if (mTalksEvent?.length) router.push("/dashboard/events");

    const registerEvent = useMutation({
        ...trpc.event.registerEvent.mutationOptions(),
        onMutate: (data) => {
            setIsLoading(true);
            console.log("Registering event...", data);
            toast.loading("Registering event...", {
                id: "registering-event",
            });
        },
        onSuccess: (error, variables) => {
            setIsLoading(false);
            toast.dismiss("registering-event");
            toast.success("Event registered");
            console.log("Event registered", variables);
        },
        onError: (error, variables) => {
            setIsLoading(false);
            toast.dismiss("registering-event");
            toast.error("Failed to register event", {
                description: error.message,
            });
            console.log("Event registered", variables);

        },
        onSettled: () => {
            console.log(`Registered event M-Talks`);
            startTransition(() => {
                router.push("/dashboard/events");
            });
        },
    });

    function handleUploadSuccess(url: string) {
        form.setValue("followIgUrl", url);
    }

    function onSubmit(data: mTalksSchema) {
        if (data.talksSessions.includes("TALKS_4") && (talks4Count ?? 0) >= 100) {
            toast.error("Sesi 2 Day 2 sudah penuh", {
                description: "Kuota untuk Sesi 2 Day 2 telah mencapai batas maksimum (100 peserta).",
            });
            return;
        }

        registerEvent.mutate({
            registrationType: "M-TALKS",
            ...data,
        });
    }

    return (
        <div className="w-full max-w-lg p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 tracking-tight text-center">
                    M-TALKS Registration
                </h2>
                {/* <p className="text-slate-400">
          Join the World of Mechanical Engineering Exhibitions. Please fill in
          your details.
        </p> */}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="participantName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-200">Nama Peserta</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ichigo Kurosaki"
                                        {...field}
                                        className="bg-white/5 border-white/10 text-white focus:ring-purple-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isITB"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4 bg-white/5">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-slate-200">Status</FormLabel>
                                    <FormDescription className="text-slate-400 text-xs">
                                        Apakah Anda mahasiswa ITB?
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(value) => {
                                            field.onChange(value);
                                            form.setValue("nimITB", "");
                                            form.setValue("majorITB", "");
                                            form.setValue("institution", "");
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {form.watch("isITB") ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <FormField
                                control={form.control}
                                name="nimITB"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">NIM</FormLabel>
                                        <FormControl>
                                            <Input placeholder="13123069" {...field} className="bg-white/5 border-white/10 text-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="majorITB"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">Jurusan</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Teknik Mesin" {...field} className="bg-white/5 border-white/10 text-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ) : (
                        <FormField
                            control={form.control}
                            name="institution"
                            render={({ field }) => (
                                <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <FormLabel className="text-slate-200">Asal Kampus / Instansi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Universitas Indonesia / -" {...field} className="bg-white/5 border-white/10 text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="talksSessions"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-slate-200">Pilih Sesi Talks</FormLabel>
                                <div className="flex flex-col gap-4">
                                    {TALKS_DAYS.map(({ day, label }) => (
                                        <div key={day}>
                                            <p className="text-sm font-medium text-slate-300 mb-2">{label}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {TALKS_SESSIONS.filter((s) => s.day === day).map((session) => (
                                                    <FormField
                                                        key={session.value}
                                                        control={form.control}
                                                        name="talksSessions"
                                                        render={({ field }) => (
                                                            <FormItem className="flex items-start space-x-3 space-y-0 p-3 rounded-md bg-white/5 border border-white/10">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        className="mt-1"
                                                                        checked={field.value?.includes(session.value as MTalksSessionType)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, session.value])
                                                                                : field.onChange(field.value?.filter((v) => v !== session.value));
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <div className="flex flex-col gap-0.5">
                                                                    <FormLabel className="text-xs font-semibold text-slate-200 cursor-pointer">
                                                                        {session.label} · {session.time}
                                                                    </FormLabel>
                                                                    <span className="text-xs font-medium text-yellow-400">{session.speaker}</span>
                                                                    {session.role && (
                                                                        <span className="text-xs text-slate-400">{session.role}</span>
                                                                    )}
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <a href="https://www.instagram.com/mfestitb?igsh=MWgwZHE0MXBnZWdjag==" className="font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 italic underline bold"
                        target="_blank"
                    >
                        Instagram @mfestitb
                    </a>
                    <UploadEventDialog
                        id={1}
                        title="Upload Follow IG Proof"
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        uploadThingRoute="uploadProofFollowIg"
                        handleUploadSuccess={handleUploadSuccess}
                    />

                    <FormField
                        control={form.control}
                        name="followIgUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-200">Follow Instagram</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <FaInstagram className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                        <Input {...field} disabled className="bg-white/5 border-white/10 text-slate-400 pl-10 cursor-not-allowed" />
                                    </div>
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sourceInfo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-200">
                                    Tau informasi dari?
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                            <SelectValue placeholder="Sumber Informasi" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                                        <SelectItem value="INSTAGRAM_MFEST_ITB">
                                            Instagram M-Fest
                                        </SelectItem>
                                        <SelectItem value="FRIEND">Teman</SelectItem>
                                        <SelectItem value="BANNER">Banner</SelectItem>
                                        <SelectItem value="OTHER">Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading || form.formState.isSubmitting || isPending}
                        className="w-full h-12 bg-linear-to-r from-teal-500 to-blue-600 hover:opacity-90 text-white font-bold transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
                    >
                        {isLoading || form.formState.isSubmitting || isPending ? (
                            <Loader2 className="animate-spin size-6" />
                        ) : (
                            "Register"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
