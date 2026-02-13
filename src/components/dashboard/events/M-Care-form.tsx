"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventsList, type Event } from "@/lib/eventDashboard";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { mCareSchema } from "@/lib/event-schema";
import { useEffect, useRef, useState, useTransition } from "react";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const CLINIC_OPTIONS = [
    { id: "DONATE_BLOOD", label: "Donor Darah" },
    { id: "EYE_CHECK", label: "Cek Kesehatan Mata" },
    { id: "BOTH", label: "Keduanya" },
] as const;

const MaxQuota = 50;

export default function MCareForm({ fetchedcurrentQuotas }: { fetchedcurrentQuotas: number }) {
    const form = useForm<mCareSchema>({
        resolver: zodResolver(mCareSchema),
        defaultValues: {
            participantName: "",
            phoneNumber: "",
            fullAddress: "",
            emergencyContact: "",
            emergencyContactName: "",
            memenuhiSyarat: false,
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
    const mCareEvent = events?.filter((e) => e.eventType === "M_CARE")
    if (mCareEvent?.length) router.push("/dashboard/events");

    const { data: liveQuotas } = useQuery({
        ...trpc.dashboard.getCurrentQuotaEyeCheckUp.queryOptions(),
        
        //enabled: fetchedcurrentQuotas < MaxQuota,
        enabled: true,

        refetchInterval: (query) => {
            const data = query.state.data
            // Optimization: stop polling if data exists and we hit/exceed max
            return typeof data === 'number' && data >= MaxQuota ? false : 2000
        },

        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })

    const isEyeCheckFull = (liveQuotas ?? fetchedcurrentQuotas) >= MaxQuota;

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
            // console.log(`Registered event M-Care`);
            startTransition(() => {
                router.push("/dashboard/events");
            });
        },
    });

    function onSubmit(data: mCareSchema) {
        // console.log("M-Care Form Data:", data);
        registerEvent.mutate({
            registrationType: "M-CARE",
            ...data,
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center  p-6">
            <div className="w-full max-w-2xl p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
                <header className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
                        M-CARE
                    </h2>
                    <p className="text-slate-400 mt-2">
                        Cek Kesehatan Mata & Donor Darah
                    </p>
                </header>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="participantName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">
                                            Nama Lengkap
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ichigo Kurosaki"
                                                {...field}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-slate-200">
                                            Jenis Kelamin
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Male" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal text-slate-300">
                                                        Pria
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Female" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal text-slate-300">
                                                        Wanita
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-200">
                                        Nomor Telepon (WA)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="081234567890"
                                            {...field}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fullAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-200">
                                        Alamat Lengkap Asal (domisili)
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Jl. Ganesha 10 Coblong, Kota Bandung, Jawa Barat, 40132"
                                            {...field}
                                            className="bg-white/5 border-white/10 text-white min-h-25"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="p-4 rounded-xl border border-dashed border-white/20 bg-white/5 space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400">
                                Kontak Darurat
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="emergencyContactName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300 text-xs">
                                                Nama Kontak Darurat
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Isshin Kurosaki "
                                                    {...field}
                                                    className="bg-white/5 border-white/10 text-white"
                                                />
                                            </FormControl>
                                            <FormMessage className="md:hidden" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emergencyContact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300 text-xs">
                                                Nomor Kontak Darurat
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="'081234567890 (Ayah)"
                                                    {...field}
                                                    className="bg-white/5 border-white/10 text-white"
                                                />
                                            </FormControl>
                                            <FormMessage className="md:hidden" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300 max-md:hidden">
                                {form.formState.errors.emergencyContactName ? (
                                    <p className="text-destructive text-xs -mt-2">
                                        {form.formState.errors.emergencyContactName.message}
                                    </p>
                                ) : (
                                    <p></p>
                                )}
                                {form.formState.errors.emergencyContact ? (
                                    <p className="text-destructive text-xs -mt-2">
                                        {form.formState.errors.emergencyContact.message}
                                    </p>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="clinicActivity"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <div>
                                        <FormLabel className="text-slate-200">
                                            Aktivitas Klinik
                                        </FormLabel>
                                        <FormDescription className="text-slate-400">
                                            Pilih salah satu kegiatan yang akan diikuti.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                        >
                                            {CLINIC_OPTIONS.map((item) => {
                                            const isDisabled = item.id === "EYE_CHECK" && isEyeCheckFull;

                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className={`flex items-center space-x-3 space-y-0 cursor-pointer ${isDisabled ? "opacity-50" : ""}`}
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem value={item.id} disabled={isDisabled} />
                                                    </FormControl>
                                                    <FormLabel className={`font-normal ${isDisabled ? "text-slate-500" : "text-slate-300"}`}>
                                                        {item.label} {isDisabled && "(Full)"}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        })}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="memenuhiSyarat"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-slate-300">
                                            Apakah{" "}
                                            <Link
                                                href="/events/m-care#syarat-ketentuan"
                                                target="_blank"
                                                className="italic underline font-bold"
                                            >
                                                Syarat dan Ketentuan
                                            </Link>{" "}
                                            Sudah Terpenuhi?
                                        </FormLabel>
                                    </div>
                                </FormItem>
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
