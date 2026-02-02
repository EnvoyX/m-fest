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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { mCareSchema } from "@/lib/event-schema";
import { useEffect, useRef } from "react";

const CLINIC_OPTIONS = [
  { id: "DONATE_BLOOD", label: "Donor Darah" },
  { id: "EYE_CHECK", label: "Cek Kesehatan Mata" },
] as const;

export default function MCareForm() {
  const form = useForm<mCareSchema>({
    resolver: zodResolver(mCareSchema),
    defaultValues: {
      participantName: "",
      phoneNumber: "",
      fullAddress: "",
      emergencyContact: "",
      emergencyContactName: "",
      clinicActivity: [],
      memenuhiSyarat: false,
    },
  });

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
  });

  function onSubmit(data: mCareSchema) {
    console.log("M-Care Form Data:", data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-2xl p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
            M-CARE Registration
          </h2>
          <p className="text-slate-400 mt-2">
            Health services & Blood donation registration
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
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Female" />
                          </FormControl>
                          <FormLabel className="font-normal text-slate-300">
                            Female
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
                      className="bg-white/5 border-white/10 text-white min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 rounded-xl border border-dashed border-white/20 bg-white/5 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400">
                Emergency Contact
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
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-slate-200">
                      Aktivitas Klinik
                    </FormLabel>
                    <FormDescription className="text-slate-400">
                      Kegiatan yang Akan Diikuti.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CLINIC_OPTIONS.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="clinicActivity"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal text-slate-300 cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
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
                      Apakah Syarat dan Ketentuan Sudah Terpenuhi?.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-linear-to-r from-teal-500 to-blue-600 hover:opacity-90 text-white font-bold transition-all shadow-lg shadow-teal-500/20"
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
