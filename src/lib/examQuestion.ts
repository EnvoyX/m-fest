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
        // --- SOAL NOMOR 3 (GEOMETRI PERSEGI) ---
        {
          questionText: "ABCD adalah suatu persegi. Tentukan besar sudut $\\alpha$! (A)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$35^\\circ$", isCorrect: false },
            { answerText: "$65^\\circ$", isCorrect: false },
            { answerText: "$85^\\circ$", isCorrect: true }, // [cite: 251]
          ],
        },
        {
          questionText: "ABCD adalah suatu persegi. Tentukan besar sudut $\\alpha$! (B)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$30^\\circ$", isCorrect: false },
            { answerText: "$60^\\circ$", isCorrect: true }, // [cite: 119]
            { answerText: "$70^\\circ$", isCorrect: false },
          ],
        },
        {
          questionText: "ABCD adalah suatu persegi. Tentukan besar sudut $\\alpha$! (C)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$45^\\circ$", isCorrect: false },
            { answerText: "$55^\\circ$", isCorrect: true }, // [cite: 386]
            { answerText: "$85^\\circ$", isCorrect: false },
          ],
        },
        // --- SOAL NOMOR 7 (POLISI & MALING) ---
        {
          questionText: "Seorang polisi mengejar maling ke arah timur. Posisi awal polisi P di utara M sejauh 8 km. Kecepatan polisi $2\\times$ maling. Jarak tempuh maling sebelum ditangkap? (A)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$4\\sqrt{3}$ km", isCorrect: false },
            { answerText: "$\\frac{8}{3}\\sqrt{3}$ km", isCorrect: true }, // [cite: 255]
            { answerText: "$8\\sqrt{3}$ km", isCorrect: false },
          ],
        },
        {
          questionText: "Seorang polisi mengejar maling ke arah timur. Posisi awal polisi P di utara M sejauh 6 km. Kecepatan polisi $3\\times$ maling. Jarak tempuh maling sebelum ditangkap? (B)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$\\frac{3}{2}\\sqrt{2}$ km", isCorrect: true }, // [cite: 123]
            { answerText: "$2\\sqrt{2}$ km", isCorrect: false },
            { answerText: "$4\\sqrt{2}$ km", isCorrect: false },
          ],
        },
        {
          questionText: "Seorang polisi mengejar maling ke arah timur. Posisi awal polisi P di utara M sejauh 8 km. Kecepatan polisi $3\\times$ maling. Jarak tempuh maling sebelum ditangkap? (C)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$2\\sqrt{2}$ km", isCorrect: false },
            { answerText: "$4\\sqrt{2}$ km", isCorrect: true }, // [cite: 390]
            { answerText: "$8\\sqrt{2}$ km", isCorrect: false },
          ],
        },
        // --- SOAL NOMOR 8 (TRIGONOMETRI) ---
        {
          questionText: "Jika $\\cos x = \\frac{4}{5}$, tentukan nilai $\\frac{1-\\csc^2 x}{\\csc^2 x}$! (A)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$-\\frac{9}{25}$", isCorrect: false },
            { answerText: "$-\\frac{16}{25}$", isCorrect: true }, // [cite: 256]
            { answerText: "$\\frac{9}{16}$", isCorrect: false },
          ],
        },
        {
          questionText: "Jika $\\cos x = \\frac{3}{5}$, tentukan nilai $\\frac{1-\\csc^2 x}{\\csc^2 x}$! (B)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$-\\frac{9}{25}$", isCorrect: true }, // [cite: 124]
            { answerText: "$\\frac{9}{25}$", isCorrect: false },
            { answerText: "$-\\frac{16}{25}$", isCorrect: false },
          ],
        },
        {
          questionText: "Jika $\\cos x = \\frac{3}{4}$, tentukan nilai $\\frac{\\csc^2 x - 1}{\\csc^2 x}$! (C)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$-\\frac{16}{9}$", isCorrect: false },
            { answerText: "$\\frac{9}{16}$", isCorrect: true }, // [cite: 391]
            { answerText: "$\\frac{9}{25}$", isCorrect: false },
          ],
        },
        // --- SOAL NOMOR 11 (STATISTIKA RATA-RATA) ---
        {
          questionText: "Rata-rata data $m$. Jika setiap data dikalikan $q$ lalu ditambah $p$, rata-ratanya jadi? (A)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$pq+m$", isCorrect: false },
            { answerText: "$qm+p$", isCorrect: true }, // [cite: 259]
            { answerText: "$pm+q$", isCorrect: false },
          ],
        },
        {
          questionText: "Rata-rata data $m$. Jika setiap data ditambah $q$ lalu dikali $p$, rata-ratanya jadi? (B)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$p(m+q)$", isCorrect: true }, // [cite: 127]
            { answerText: "$q(m+p)$", isCorrect: false },
            { answerText: "$pm+q$", isCorrect: false },
          ],
        },
        {
          questionText: "Rata-rata data $m$. Jika setiap data ditambah $p$ lalu dikali $q$, rata-ratanya jadi? (C)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$p(m+q)$", isCorrect: false },
            { answerText: "$q(m+p)$", isCorrect: true }, // [cite: 394]
            { answerText: "$qm+p$", isCorrect: false },
          ],
        },
        // --- SOAL NOMOR 13 (VEKTOR) ---
        {
          questionText: "Misalkan $\\vec{v}=2\\vec{i}+\\vec{j}+\\vec{k}, \\vec{u}=3\\vec{j}-3\\vec{i}+n\\vec{k}$. Jika $|\\vec{u}+\\vec{v}|=\\sqrt{42}$, nilai $n$? (A)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$n=4$ atau $n=-6$", isCorrect: true }, // [cite: 261]
            { answerText: "$n=5$ atau $n=-5$", isCorrect: false },
            { answerText: "$n=6$ atau $n=-4$", isCorrect: false },
          ],
        },
        {
          questionText: "Misalkan $\\vec{v}=2\\vec{i}+\\vec{j}+\\vec{k}, \\vec{u}=-3\\vec{j}+\\vec{i}+n\\vec{k}$. Jika $|\\vec{u}+\\vec{v}|=\\sqrt{35}$, nilai $n$? (B)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$n=5$ atau $n=-5$", isCorrect: true }, // [cite: 129]
            { answerText: "$n=4$ atau $n=-6$", isCorrect: false },
            { answerText: "$n=5$ atau $n=-6$", isCorrect: false },
          ],
        },
        {
          questionText: "Misalkan $\\vec{v}=\\vec{i}+2\\vec{j}-\\vec{k}, \\vec{u}=-\\vec{j}+3\\vec{i}+n\\vec{k}$. Jika $|\\vec{u}+\\vec{v}|=\\sqrt{42}$, nilai $n$? (C)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$n=-4$ atau $n=2$", isCorrect: true }, // [cite: 396]
            { answerText: "$n=4$ atau $n=-5$", isCorrect: false },
            { answerText: "$n=6$ atau $n=-4$", isCorrect: false },
          ],
        },
        // --- SOAL NOMOR 14 (DERET TAK HINGGA) ---
        {
          questionText: "$\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\dots = M$. Nilai $M$ adalah? (A)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$0$", isCorrect: false },
            { answerText: "$1$", isCorrect: true }, // [cite: 262]
            { answerText: "$\\infty$", isCorrect: false },
          ],
        },
        {
          questionText: "$\\frac{1}{4} + \\frac{1}{12} + \\frac{1}{24} + \\frac{1}{40} + \\dots = M$. Nilai $M$ adalah? (B)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$0$", isCorrect: false },
            { answerText: "$\\frac{1}{2}$", isCorrect: true }, // [cite: 130]
            { answerText: "$\\infty$", isCorrect: false },
          ],
        },
        {
          questionText: "$1 + \\frac{1}{3} + \\frac{1}{6} + \\frac{1}{10} + \\dots = M$. Nilai $M$ adalah? (C)",
          questionPhoto: "masukin link photo kesini",
          answerOptions: [
            { answerText: "$0$", isCorrect: false },
            { answerText: "$2$", isCorrect: true }, // [cite: 397]
            { answerText: "$\\infty$", isCorrect: false },
          ],
        },
      ],
  },
  3: {
    subject: "ESSAY",
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