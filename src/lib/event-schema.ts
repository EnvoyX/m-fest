import * as z from 'zod';

export const mCareSchema = z.object({
  participantName: z.string().min(1, 'Nama Lengkap wajib diisi.'),
  gender: z.enum(['Male', 'Female'], {
    message: 'Jenis Kelamin wajib diisi.',
  }),
  phoneNumber: z.string().regex(/^(\+?\d{9,15})$/, 'Nomor Telepon wajib diisi.'),
  fullAddress: z.string().min(1, 'Alamat Lengkap asal (Domisili) wajib diisi.'),
  emergencyContact: z.string().min(1, 'Kontak Darurat wajib diisi.'),
  emergencyContactName: z.string().min(1, 'Nama Kontak Darurat wajib diisi.'),
  clinicActivity: z.enum(['DONATE_BLOOD', 'EYE_CHECK', 'BOTH'], {
    error: 'Aktivitas Klinik wajib diisi.',
  }),
  memenuhiSyarat: z.boolean().refine((val) => val === true, {
    message: 'Anda harus menyetujui syarat donor darah.',
  }),
});

export type mCareSchema = z.infer<typeof mCareSchema>;

export const mTalksSchema = z
  .object({
    participantName: z.string().min(1, 'Nama Lengkap wajib diisi.'),
    isITB: z.boolean(),
    nimITB: z.string().optional(),
    majorITB: z.string().optional(),
    institution: z.string().optional(),
    talksSessions: z.array(z.enum(['TALKS_1', 'TALKS_2', 'TALKS_3', 'TALKS_4'])),
    sourceInfo: z.enum(['INSTAGRAM_MFEST_ITB', 'FRIEND', 'BANNER', 'OTHER']),
    followIgUrl: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.isITB) {
      if (!values.nimITB || values.nimITB.length !== 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'NIM ITB harus terdiri dari 8 digit',
          path: ['nimITB'],
        });
      }
      if (!values.majorITB) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Jurusan ITB wajib diisi',
          path: ['majorITB'],
        });
      }
    } else {
      if (!values.institution || values.institution.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Asal Kampus wajib diisi (tulis '-' jika tidak ada)",
          path: ['institution'],
        });
      }
    }
  });

export type mTalksSchema = z.infer<typeof mTalksSchema>;

export const mExpoSchema = z
  .object({
    participantName: z.string().min(1, 'Nama Lengkap wajib diisi.'),
    isITB: z.boolean(),
    nimITB: z.string().optional(),
    majorITB: z.string().optional(),
    institution: z.string().optional(),
    expoSessions: z.array(z.enum(['EXPO_DAY_1', 'EXPO_DAY_2'])),
    sourceInfo: z.enum(['INSTAGRAM_MFEST_ITB', 'FRIEND', 'BANNER', 'OTHER']),
    followIgUrl: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.isITB) {
      if (!values.nimITB || values.nimITB.length !== 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'NIM ITB harus terdiri dari 8 digit',
          path: ['nimITB'],
        });
      }
      if (!values.majorITB) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Jurusan ITB wajib diisi',
          path: ['majorITB'],
        });
      }
    } else {
      if (!values.institution || values.institution.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Asal Kampus wajib diisi (tulis '-' jika tidak ada)",
          path: ['institution'],
        });
      }
    }
  });

export type mExpoSchema = z.infer<typeof mExpoSchema>;

export const etuSchema = z
  .object({
    participantName: z.string().min(1, 'Nama Lengkap wajib diisi.'),
    phoneNumber: z.string().regex(/^(\+?\d{9,15})$/, 'Nomor Telepon wajib diisi.'),
    isITB: z.boolean({
      message: 'Status Civitas Akademika ITB wajib diisi.',
    }),
    nimOrNip: z.string().optional(),
    merekKendaraan: z.string().min(1, 'Merek Kendaraan wajib diisi.'),
    tahunBuat: z
      .string()
      .refine(
        (value) => value.length === 4 && Number.isInteger(Number(value)),
        'Tahun Pembuatan harus 4 digit angka.',
      ),
    platNomor: z.string().min(1, 'Nomor Polisi wajib diisi.'),
    motorType: z.enum(['MATIC', 'MANUAL']),
    lastServiceDate: z.enum(
      ['< 3 bulan', '3-6 bulan', '6 bulan - 1 tahun', '> 1 tahun', 'Tidak Ingat'],
      {
        message: 'Kapan terakhir kali servis wajib diisi.',
      },
    ),

    isSopCompliant: z.boolean().refine((val) => val === true, {
      message: 'Anda harus menyetujui persetujuan dengan SOP.',
    }),
  })
  .superRefine((values, ctx) => {
    if (values.isITB && !values.nimOrNip) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'NIM/NIP wajib diisi.',
        path: ['nimOrNip'],
      });
    }
  });

export type etuSchema = z.infer<typeof etuSchema>;

export const mRunSchema = z
  .object({
    participantName: z
      .string({
        error: 'Nama Lengkap wajib diisi.',
      })
      .min(1, 'Nama Lengkap wajib diisi.'),
    gender: z.enum(['Male', 'Female'], {
      message: 'Jenis Kelamin wajib diisi.',
    }),
    age: z
      .string()
      .refine((value) => Number.isInteger(Number(value)), 'Usia harus angka.')
      .min(1, 'Usia wajib diisi.'),
    phoneNumber: z
      .string({
        error: 'Nomor Telepon wajib diisi.',
      })
      .regex(/^(\+?\d{9,15})$/, 'Nomor Telepon wajib diisi.'),
    activeEmail: z.email('Email tidak valid.').min(1, 'Email wajib diisi.'),
    fullAddress: z
      .string({
        error: 'Alamat Lengkap wajib diisi.',
      })
      .min(1, 'Alamat Lengkap (Domisili) wajib diisi.'),
    emergencyContact: z
      .string({
        error: 'Kontak Darurat wajib diisi.',
      })
      .min(1, 'Kontak Darurat wajib diisi.'),
    emergencyContactName: z
      .string({
        error: 'Nama Kontak Darurat wajib diisi.',
      })
      .min(1, 'Nama Kontak Darurat wajib diisi.'),
    category: z.enum(['UMUM', 'MAHASISWA'], {
      error: 'Kategori wajib diisi.',
    }),
    jerseySize: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
      error: 'Ukuran Jersey wajib diisi.',
    }),
    isAlumniHMM: z
      .boolean({
        error: 'Alumni ITB wajib diisi jika kategori UMUM.',
      })
      .optional(),
    isHMM: z
      .boolean({
        error: 'HMM wajib diisi jika kategori MAHASISWA.',
      })
      .optional(),
    nimHMM: z.string().optional(),
    bloodType: z.enum(['A', 'B', 'AB', 'O'], {
      error: 'Golongan Darah wajib diisi.',
    }),
    rhesus: z.enum(['POSITIVE', 'NEGATIVE', 'NOT_KNOWN'], {
      error: 'Informasi Rhesus wajib diisi.',
    }),
    riwayatPenyakit: z.boolean().optional(),
    detailPenyakit: z.string().optional(),
    alergi: z.boolean().optional(),
    detailAlergi: z.string().optional(),
    ktpUrl: z.string().min(1, 'Foto KTP wajib diisi.').url('Tautan Foto KTP tidak valid.'),
    followIgUrl: z
      .string()
      .min(1, 'Tauatan Bukti Follow IG wajib diisi.')
      .url('Tautan Foto KTP tidak valid.'),
    buktiBayarUrl: z
      .string()
      .min(1, 'Tautan Bukti Pembayaran wajib diisi.')
      .url('Tautan Bukti Pembayaran tidak valid.'),
    siapLomba: z
      .boolean({
        error: 'Pernyataan Persetujuan Lomba wajib diisi.',
      })
      .refine((val) => val === true, {
        message: 'Anda harus menyetujui persetujuan siap lomba.',
      }),
  })
  .superRefine((values, ctx) => {
    if (values.riwayatPenyakit && !values.detailPenyakit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Detail Penyakit wajib diisi.',
        path: ['detailPenyakit'],
      });
    }
    if (values.alergi && !values.detailAlergi) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Detail Alergi wajib diisi.',
        path: ['detailAlergi'],
      });
    }
    if (values.category === 'MAHASISWA' && values.isHMM && !values.nimHMM) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'NIM HMM wajib diisi.',
        path: ['nimHMM'],
      });
    }

    if (values.category === 'MAHASISWA' && values.isHMM && values.nimHMM?.length !== 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'NIM harus 8 digit.',
        path: ['nimHMM'],
      });
    }
  });

export type mRunSchema = z.infer<typeof mRunSchema>;

export const eventsInputProcedureSchema = z.discriminatedUnion('registrationType', [
  mCareSchema.extend({ registrationType: z.literal('M-CARE') }),
  mTalksSchema.extend({ registrationType: z.literal('M-TALKS'), eventId: z.string().optional() }),
  etuSchema.extend({ registrationType: z.literal('ETU') }),
  mRunSchema.extend({ registrationType: z.literal('M-RUN'), batch: z.string(), price: z.number() }),
  mExpoSchema.extend({ registrationType: z.literal('M-EXPO'), eventId: z.string().optional() }),
]);

export type eventsInputProcedureSchema = z.infer<typeof eventsInputProcedureSchema>;
