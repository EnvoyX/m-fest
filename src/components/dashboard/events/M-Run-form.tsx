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
import { useEffect, useRef } from "react";
import { validateToken } from "better-auth";
import { getCurrentDate, getMRUNBatchInfo } from "@/lib/utils";

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

  const onSubmit = (data: mRunSchema) => console.log(data);

  return (
    <div className="min-h-screen bg-transparent backdrop-glass-lg flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-3xl p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 italic">
            M-RUN
          </h2>
          <p className="text-slate-400 mt-2">
            Push your limits. Secure your spot in the race.
          </p>
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
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <FormLabel htmlFor="mhs" className="text-slate-300">
                            Mahasiswa
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
                          {["S", "M", "L", "XL", "XXL"].map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
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

              <div className="grid grid-cols-2 gap-2">
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
                    <FormLabel className="text-slate-300">
                      Link Foto KTP
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Put your KTP link here"
                        {...field}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h4 className="text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 border-b border-teal-500/20 pb-2">
                Batch {batchInfo?.batch} | Harga : Rp. {batchInfo?.price}
              </h4>
              <FormField
                control={form.control}
                name="buktiBayarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Link Bukti Pembayaran
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Put your payment receipt link here"
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
              className="w-full h-12 bg-linear-to-r from-teal-500 to-blue-600 hover:opacity-90 text-white font-bold transition-all shadow-lg shadow-teal-500/20"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
