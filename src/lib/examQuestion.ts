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
            questionText: "Jika diketahui $\\cos x = \\frac{4}{5}$ di mana $x$ berada di kuadran pertama, maka tentukan nilai $\\frac{1 - \\csc^2 x}{\\csc^2 x} = \\dots$",
            answerOptions: [
              { answerText: "$-\\frac{9}{25}$", isCorrect: false },
              { answerText: "$\\frac{9}{25}$", isCorrect: false },
              { answerText: "$-\\frac{16}{25}$", isCorrect: true },
              { answerText: "$-\\frac{16}{9}$", isCorrect: false },
              { answerText: "$\\frac{9}{16}$", isCorrect: false },
            ],
          },
          {
            questionText: "Diberikan 2 buah bilangan bulat positif yakni $m$ dan $72$. Jika diketahui FPB dan KPK-nya berturut-turut $8$ dan $1080$, maka nilai $m$ adalah $\\dots$",
            answerOptions: [
              { answerText: "40", isCorrect: false },
              { answerText: "60", isCorrect: false },
              { answerText: "80", isCorrect: false },
              { answerText: "90", isCorrect: false },
              { answerText: "120", isCorrect: true },
            ],
          },
          {
            questionText: "daru ganteng 123 $m_1 = 1, m_2 = 5,$ dan $m_k = 5m_{k-1} - 6m_{k-2}$, maka nilai $m_{2026}$ adalah $\\dots$",
            answerOptions: [
              { answerText: "$3^{2025} - 2^{2025}$", isCorrect: false },
              { answerText: "$3^{2026} - 2^{2026}$", isCorrect: false },
              { answerText: "$3^{2027} - 2^{2027}$", isCorrect: false },
              { answerText: "$3^{2026} - 2^{2025}$", isCorrect: false },
              { answerText: "$3^{2027} - 2^{2026}$", isCorrect: true },
            ],
          },
      {
        questionText: "Sebuah truk dengan massa $m_T$ mengangkut pipa gorong-gorong (culvert) dengan massa $m_C$ melaju bersama seperti gambar. Karena sopir sudah bekerja lembur, beliau mengantuk dan menabrak mobil dengan massa $m_M$ yang bergerak seperti pada gambar. Setelah bertabrakan, keduanya menyatu dan melaju sebesar $v=1$ m/s ke sumbu-x positif. Akibat tabrakan tersebut, 4,125 kJ energi hilang. Setelah itu, seorang pengamat dari pinggir jalan melihat culvert menggelinding tanpa slip selama 0,2 detik sebelum hancur (massa culvert setelah hancur diabaikan) dengan menyerap 20% momen ekuivalen dari energi yang hilang. Dengan mengabaikan gaya gesek dan menganggap sistem sebagai benda titik, carilah semua massa yang tidak diketahui dan hitung nilai $\\frac{m_T+m_M}{m_C}$! Anggap laju menggelinding culvert sama dengan kecepatan setelah tabrakan dan anggap culvert sebagai silinder tipis berongga.",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/2.png",
        answerOptions: [
          { answerText: "13", isCorrect: false },
          { answerText: "11", isCorrect: false },
          { answerText: "15", isCorrect: false },
          { answerText: "12", isCorrect: true },
          { answerText: "10", isCorrect: false },
        ],
      },
      {
        questionText:"Sebuah kubus homogen bermassa 40 gram yang semula diam dimampatkan terhadap pegas dengan $k=100 N/m$ sejauh 20 cm sebelum meluncur dengan kecepatan konstan diatas permukaan yang licin hingga melewati seluncuran licin dengan arah $\\theta_1=30^\\circ$ terhadap sumbu-y positif (lihat gambar) mulai dari titik A dan mendarat di dasar pada titik B dengan arah $\\theta_2$ terhadap sumbu-y positif. Jika ketinggian titik A setara dengan titik awal pegas yaitu 2,2 m, tentukan perbandingan sisi (a:b:c) pada segitiga siku-siku yang terbentuk oleh sudut $\\theta_2$ (lihat gambar)! Anggap kubus sebagai partikel dan ambil $g=10 m/s2$.",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/3.png",
        answerOptions: [
          { answerText: "5:12:13", isCorrect: false },
          { answerText: "12:5:13", isCorrect: false },
          { answerText: "$\\sqrt{119}$:5:12", isCorrect: true },
          { answerText: "5:$\\sqrt{119}$:12", isCorrect: false },
          { answerText: "5:13:$\\sqrt{194}$", isCorrect: false },
        ]
      },
      {
        questionText: "Tentukan fungsi kecepatan dalam fungsi $R$, $V_0$, $g$, dan $\\theta$",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/4.png",
        answerOptions: [
          { answerText: "$v_t = \\sqrt{v_0^2-2gR\\tan{\\theta})}$", isCorrect: true },
          { answerText: "$v_t = \\sqrt{v_0^2+2gR\\tan{\\theta})}$", isCorrect: false },
          { answerText: "$v_t = v_0^2-2gR\\tan{\\theta}$", isCorrect: false },
          { answerText: "$v_t = v_0^2+gR\\tan{\\theta}$", isCorrect: false },
          { answerText: "$v_t = \\sqrt{2gR\\tan{\\theta}}$", isCorrect: false },
        ]
      },
      {
        questionText: "Small objects are released from rest at A and slide down the smooth circular surface of radius R to conveyor B. Determine the expression for the normal contact force N between the guide and each object in terms of $\\theta$ and specify the correct angular velocity $\\omega$ of the conveyor pulley of radius r to prevent any sliding on the belt as the object transfers to the conveyor.",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/5.png",
        answerOptions: [
          { answerText: "$\\frac{\\sqrt{2gR}}{r}$", isCorrect: true },
          { answerText: "$\\frac{2gR}{r}$", isCorrect: false },
          { answerText: "$\\sqrt{\\frac{gR}{r}}$", isCorrect: false },
          { answerText: "$\\frac{4gR}{r}$", isCorrect: false },
          { answerText: "$v_t = \\sqrt{3gR\\tan{\\theta}}$", isCorrect: false },
        ]
      },
      {
        questionText: "Kaleng C dengan massa 1kg bergerak sepanjang alur horizontal seperti yang ditunjukkan pada gambar.  Alur tersebut berbentuk spiral, dengan posisi r didefinisikan dalam persamaan $r=0,2\\theta$, dengan $\\theta$ dalam radian. Jika lengan OA berputar dengan laju konstan $\\dot{\\theta} = 1 rad/s$, tentukan besar resultan gaya yang diberikan lengan tersebut pada kaleng saat $\\theta = 1 rad$. Abaikan gesekan dan ukuran kaleng.",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/6.png",
        answerOptions: [
          { answerText: "0,1 N", isCorrect: false },
          { answerText: "0,2 N", isCorrect: true },
          { answerText: "0,3 N", isCorrect: false },
          { answerText: "0,4 N", isCorrect: false },
          { answerText: "0,5 N", isCorrect: false },
        ]
      },
            {
        questionText: "Berdasarkan gambar di samping, sebuah kawat aluminium, dengan panjang $L_1= 20\\sqrt{3}$ cm, luas penampang $1.00 \\times 10 cm^2$ dan massa jenis $4,0 g/cm^3$ disambungkan ke sebuah kawat baja, dengan massa jenis $12,0 g/cm^3$ dan luas penampang yang sama. Kawat gabungan, yang dimuati dengan balok bermassa m = 10,0 kg, diatur sedemikian rupa sehingga jarak $L_2$ dari sambungan ke katrol pendukung adalah 50,0 cm. Gelombang transversal dibangkitkan pada kawat oleh sumber eksternal yang frekuensinya dapat berubah-ubah; sebuah simpul (node) terletak pada katrol. Tentukan nilai frekuensi terendah yang menghasilkan gelombang tegak dengan sambungan sebagai salah satu simpul! (gunakan $g = 10 m/s^2$)",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/7.png",
        answerOptions: [
          { answerText: "$\\frac{20\\sqrt{3}}{3}$", isCorrect: false },
          { answerText: "$\\frac{21\\sqrt{3}}{3}$", isCorrect: false },
          { answerText: "$\\frac{25\\sqrt{3}}{2}$", isCorrect: false },
          { answerText: "$\\frac{25\\sqrt{3}}{3}$", isCorrect: true },
          { answerText: "$\\frac{25\\sqrt{5}}{3}$", isCorrect: false },
        ]
      },
      {
        questionText: "Seorang ilmuwan fisika sedang menguji transmisi informasi berupa pulsa energi melintasi nanokawat tembaga ultra-murni dalam kondisi vakum. Nanokawat tersebut bermassa 100 g memiliki tegangan 225 N dengan salah satu ujung kawat di x = 0 dan ujung lainnya di x = 10 m. Pada waktu t = 0, pulsa 1 menjalar pada kawat dari ujung x = 10 m. Pada waktu t = 20 ms, pulsa 2 menjalar pada kawat dari ujung x = 0. Pada posisi x berapakah pulsa-pulsa tersebut akan bertemu?",
        answerOptions: [
          { answerText: "$x = 2$ m", isCorrect: false },
          { answerText: "$x = 2,5$ m", isCorrect: false },
          { answerText: "$x = 3$ m", isCorrect: false },
          { answerText: "$x = 3,5$ m", isCorrect: true },
          { answerText: "$x = 4$ m", isCorrect: false },
        ]
      },
      {
        questionText: "Sebuah pendulum dengan panjang tali L dan massa beban m ditarik hingga sudut awal $\\theta_0$ dan dilepas dari posisi diam. Ketika pendulum sampai pada sudut $\\theta$, kecepatannya adalah v. Dengan mengabaikan gaya hambatan udara memegang konsep kelestarian energi mekanik, hubungan eksak antara v, $\\theta_0$, dan $\\theta$ yang benar adalah",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/8.png",
        answerOptions: [
          { answerText: "$\\frac{1}{2}mv^2 = mgL(\\sin(\\theta_0)-sin(\\theta))$", isCorrect: false },
          { answerText: "$\\frac{1}{2}mv^2 = mgL(\\cos(\\theta_0)-cos(\\theta))$", isCorrect: true },
          { answerText: "$\\frac{1}{2}mv^2 = mgL(\\cos(\\theta)-cos(\\theta_0))$", isCorrect: false },
          { answerText: "$mv^2 = 2mgL(\\theta_0-\\theta)$", isCorrect: false },
          { answerText: "$v = \\sqrt{(gL)(\\theta_0-\\theta)}$", isCorrect: false },
        ]
      },
      {
        questionText: "Pegas k menggantung secara vertikal dan diberikan pembebanan dengan massa m. Pada titik terendah, massa menerima tumbukan sangat cepat yang mengubah kecepatannya menjadi v tanpa mengubah posisi pegas. Setelah tumbukan, massa berosilasi dengan amplitudo A dari titik setimbang pegas. Maka amplitudo osilasi adalah",
        answerOptions: [
          { answerText: "$A = \\frac{mv}{k}$", isCorrect: false },
          { answerText: "$A = \\frac{v}{\\sqrt{k/m}}$", isCorrect: true },
          { answerText: "$A = \\frac{v^2}{\\sqrt{k/m}}$", isCorrect: false },
          { answerText: "$A = \\frac{2v}{\\omega}$", isCorrect: false },
          { answerText: "$A = \\frac{mv^2}{2k}$", isCorrect: false },
        ]
      },
      {
        questionText: "Percepatan sebuah partikel yang bergerak sepanjang garis lurus diberikan oleh persamaan a = v / k, dengan k adalah suatu konstanta. Jika pada saat t = 0, posisi S = 0 dan kecepatan v = v₀, tentukan kecepatan partikel sebagai fungsi waktu t.",
        answerOptions: [
          { answerText: "$v(t) = v_0 + \\frac{t}{k}$", isCorrect: false },
          { answerText: "$v(t) = \\sqrt{v_0^2 + 2kt}$", isCorrect: false },
          { answerText: "$v(t) = v_0e^{kt}$", isCorrect: false },
          { answerText: "$v(t) = v_0e^{t/k}$", isCorrect: true },
          { answerText: "$v(t) = ln(v_0) + \\frac{t}{k}$", isCorrect: false },
        ]
      },
      {
        questionText: "Akibat bencana banjir besar yang melanda beberapa wilayah di Sumatera, termasuk daerah terpencil di Aceh, banyak jalur darat terputus sehingga distribusi bantuan darurat tidak dapat dilakukan menggunakan kendaraan darat. Untuk mengatasi kondisi tersebut, Kepolisian Republik Indonesia mengerahkan helikopter guna menyalurkan kardus logistik berisi bahan makanan dan kebutuhan pokok kepada warga terdampak banjir. Helikopter tersebut terbang mendatar dengan kecepatan konstan ($v_A$) sebesar 72 km/jam pada ketinggian 100 m di atas permukaan tanah yang berlumpur. Pada suatu titik A, sebuah kardus logistik dilepaskan dari helikopter tanpa kecepatan vertikal awal, sehingga kardus tersebut bergerak mengikuti lintasan parabola akibat pengaruh gravitasi hingga akhirnya jatuh ke tanah di titik B. Tentukan percepatan normal kardus sesaat sebelum kardus menyentuh tanah di titik B! asumsikan g=10m/s2 dan kardus sebagai partikel titik.",
        questionPhoto: "/competitions/exam/Fisika/gambar soal mfest 2/9.png",
        answerOptions: [
          { answerText: "$\\frac{5}{3}\\sqrt{5} m/s^2$", isCorrect: false },
          { answerText: "$\\frac{5}{3}\\sqrt{6} m/s^2$", isCorrect: true },
          { answerText: "$\\frac{10}{3}\\sqrt{6} m/s^2$", isCorrect: false },
          { answerText: "$\\frac{20}{3}\\sqrt{6} m/s^2$", isCorrect: false },
          { answerText: "$\\frac{5}{3}\\sqrt{30} m/s^2$", isCorrect: false },
        ]
      },
    ],
  },
  2: {
    subject: "MATHEMATICS",
    questions: [
      {
        questionText: "ABCD adalah suatu persegi. Tentukan besar sudut $\\alpha$!",
        questionPhoto: "/competitions/exam/Mat/A/3.png",
        answerOptions: [
          { answerText: "$35^\\circ$", isCorrect: false },
          { answerText: "$45^\\circ$", isCorrect: false },
          { answerText: "$55^\\circ$", isCorrect: false },
          { answerText: "$65^\\circ$", isCorrect: false },
          { answerText: "$85^\\circ$", isCorrect: true },
        ],
      },
      {
        questionText: "Seorang polisi mengejar maling ke arah timur. Posisi awal polisi P di utara M sejauh 8 km. Kecepatan polisi $2 \\times$ maling. Jarak tempuh maling sebelum ditangkap?",
        questionPhoto: "/competitions/exam/Mat/A/7.png",
        answerOptions: [
          { answerText: "$\\frac{4}{3}\\sqrt{3}$ km", isCorrect: false },
          { answerText: "$4\\sqrt{3}$ km", isCorrect: false },
          { answerText: "$8$ km", isCorrect: false }, // [cite: 255]
          { answerText: "$\\frac{8}{3}\\sqrt{3}$ km", isCorrect: true }, // [cite: 255]
          { answerText: "$8\\sqrt{3}$ km", isCorrect: false },
        ],
      },
      {
        questionText: "Jika $\\cos x = \\frac{4}{5}$, tentukan nilai $\\frac{1-\\csc^2 x}{\\csc^2 x}$! (A)",
        answerOptions: [
          { answerText: "$-\\frac{9}{25}$", isCorrect: false },
          { answerText: "$\\frac{9}{25}$", isCorrect: false },
          { answerText: "$-\\frac{16}{25}$", isCorrect: true },
          { answerText: "$-\\frac{16}{9}$", isCorrect: false },
          { answerText: "$\\frac{9}{16}$", isCorrect: false },
        ],
      },
      {
        questionText: "Sekumpulan data $x_1$, $x_2$, $x_3$, . . . , $x_n$ memiliki rata-rata m. Jika setiap data dikalikan dengan q kemudian dijumlahkan dengan p, maka rata-ratanya menjadi . . .",
        answerOptions: [
          { answerText: "pq+m", isCorrect: false },
          { answerText: "p(m+q)", isCorrect: false },
          { answerText: "p(m+q)", isCorrect: false },
          { answerText: "qm+p", isCorrect: true }, // [cite: 259]
          { answerText: "pm+q", isCorrect: false },
        ],
      },
      {
        questionText: "Misalkan $\\vec{v}=2\\vec{i}+\\vec{j}+\\vec{k}$, $\\vec{u}=3\\vec{j}-3\\vec{i}+n\\vec{k}$. Jika $|\\vec{u}+\\vec{v}|=\\sqrt{42}$, nilai n?",
        answerOptions: [
          { answerText: "$n=5$ atau $n=-5$", isCorrect: false },
          { answerText: "$n=4$ atau $n=-6$", isCorrect: true },
          { answerText: "$n=4$ atau $n=-5$", isCorrect: false }, // [cite: 261]
          { answerText: "$n=5$ atau $n=-6$", isCorrect: false },
          { answerText: "$n=6$ atau $n=-4$", isCorrect: false },
        ],
      },
      {
        questionText: "$\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\dots = M$. Nilai M adalah?",
        answerOptions: [
          { answerText: "$\\infty$", isCorrect: false },
          { answerText: "$-\\infty$", isCorrect: false },
          { answerText: "0", isCorrect: false },
          { answerText: "1", isCorrect: true },
          { answerText: "$\\infty-1$", isCorrect: false }, // [cite: 262]
        ],
      },
    ],
  },
  3: {
    subject: "ESSAY",
    questions: [
      {
        questionText: "Okee selesaii, langsung kumpulin aja yaa ;)",
        answerOptions: [
          {
            answerText: "Mengurangi emisi karbon dan menjaga keberlanjutan sumber daya",
            isCorrect: true,
          },
          { answerText: "Agar terlihat modern saja", isCorrect: false },
        ],
      },
    ],
  },
};