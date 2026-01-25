import * as z from "zod";

export const mTalksSchema = z
  .object({
    userId: z.string(),
    participantName: z.string().min(1, "Nama Peserta wajib diisi."),
    activeEmail: z.email("Invalid email").min(1, "Email Aktif wajib diisi."),
    activeSocial: z.string().min(1, "Akun Medsos wajib diisi."),
    isITB: z.boolean({
      message: "Asal Institusi wajib diisi.",
    }),
    nimITB: z.string().optional(),
    majorITB: z.string().optional(),
    reasonToParticipate: z
      .string()
      .min(1, "Alasan mengikuti seminar wajib diisi."),
    interestedTopic: z.string().min(1, "Topik Yang diminati wajib diisi"),
    sourceInfo: z.enum(["INSTAGRAM_MFEST_ITB", "FRIEND", "BANNER", "OTHER"]),
  })
  .superRefine((values, ctx) => {
    if (values.isITB) {
      if (!values.nimITB || values.nimITB.length !== 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NIM ITB harus terdiri dari 8 digit.",
          path: ["nimITB"],
        });
      }
      if (!values.majorITB) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Jurusan ITB wajib diisi",
          path: ["majorITB"],
        });
      }
    }
  });

export type mTalksSchema = z.infer<typeof mTalksSchema>;

export const mCareSchema = z.object({
  participantName: z.string().min(1, "Nama Lengkap wajib diisi."),
  gender: z.enum(["Male", "Female"], {
    message: "Jenis Kelamin wajib diisi.",
  }),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{9,15})$/, "Nomor Telepon wajib diisi."),
  fullAddress: z.string().min(1, "Alamat Lengkap asal (Domisili) wajib diisi."),
  emergencyContact: z.string().min(1, "Kontak Darurat wajib diisi."),
  emergencyContactName: z.string().min(1, "Nama Kontak Darurat wajib diisi."),
  clinicActivity: z
    .array(z.enum(["DONOR", "EYE_CHECK", "BOTH"]))
    .min(1, "Pilih minimal 1 aktivitas.")
    .max(3, "Maksimal pilih 3 aktivitas."),
  memenuhiSyarat: z.boolean({
    message: "Pernyataan Memenuhi Syarat Donor Darah wajib diisi.",
  }),
});

export type mCareSchema = z.infer<typeof mCareSchema>;

export const mExpoSchema = z
  .object({
    participantName: z.string().min(1, "Nama Lengkap wajib diisi."),
    isITB: z.boolean({
      message: "Status wajib diisi.",
    }),
    nimITB: z.string().optional(),
    majorITB: z.string().optional(),
    sourceInfo: z.enum(["INSTAGRAM_MFEST_ITB", "FRIEND", "BANNER", "OTHER"]),
  })
  .superRefine((values, ctx) => {
    if (values.isITB) {
      if (!values.nimITB || values.nimITB.length !== 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NIM ITB harus terdiri dari 8 digit.",
          path: ["nimITB"],
        });
      }
      if (!values.majorITB) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Jurusan ITB wajib diisi",
          path: ["majorITB"],
        });
      }
    }
  });

export type mExpoSchema = z.infer<typeof mExpoSchema>;

export const etuSchema = z.object({
  participantName: z.string().min(1, "Nama Lengkap wajib diisi."),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{9,15})$/, "Nomor Telepon wajib diisi."),
  isITB: z.boolean({
    message: "Status Civitas Akademika ITB wajib diisi.",
  }),
  nimOrNip: z.string().min(1, "NIM/NIP wajib diisi."),
  merekKendaraan: z.string().min(1, "Merek Kendaraan wajib diisi."),
  tahunBuat: z.number().min(1, "Tahun Pembuatan wajib diisi."),
  platNomor: z.string().min(1, "Nomor Polisi (Plat Kendaraan) wajib diisi."),
  lastServiceDate: z.array(
    z.enum([
      "< 3 bulan, 3-6 bulan, > 6 bulan - 1 tahun, > 1 tahun",
      "Tidak Ingat",
    ]),
  ),
  isSopCompliant: z.boolean({
    message: "Pernyataan Persetujuan dengan SOP wajib diisi.",
  }),
});

export type etuSchema = z.infer<typeof etuSchema>;

export const mRunSchema = z.object({
  participantName: z.string().min(1, "Nama Lengkap wajib diisi."),
  email: z.email("Invalid email").min(1, "Email wajib diisi."),
  fullAdress: z.string().min(1, "Alamat Lengkap (Domisili) wajib diisi."),
  gender: z.enum(["Male", "Female"], {
    message: "Jenis Kelamin wajib diisi.",
  }),
  age: z.number().min(1, "Usia wajib diisi."),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{9,15})$/, "Nomor Telepon wajib diisi."),
  ktpUrl: z.string().min(1, "Foto KTP wajib diisi."),
  emergencyContact: z.string().min(1, "Kontak Darurat wajib diisi."),
  emergencyContactName: z.string().min(1, "Nama Kontak Darurat wajib diisi."),
  category: z.enum(["UMUM", "MAHASISWA"], {
    message: "Kategori wajib diisi.",
  }),
  jerseySize: z.enum(["S", "M", "L", "XL", "XXL"], {
    message: "Ukuran Jersey wajib diisi.",
  }),
  isAlumniHMM: z.boolean({
    message: "Alumni ITB wajib diisi jika kategori UMUM.",
  }),
  isHMM: z.boolean({
    message: "HMM wajib diisi jika kategori MAHASISWA.",
  }),
  nimHMM: z.string().optional(),
  riwayatPenyakit: z.boolean({
    message: "Opsi Riwayat Penyakit wajib diisi.",
  }),
  detailPenyakit: z.string().optional(),
  bloodType: z.enum(["A", "B", "AB", "O"], {
    message: "Golongan Darah wajib diisi.",
  }),
  rhesus: z
    .enum(["POSITIVE", "NEGATIVE"], {
      message: "Rhesus wajib diisi.",
    })
    .optional(),
  alergi: z.boolean({
    message: "Opsi Alergi wajib diisi.",
  }),
  detailAlergi: z.string().optional(),
  siapLomba: z.boolean({
    message: "Pernyataan Persetujuan Lomba wajib diisi.",
  }),
});

export type mRunSchema = z.infer<typeof mRunSchema>;
