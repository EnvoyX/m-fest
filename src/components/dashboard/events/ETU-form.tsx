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
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { etuSchema } from "@/lib/event-schema";
import { useEffect, useRef, useState, useTransition } from "react";
import { useTRPC } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { eventsList } from "@/lib/eventDashboard";

const MOTORTYPES_OPTIONS = [
    { id: "MATIC", label: "Matic" },
    { id: "MANUAL", label: "Manual" },
] as const;

export default function EtuForm() {
    const form = useForm<etuSchema>({
        resolver: zodResolver(etuSchema),
        defaultValues: {
            participantName: "",
            phoneNumber: "",
            isITB: false,
            nimOrNip: "",
            merekKendaraan: "",
            platNomor: "",
            isSopCompliant: false,
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
    const etuEvent = events?.filter((e) => e.eventType === "ETU")
    if (etuEvent?.length) router.push("/dashboard/events");

    const { data: currentQuota } = useQuery({
        ...trpc.dashboard.getCurrentMotorTypeQuota.queryOptions(),
    })

    const isMaticFull = currentQuota?.MATIC as number >= (eventsList.find((event) => event.id === "ETU")?.slotmatic ?? 0);
    const isManualFull = currentQuota?.MANUAL as number >= (eventsList.find((event) => event.id === "ETU")?.slotmanual ?? 0);


    const registerEvent = useMutation({
        ...trpc.event.registerEvent.mutationOptions(),
        onMutate: (data) => {
            setIsLoading(true);
            console.log("Registering event...", data);
            toast.loading("Registering event...", {
                id: "registering-event",
            });
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.dismiss("registering-event");
            toast.success("Event registered");
        },
        onError: (error, variables) => {
            setIsLoading(false);
            toast.dismiss("registering-event");
            toast.error("Failed to register event", {
                description: error.message,
            });
        },
        onSettled: () => {
            // console.log(`Registered event ETU`);
            startTransition(() => {
                router.push("/dashboard/events");
            });
        },
    });

    const onSubmit = (data: etuSchema) => {
        // console.log("Form Submitted: ", data);
        registerEvent.mutate({
            registrationType: "ETU",
            ...data,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 py-12 ">
            <div className="w-full max-w-2xl p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-glass-lg shadow-2xl">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
                        ENGINE TUNE UP
                    </h2>
                    {/* <p className="text-slate-400 mt-2 font-medium">
            Keep your engine running at peak performance.
          </p> */}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="participantName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">
                                            Nama Lengkap
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ichigo Kurosaki"
                                                {...field}
                                                className="bg-white/5 border-white/10 text-white focus:border-cyan-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="md:hidden" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">
                                            Nomor Telepon
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="081234567890"
                                                {...field}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage className="md:hidden" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {form.formState.errors.participantName ? (
                                <p className="text-destructive text-sm -mt-4">
                                    {form.formState.errors.participantName.message}
                                </p>
                            ) : (
                                <p></p>
                            )}
                            {form.formState.errors.phoneNumber ? (
                                <p className="text-destructive text-sm -mt-4">
                                    {form.formState.errors.phoneNumber.message}
                                </p>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="isITB"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-xl border border-white/10 p-4 bg-white/5">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-slate-200">
                                            Apakah Anda Civitas Akademika ITB?
                                        </FormLabel>
                                        <FormDescription className="text-xs text-slate-400">
                                            Anda bisa abaikan pilihan ini jika bukan Civitas Akademika
                                            ITB.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={(value) => {
                                                field.onChange(value);
                                                form.setValue("nimOrNip", "");
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {form.watch("isITB") && (
                            <FormField
                                control={form.control}
                                name="nimOrNip"
                                render={({ field }) => (
                                    <FormItem className="animate-in slide-in-from-left-2 duration-300">
                                        <FormLabel className="text-slate-300">NIM / NIP</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="NIM/NIP Anda"
                                                {...field}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <div className="pt-4 border-t border-white/5">
                            <h3 className="text-sm font-bold text-cyan-500 mb-4 uppercase tracking-widest">
                                Informasi Motor
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="md:col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="motorType"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <div>
                                                    <FormLabel className="text-slate-300">
                                                        Tipe Motor
                                                    </FormLabel>
                                                    <FormDescription className="text-slate-400 mt-1">
                                                        Pilih tipe motor yang anda miliki.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3"
                                                    >
                                                        {MOTORTYPES_OPTIONS.map((item) => (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex items-center space-x-3 space-y-0 cursor-pointer"
                                                            >
                                                                <FormControl>
                                                                    <RadioGroupItem value={item.id} disabled={item.id === "MATIC" ? isMaticFull : isManualFull} />
                                                                </FormControl>
                                                                <FormLabel className="font-normal text-slate-300 cursor-pointer w-full">
                                                                    {item.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="merekKendaraan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-300 text-xs">
                                                    Merek Kendaraan
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Vario 125"
                                                        {...field}
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="tahunBuat"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-300 text-xs">
                                                    Tahun Pembuatan (Sesuai STNK)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="2003"
                                                        {...field}
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="platNomor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-300 text-xs">
                                                    Nomor Polisi (Plat Kendaraan)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="M 1312 ETU"
                                                        {...field}
                                                        className="bg-white/5 border-white/10 text-white uppercase"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="lastServiceDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">
                                        Terakhir kali Servis?
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue placeholder="Kapan terakhir kali servis?" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="< 3 bulan">
                                                Kurang dari 3 bulan yang lalu
                                            </SelectItem>
                                            <SelectItem value="3-6 bulan">
                                                3 - 6 bulan yang lalu
                                            </SelectItem>
                                            <SelectItem value="6 bulan - 1 tahun">
                                                6 bulan - 1 tahun yang lalu
                                            </SelectItem>
                                            <SelectItem value="> 1 tahun">
                                                Lebih dari 1 tahun yang lalu
                                            </SelectItem>
                                            <SelectItem value="Tidak Ingat">Tidak Ingat</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isSopCompliant"
                            render={({ field }) => (
                                <>
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-dashed border-white/20 p-4 bg-white/5">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-slate-300 text-sm">
                                                Apakah Anda setuju dengan SOP yang diberikan?
                                                <Link
                                                    href="/events/engine-tune-up#sop"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-cyan-400 hover:text-cyan-300 underline inline-flex"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    SOP
                                                </Link>
                                            </FormLabel>
                                            <FormDescription className="text-xs text-slate-400 italic">
                                                Hasil tune-up tergantung pada kondisi awal motor.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                    <FormMessage />
                                </>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isLoading || form.formState.isSubmitting || isPending}
                            className="w-full h-12 bg-linear-to-r from-teal-500 to-blue-600 hover:opacity-90 text-white font-bold transition-all shadow-lg shadow-teal-500/20"
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
        </div>
    );
}
