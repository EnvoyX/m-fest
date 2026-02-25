export const sessionsDataA = {
  1: {
    subject: "PHYSICS",
    questions: [
      {
        questionText:
          "Ini paket A",
        answerOptions: [
          { answerText: "Hukum Newton I", isCorrect: false },
          { answerText: "Hukum Newton II", isCorrect: false },
          { answerText: "Hukum Newton III", isCorrect: true },
        ],
      },
      {
        questionText: "Rumus energi kinetik adalah...",
        answerOptions: [
          { answerText: "Ek = m.g.h", isCorrect: false },
          { answerText: "Ek = 1/2 m.v²", isCorrect: true },
          { answerText: "Ek = F.s", isCorrect: false },
        ],
      },
    ],
  },
  2: {
    subject: "MATHEMATICS",
    questions: [
      {
        questionText:
          "masih paket a",
        answerOptions: [
          { answerText: "2", isCorrect: true },
          { answerText: "2x", isCorrect: false },
          { answerText: "3", isCorrect: false },
        ],
      },
      {
        questionText: "Nilai dari sin(90°) adalah...",
        answerOptions: [
          { answerText: "0", isCorrect: false },
          { answerText: "1", isCorrect: true },
          { answerText: "0.5", isCorrect: false },
        ],
      },
    ],
  },
  3: {
    subject: "ESSAY",
    // Catatan: Karena backend tRPC saat ini menerima array angka (index),
    // saya menggunakan format Pilihan Ganda untuk 'Logika Esai' agar kompatibel.
    // Jika backend mendukung string, UI ini bisa diubah menjadi Textarea.
    questions: [
      {
        questionText:
          "paket a juga",
        answerOptions: [
          {
            answerText: "Karena lebih murah tanpa memikirkan dampak lingkungan",
            isCorrect: false,
          },
          {
            answerText:
              "Mengurangi emisi karbon dan menjaga keberlanjutan sumber daya",
            isCorrect: true,
          },
          { answerText: "Agar terlihat modern saja", isCorrect: false },
        ],
      },
    ],
  },
};

export const sessionsDataB = {
  1: {
    subject: "PHYSICS",
    questions: [
      {
        questionText:
          "Ini paket B ",
        answerOptions: [
          { answerText: "Hukum Newton I", isCorrect: false },
          { answerText: "Hukum Newton II", isCorrect: false },
          { answerText: "Hukum Newton III", isCorrect: true },
        ],
      },
      {
        questionText: "Rumus energi kinetik adalah...",
        answerOptions: [
          { answerText: "Ek = m.g.h", isCorrect: false },
          { answerText: "Ek = 1/2 m.v²", isCorrect: true },
          { answerText: "Ek = F.s", isCorrect: false },
        ],
      },
    ],
  },
  2: {
    subject: "MATHEMATICS",
    questions: [
      {
        questionText:
          "masih paket b",
        answerOptions: [
          { answerText: "2", isCorrect: true },
          { answerText: "2x", isCorrect: false },
          { answerText: "3", isCorrect: false },
        ],
      },
      {
        questionText: "Nilai dari sin(90°) adalah...",
        answerOptions: [
          { answerText: "0", isCorrect: false },
          { answerText: "1", isCorrect: true },
          { answerText: "0.5", isCorrect: false },
        ],
      },
    ],
  },
  3: {
    subject: "ESSAY",
    // Catatan: Karena backend tRPC saat ini menerima array angka (index),
    // saya menggunakan format Pilihan Ganda untuk 'Logika Esai' agar kompatibel.
    // Jika backend mendukung string, UI ini bisa diubah menjadi Textarea.
    questions: [
      {
        questionText:
          "paket b juga",
        answerOptions: [
          {
            answerText: "Karena lebih murah tanpa memikirkan dampak lingkungan",
            isCorrect: false,
          },
          {
            answerText:
              "Mengurangi emisi karbon dan menjaga keberlanjutan sumber daya",
            isCorrect: true,
          },
          { answerText: "Agar terlihat modern saja", isCorrect: false },
        ],
      },
    ],
  },
};

export const sessionsDataC = {
  1: {
    subject: "PHYSICS",
    questions: [
      {
        questionText:
          "Ini paket C",
        answerOptions: [
          { answerText: "Hukum Newton I", isCorrect: false },
          { answerText: "Hukum Newton II", isCorrect: false },
          { answerText: "Hukum Newton III", isCorrect: true },
        ],
      },
      {
        questionText: "Rumus energi kinetik adalah...",
        answerOptions: [
          { answerText: "Ek = m.g.h", isCorrect: false },
          { answerText: "Ek = 1/2 m.v²", isCorrect: true },
          { answerText: "Ek = F.s", isCorrect: false },
        ],
      },
    ],
  },
  2: {
    subject: "MATHEMATICS",
    questions: [
      {
        questionText:
          "paket c juga",
        answerOptions: [
          { answerText: "2", isCorrect: true },
          { answerText: "2x", isCorrect: false },
          { answerText: "3", isCorrect: false },
        ],
      },
      {
        questionText: "Nilai dari sin(90°) adalah...",
        answerOptions: [
          { answerText: "0", isCorrect: false },
          { answerText: "1", isCorrect: true },
          { answerText: "0.5", isCorrect: false },
        ],
      },
    ],
  },
  3: {
    subject: "ESSAY",
    // Catatan: Karena backend tRPC saat ini menerima array angka (index),
    // saya menggunakan format Pilihan Ganda untuk 'Logika Esai' agar kompatibel.
    // Jika backend mendukung string, UI ini bisa diubah menjadi Textarea.
    questions: [
      {
        questionText:
          "ini paket c kok :)",
        answerOptions: [
          {
            answerText: "Karena lebih murah tanpa memikirkan dampak lingkungan",
            isCorrect: false,
          },
          {
            answerText:
              "Mengurangi emisi karbon dan menjaga keberlanjutan sumber daya",
            isCorrect: true,
          },
          { answerText: "Agar terlihat modern saja", isCorrect: false },
        ],
      },
    ],
  },
};

export const sessionsDataTechMeet = {
  1: {
    subject: "PHYSICS",
    questions: [
      {
        questionText:
          "ini paket techmeet",
        answerOptions: [
          { answerText: "Hukum Newton I", isCorrect: false },
          { answerText: "Hukum Newton II", isCorrect: false },
          { answerText: "Hukum Newton III", isCorrect: true },
        ],
      },
      {
        questionText: "Rumus energi kinetik adalah...",
        answerOptions: [
          { answerText: "Ek = m.g.h", isCorrect: false },
          { answerText: "Ek = 1/2 m.v²", isCorrect: true },
          { answerText: "Ek = F.s", isCorrect: false },
        ],
      },
    ],
  },
  2: {
    subject: "MATHEMATICS",
    questions: [
      {
        questionText:
          "ini paket techmeet",
        answerOptions: [
          { answerText: "2", isCorrect: true },
          { answerText: "2x", isCorrect: false },
          { answerText: "3", isCorrect: false },
        ],
      },
      {
        questionText: "Nilai dari sin(90°) adalah...",
        answerOptions: [
          { answerText: "0", isCorrect: false },
          { answerText: "1", isCorrect: true },
          { answerText: "0.5", isCorrect: false },
        ],
      },
    ],
  },
  3: {
    subject: "ESSAY",
    // Catatan: Karena backend tRPC saat ini menerima array angka (index),
    // saya menggunakan format Pilihan Ganda untuk 'Logika Esai' agar kompatibel.
    // Jika backend mendukung string, UI ini bisa diubah menjadi Textarea.
    questions: [
      {
        questionText:
          "masih paket techmeet letsgoo",
        answerOptions: [
          {
            answerText: "Karena lebih murah tanpa memikirkan dampak lingkungan",
            isCorrect: false,
          },
          {
            answerText:
              "Mengurangi emisi karbon dan menjaga keberlanjutan sumber daya",
            isCorrect: true,
          },
          { answerText: "Agar terlihat modern saja", isCorrect: false },
        ],
      },
    ],
  },
};
