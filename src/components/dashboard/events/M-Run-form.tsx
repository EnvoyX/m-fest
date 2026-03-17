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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mRunSchema } from "@/lib/event-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef, useState, useTransition } from "react";
import { getCurrentDate, getMRUNBatchInfo } from "@/lib/utils";
import UploadEventDialog from "./UploadEventDialog";
import { useTRPC } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowUpRightFromSquare, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const jerseySizes  = [{
    label: "XS",
    value: "XS"
}, {
    label: "S",
    value: "S"
}, {
    label: "M",
    value: "M"
}, {
    label: "L",
    value: "L"
}, {
    label: "XL",
    value: "XL"
},
{
    label: "2XL",
    value: "XXL"
},
{
    label: "3XL",
    value: "XXXL"
}]

export default function MRunForm() {
    const currentDate = getCurrentDate();
    const batchInfo = getMRUNBatchInfo(currentDate);
    const form = useForm<mRunSchema>({
        resolver: zodResolver(mRunSchema),
        defaultValues: {
            participantName: "",
            age: "",
            isAlumniHMM: false,
            isHMM: false,
            nimHMM: "",
            riwayatPenyakit: false,
            alergi: false,
            siapLomba: false,
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
    const mRunEvent = events?.filter((e) => e.eventType === "M_RUN")
    if (mRunEvent?.length) router.push("/dashboard/events");

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
            // console.log(`Registered event M-Run`);
            startTransition(() => {
                router.push("/dashboard/events");
            });
        },
    });

    const is3XL = form.watch("jerseySize") === "XXXL" ? 10000 : 0

    const onSubmit = (data: mRunSchema) => {
        // console.log("Form Submitted: ", data);
        registerEvent.mutate({
            registrationType: "M-RUN",
            batch: batchInfo?.batch,
            price: form.watch("category") === "UMUM" ? (batchInfo?.pricePublic  as number + is3XL) : (batchInfo?.priceStudent as number + is3XL),
            ...data,
            
        });
    };

    return (
        <div className="min-h-screen bg-transparent backdrop-glass-lg flex items-center justify-center p-4 py-16">
            <div className="w-full max-w-3xl p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 italic">
                        M-RUN
                    </h2>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 border-b border-teal-500/20 pb-2">
                                Informasi Pribadi
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="participantName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">
                                                Nama Peserta
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
                                    name="activeEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ichigokurosaki@gmail.com"
                                                    type="email"
                                                    {...field}
                                                    className="bg-white/5 border-white/10 text-white"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Usia</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="20"
                                                    type="number"
                                                    min={1}
                                                    max={100}
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
                                        <FormItem>
                                            <FormLabel className="text-slate-300">
                                                Jenis Kelamin
                                            </FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    <SelectItem value="Male">Pria</SelectItem>
                                                    <SelectItem value="Female">Wanita</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-300">
                                                    Nomor Telepon (WhatsApp)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="081234567890"
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="fullAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">
                                            Alamat Lengkap (Domisili)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Jl. Ganesha 10 Coblong, Kota Bandung, Jawa Barat, 40132"
                                                {...field}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="emergencyContact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">
                                            Kontak Darurat
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="`081234567890 (Ayah)"
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
                                name="emergencyContactName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">
                                            Nama Kontak Darurat
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Isshin Kurosaki"
                                                {...field}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage className="md:hidden" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300 max-md:hidden -mt-3">
                            {form.formState.errors.emergencyContact ? (
                                <p className="text-destructive text-sm -mt-4">
                                    {form.formState.errors.emergencyContact.message}
                                </p>
                            ) : (
                                <p></p>
                            )}
                            {form.formState.errors.emergencyContactName ? (
                                <p className="text-destructive text-sm -mt-4">
                                    {form.formState.errors.emergencyContactName.message}
                                </p>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        <div className="space-y-6 -mt-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 border-b border-teal-500/20 pb-2">
                                Informasi Peserta
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Kategori</FormLabel>
                                            <RadioGroup
                                                onValueChange={(val) => {
                                                    if (val === "UMUM") {
                                                        form.setValue("isHMM", false);
                                                        form.setValue("nimHMM", "");
                                                    }
                                                    if (val === "MAHASISWA") {
                                                        form.setValue("isAlumniHMM", false);
                                                    }
                                                    return field.onChange(val);
                                                }}  
                                                className="flex max-sm:flex-col gap-4 space-x-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="UMUM" id="umum" />
                                                    <FormLabel htmlFor="umum" className="text-slate-300">
                                                        Umum
                                                    </FormLabel>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="MAHASISWA" id="mhs" />
                                                    <FormLabel htmlFor="mhs" className="text-slate-300 text-sm">
                                                        Mahasiswa/Pelajar
                                                    </FormLabel>
                                                </div>
                                            </RadioGroup>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="jerseySize"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">
                                                Ukuran Jersey
                                            </FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                        <SelectValue placeholder="Pilih Ukuran" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    {jerseySizes.map((size) => (
                                                        <SelectItem key={size.value} value={size.value}>
                                                            {size.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/10 space-y-4">
                                {form.watch("category") === "UMUM" && (
                                    <FormField
                                        control={form.control}
                                        name="isAlumniHMM"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between">
                                                <FormLabel className="text-slate-300">
                                                    Apakah anda Alumni HMM ITB?
                                                </FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {form.watch("category") === "MAHASISWA" && (
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="isHMM"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between">
                                                    <FormLabel className="text-slate-300">
                                                        Apakah anda Mahasiswa HMM ITB?
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        {form.watch("isHMM") && (
                                            <FormField
                                                control={form.control}
                                                name="nimHMM"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-300 text-xs">
                                                            NIM
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className="bg-white/5 border-white/10 text-white"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                              <div className="relative w-full h-full flex flex-col gap-2 justify-center">
                                <div className="flex items-center gap-2">
                                 <Link href={"/events/size-chart-m-run.png"} target="_blank" className="text-blue-400 underline font-bold italic">
                                View Size Chart
                                </Link>
                                <ArrowUpRightFromSquare className="size-4"/>
                               </div>
                                <Image src={`/events/size-chart-m-run.png`} alt={"size-chart"} className="object-cover" height={400} width={600}/>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 border-b border-teal-500/20 pb-2 flex flex-col gap-2">
                                <span className="text-sm font-bold uppercase">
                                    Informasi Medis
                                </span>
                                <span className="text-xs">
                                    Jika rhesus tidak diketahui, silahkan pilih "Tidak Tahu"
                                </span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="bloodType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">
                                                Golongan Darah
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-orange-500">
                                                        <SelectValue placeholder="Tipe" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    {["A", "B", "AB", "O"].map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="rhesus"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Rhesus</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-orange-500">
                                                        <SelectValue placeholder="+ / -" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    <SelectItem value="POSITIVE">Positive (+)</SelectItem>
                                                    <SelectItem value="NEGATIVE">Negative (-)</SelectItem>
                                                    <SelectItem value="NOT_KNOWN">Tidak Tahu</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <FormField
                                    control={form.control}
                                    name="riwayatPenyakit"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-slate-200">
                                                    Riwayat Penyakit
                                                </FormLabel>
                                                <FormDescription className="text-xs text-slate-400">
                                                    Apakah anda memiliki riwayat penyakit?
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={() => {
                                                        field.onChange(!field.value);
                                                        form.setValue("detailPenyakit", "");
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {form.watch("riwayatPenyakit") && (
                                    <FormField
                                        control={form.control}
                                        name="detailPenyakit"
                                        render={({ field }) => (
                                            <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Riwayat Penyakitnya apa dan kapan terakhir kambuh?"
                                                        {...field}
                                                        className="bg-white/5 border-white/10 text-white min-h-25 focus:border-teal-500"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>

                            <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <FormField
                                    control={form.control}
                                    name="alergi"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-slate-200">Alergi</FormLabel>
                                                <FormDescription className="text-xs text-slate-400">
                                                    Apakah anda ada alergi?
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={() => {
                                                        field.onChange(!field.value);
                                                        form.setValue("detailAlergi", "");
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {form.watch("alergi") && (
                                    <FormField
                                        control={form.control}
                                        name="detailAlergi"
                                        render={({ field }) => (
                                            <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Alerginya apa?"
                                                        {...field}
                                                        className="bg-white/5 border-white/10 text-white min-h-25 focus:border-teal-500"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 border-b border-teal-500/20 pb-2">
                                Verifikasi
                            </h3>
                            <FormField
                                control={form.control}
                                name="ktpUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel className="text-slate-300">
                      Link Foto KTP
                    </FormLabel> */}
                                        <UploadEventDialog
                                            id={1}
                                            title={`${form.watch("category") === "UMUM" ? "KTP" : "KTM/Kartu Pelajar"}`}
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            uploadThingRoute="uploadKTPorStudentCard"
                                            setValue={form.setValue}
                                        />
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                readOnly
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="followIgUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">
                                            IG: @mfestitb
                                        </FormLabel>
                                        <UploadEventDialog
                                            id={2}
                                            title="Bukti Follow IG"
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            uploadThingRoute="uploadProofFollowIg"
                                            setValue={form.setValue}
                                        />
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                readOnly
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <h4 className="text-xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 border-b border-teal-500/20 pb-2">
                                Batch {batchInfo?.batch} {form.watch("category") && ` | Harga : Rp. ${form.watch("category") === "UMUM" ? (batchInfo?.pricePublic  as number + is3XL) : (batchInfo?.priceStudent as number + is3XL)}`}
                            </h4>
                    <h3 className="text-base font-bold text-start mb-3">
                    Pembayaran melalui transfer ke:
                    <p className="flex flex-col items-start justify-center">
                        <span>Bank Terdaftar: SEABANK </span>
                        <span>Nomor Rekening: 901914836624 </span>
                        <span>Nama Pemilik Rekening: Reva Elita Nurhaliza</span>
                    </p>
                    </h3>
                            <FormField
                                control={form.control}
                                name="buktiBayarUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel className="text-slate-300">
                      Link Bukti Pembayaran
                    </FormLabel> */}
                                        <UploadEventDialog
                                            id={3}
                                            title="Bukti Pembayaran"
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            uploadThingRoute="uploadPaymentProofUrl"
                                            setValue={form.setValue}
                                        />
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                readOnly
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              <h3 className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 border-b border-teal-500/20 pb-2">
                                Terms & Condition
                            </h3>
                               <div className="flex items-center gap-2">
                                 <Link href={"/events/TERMS _ CONDITIONS M-RUN 2026.pdf"} target="_blank" className="text-blue-400 underline font-bold italic">
                                Terms & Condition
                                </Link>
                                <ArrowUpRightFromSquare className="size-4"/>
                               </div>
                            <FormField
                                control={form.control}
                                name="siapLomba"
                                render={({ field }) => (
                                    <>
                                        <FormItem className="flex items-start space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="mt-1"
                                                />
                                            </FormControl>
                                            <FormLabel className="text-xs text-slate-400 leading-relaxed">
                                                Dengan ini saya menyatakan bahwa saya dalam kondisi
                                                sehat, mengikuti lomba secara sukarela, memahami seluruh
                                                risiko yang mungkin terjadi, serta bersedia mematuhi
                                                peraturan dan menerima segala konsekuensi medis serta
                                                hukum yang berlaku dan timbul selama mengikuti lomba.
                                            </FormLabel>
                                        </FormItem>
                                        <FormMessage />
                                    </>
                                )}
                            />
                        </div>
                        {form.formState.errors && (
                            <div className="text-red-500 text-sm">
                                <p>{form.formState.errors.root?.message}</p>
                            </div>
                        )}
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
