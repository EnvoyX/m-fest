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
import { useEffect, useRef } from "react";

export default function MTalksForm() {
  const form = useForm<mTalksSchema>({
    resolver: zodResolver(mTalksSchema),
    defaultValues: {
      participantName: "",
      isITB: false,
      nimITB: "",
      majorITB: "",
    },
  });

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
  });

  function onSubmit(data: mTalksSchema) {
    console.log("Form Submitted:", data);
  }

  return (
    <div className="w-full max-w-lg p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500 tracking-tight">
          M-TALKS Registration
        </h2>
        <p className="text-slate-400">
          Join the World of Mechanical Engineering Exhibitions. Please fill in
          your details.
        </p>
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
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("isITB") && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <FormField
                  control={form.control}
                  name="nimITB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">NIM</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="13123069"
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
                  name="majorITB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Jurusan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Teknik Mesin"
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
                {form.formState.errors.nimITB ? (
                  <p className="text-destructive text-sm -mt-4">
                    {form.formState.errors.nimITB.message}
                  </p>
                ) : (
                  <p></p>
                )}
                {form.formState.errors.majorITB ? (
                  <p className="text-destructive text-sm -mt-4">
                    {form.formState.errors.majorITB.message}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </>
          )}

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
                    <SelectItem value="FRIEND">Friend</SelectItem>
                    <SelectItem value="BANNER">Banner</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
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
  );
}
