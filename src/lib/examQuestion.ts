export const sessionsDataA = {
    1: {
        subject: "PHYSICS",
        questions: [
            {
                questionText: "Satrio adalah mahasiswa Program Studi Teknik Mesin ITB yang mengikuti sebuah Unit Kegiatan Mahasiswa yang berfokus pada pengembangan game digital. Ia tertarik untuk membuat permainan yang memenuhi hukum Fisika (khususnya Mekanika) di mana ia merancang sebuah sistem permainan yang melibatkan objek tank dan mobil penyusup. Tank tersebut menembakkan rudal dengan sudut elevasi $\\beta$ ke arah mobil penyusup yang berada di bukit yang dimodelkan sebagai suatu bidang miring sebagaimana tertera pada gambar di atas. Mula-mula, mobil tersebut tidak memiliki kecepatan awal dan berakselerasi konstan sebesar 2Q (dua dikali Q) menuruni bukit. Tentukan besar kecepatan awal rudal yang harus Satrio input ke sistem permainan agar rudal tersebut tepat mengenai mobil penyusup jika mobil tersebut tertembak di bukit dan tank selalu diam. Asumsikan ketinggian ujung moncong tembakan sama dengan ketinggian mobil sesaat setelah tertembak relatif terhadap tanah horizontal. Gesekan udara diabaikan.",
                questionPhoto: "/competitions/exam/KodeA/Fisika/1.png",
                answerOptions: [
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{4}{3}H)}{\\sin2\\beta+\\frac{16Q\\sin^{2}\\beta}{5g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{4}{3}H)}{\\sin2\\beta-\\frac{16Q\\sin^{2}\\beta}{5g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{3}{4}H)}{\\sin2\\beta+\\frac{16Q\\sin^{2}\\beta}{5g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{4}{3}H)}{\\sin2\\beta+\\frac{12Q\\sin^{2}\\beta}{5g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{4}{3}H)}{\\sin2\\beta+\\frac{32Q\\sin^{2}\\beta}{5g}}}$", isCorrect: true }
                ]
            },
            {
                questionText: "Diberikan bidang miring dengan sudut kemiringan serta balok yang memiliki massa berturut-turut adalah $m_{1}=4$ kg dan $m_{2}=5$ kg. Bidang miring tersebut berada di atas permukaan lantai yang kasar dengan suatu koefisien gesek kinetis $\\mu_{k}=0,75$ dan balok berada di atas bidang miring di mana permukaan antara balok dengan bidang miring adalah licin. Bidang miring ditarik oleh gaya konstan F sebesar 50 N. Mula-mula, bidang miring maupun balok berada pada keadaan diam serta balok berada di ujung atas bidang miring dengan ketinggian $H=4$ m. Tetapkan arah percepatan gravitasi $g=10~m/s^{2}$ ke bawah serta asumsikan sistem pasti bergerak, tentukan waktu t yang dibutuhkan balok agar sampai di dasar bidang miring. Diketahui juga $\\sin\\theta=0,6$ dan $\\cos\\theta=0,8$",
                questionPhoto: "/competitions/exam/KodeA/Fisika/2.png",
                answerOptions: [
                    { answerText: "Solusi Bukan Bilangan Real", isCorrect: false },
                    { answerText: "$\\frac{4}{5}\\sqrt{3}$ detik", isCorrect: false },
                    { answerText: "$\\frac{2}{3}\\sqrt{15}$ detik", isCorrect: true },
                    { answerText: "$\\frac{2}{3}\\sqrt{6}$ detik", isCorrect: false },
                    { answerText: "$\\frac{2}{3}\\sqrt{3}$ detik", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah selang menyemprotkan air pada titik A dengan kecepatan $v_{A}$ dan air keluar pada titik B. Karena dorongan dari air, blade dengan massa $m_{b}$ yang ditinjau sebagai sistem bergerak ke kanan dengan kecepatan dan mengakibatkan muncratan air $v_{cv}$ pada titik B membentuk sudut $\\phi$ terhadap horizontal. Diketahui debit air sebesar Q dan laju aliran massa $(\\frac{dm}{dt})$ selalu sama di sepanjang lengkungan blade. Gaya dorong akibat hembusan air mengakibatkan gaya reaksi R pada sistem yang terpusat pada titik G dan selalu tegak lurus garis yang membentuk sudut $\\theta$ terhadap datar dan merupakan sudut komplementer dengan $\\phi$. Turunkan persamaan untuk menentukan waktu yang diperlukan untuk membuat sistem bergerak sebesar $v_{cv}$ dengan mengabaikan gesekan air terhadap blade dan gesekan blade terhadap tanah serta sistem semula diam!. Anggap sistem sebagai benda titik dan massa jenis air adalah $\\rho$ serta semua kecepatan dianggap konstan ($v_{A}$ dan $v_{B}$ adalah kecepatan relatif air terhadap blade).",
                questionPhoto: "/competitions/exam/KodeA/Fisika/3.png",
                answerOptions: [
                    { answerText: "$t = \\frac{m_{b} \\cdot v_{cv}}{\\rho Q(v_{B}\\sin\\theta-v_{A})}$", isCorrect: false },
                    { answerText: "$t = \\frac{m_{b} \\cdot v_{cv}}{\\rho Q(v_{A}-v_{B}\\sin\\theta)}$", isCorrect: false },
                    { answerText: "$t = \\frac{m_{b} \\cdot v_{cv}}{-R \\cdot \\sin\\theta}$", isCorrect: true },
                    { answerText: "$t = \\frac{m_{b} \\cdot v_{cv}}{-R \\cdot \\cos\\theta}$", isCorrect: false },
                    { answerText: "$t = \\frac{m_{b} \\cdot v_{cv}}{\\rho Q(v_{A}\\cos\\phi-v_{B})}$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah wadah diisi air dengan massa jenis $1000kg/m^{3}$ sampai ketinggian 2 meter. Wadah tersebut tertutupi oleh 3 dinding diam, lantai dan satu dinding yang dapat dibuka (secara digulung dari bawah ke atas seperti di gambar) dengan tinggi 2 meter dan lebar 3 meter seperti di gambar. Agar pintu wadah tersebut tetap tertutup, diberikan gaya F di ujung bawah pintu tersebut untuk menahannya. Besar gaya F yang dibutuhkan adalah: (percepatan gravitasi adalah $10m/s^{2}$)",
                questionPhoto: "/competitions/exam/KodeA/Fisika/4.png",
                answerOptions: [
                    { answerText: "60000 N", isCorrect: false },
                    { answerText: "40000 N", isCorrect: true },
                    { answerText: "30000 N", isCorrect: false },
                    { answerText: "20000 N", isCorrect: false },
                    { answerText: "35000 N", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah pipa U dengan luas penampang yang sama di tiap ujung pipa berotasi dengan salah satu tabung sebagai poros kelajuan sudut putar ($\\omega=4~rad/s$) menyebabkan kedua permukaan cairan berselisih H meter. Jika panjang pipa U mendatar adalah 3 meter, maka tinggi H adalah... ($g=10m/s^{2}$)",
                questionPhoto: "/competitions/exam/KodeA/Fisika/5.png",
                answerOptions: [
                    { answerText: "2.7 meter", isCorrect: false },
                    { answerText: "3.6 meter", isCorrect: false },
                    { answerText: "4.5 meter", isCorrect: false },
                    { answerText: "5.4 meter", isCorrect: false },
                    { answerText: "7.2 meter", isCorrect: true }
                ]
            },
            {
                questionText: "Hitunglah kecepatan balok sesaat ketika balok berada di B jika kecepatan awalnya adalah $4~m/s$ ketika berada di A. Koefisien gesekan kinetik adalah 0.30 dan asumsikan kecepatan gravitasi $g=9,8~m/s^{2}$ ",
                questionPhoto: "/competitions/exam/KodeA/Fisika/6.png",
                answerOptions: [
                    { answerText: "$2.5~m/s$", isCorrect: false },
                    { answerText: "$2.9~m/s$", isCorrect: false },
                    { answerText: "$3.1~m/s$", isCorrect: true },
                    { answerText: "$1.8~m/s$", isCorrect: false },
                    { answerText: "$0.9~m/s$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah bola dilemparkan ke lantai kasar dengan sudut $\\theta=45$ derajat. Jika bolanya memantul di sudut yang sama, tentukan koefisien gesek kinetis antara bola dan lantai. Diketahui koefisien restitusi dari lantai tersebut adalah 0.6.",
                questionPhoto: "/competitions/exam/KodeA/Fisika/7.png",
                answerOptions: [
                    { answerText: "0,25", isCorrect: true },
                    { answerText: "0,3", isCorrect: false },
                    { answerText: "0,35", isCorrect: false },
                    { answerText: "0,45", isCorrect: false },
                    { answerText: "0,5", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah spool (seperti yoyo besar) memiliki massa sebesar M, jari-jari luar R, dan jari-jari dalam r. Momen inersia terhadap pusat massanya adalah $I=\\frac{1}{2}M(R^{2}+r^{2}).$ Spool ini berada di atas lantai kasar horizontal sehingga dapat menggelinding tanpa slip. Sebuah pegas dengan konstanta k diikatkan pada pegas yang melilit hub dalam (jari-jari r). Ujung tali ditarik horizontal menjauhi dinding. Tentukan frekuensi angular dari sistem tersebut.",
                answerOptions: [
                    { answerText: "$\\omega=\\sqrt{\\frac{k}{M}}$", isCorrect: false },
                    { answerText: "$\\omega=\\sqrt{\\frac{k(1+\\frac{r}{R})^{2}}{M(\\frac{3}{2}+\\frac{r^{2}}{2R^{2}})}}$", isCorrect: true },
                    { answerText: "$\\omega=\\sqrt{\\frac{k(1+\\frac{r}{R})}{M(1+\\frac{r^{2}}{R^{2}})}}$", isCorrect: false },
                    { answerText: "$\\omega=\\sqrt{\\frac{k(1+\\frac{r}{R})^{2}}{M(\\frac{3}{2}+\\frac{r^{2}}{2R^{2}})^{2}}}$", isCorrect: false },
                    { answerText: "$\\omega=\\sqrt{\\frac{k}{M(1+\\frac{r^{2}}{2R^{2}})}}$", isCorrect: false }
                ]
            },
            {
                questionText: "Silinder halus C bermassa 3 kg memiliki pasak P yang bergerak melewati celah pada batang OA. Jarak vertikal titik O dan C adalah 1m. Jika lengan tersebut dipaksa berputar pada bidang vertikal dengan laju konstan tentukan $\\frac{d\\theta}{dt}=1~rad/s$ gaya yang diberikan lengan tersebut saat $\\theta=30^{\\circ}$ (Gunakan $\\sqrt{3}=1,71)$",
                questionPhoto: "/competitions/exam/KodeA/Fisika/9.png",
                answerOptions: [
                    { answerText: "6,92 N", isCorrect: false },
                    { answerText: "11,99 N", isCorrect: false },
                    { answerText: "40,24 N", isCorrect: false },
                    { answerText: "83,11 N", isCorrect: true },
                    { answerText: "101,25 N", isCorrect: false }
                ]
            },
            {
                questionText: "Tinjau sebuah silinder panjang dan narrow dengan luas penampang A yang diisi dengan cairan kompresibel hingga ketinggian h. Massa jenis cairan tersebut merupakan fungsi dari tekanan $P(z)$ yang dinyatakan sebagai: $p(z)=\\frac{P_{o}}{2}(1+\\frac{P(z)}{P_{o}})$ di mana Po dan $\\rho_{o}$ konstanta. Percepatan gravitasi adalah g. Kedalaman z diukur dari permukaan bebas cairan, di mana tekanannya sama dengan tekanan atmosfer (Patm). Tentukan tekanan $P(z)$ sebagai fungsi dari z!",
                questionPhoto: "/competitions/exam/KodeA/Fisika/10.png",
                answerOptions: [
                    { answerText: "$P(z)=(P_{atm}+P_{o})\\exp(\\frac{\\rho_{o}gz}{2P_{o}})-P_{o}$", isCorrect: true },
                    { answerText: "$P(z)=(P_{atm}+P_{o})\\exp(\\frac{\\rho_{o}gz}{2P_{o}})-P_{atm}$", isCorrect: false },
                    { answerText: "$P(z)=(P_{atm}+P_{o})\\exp(\\frac{\\rho_{o}gz}{2})-P_{o}$", isCorrect: false },
                    { answerText: "$P(z)=(P_{atm}+P_{o})\\exp(\\frac{P_{o}z}{2P_{o}})-P_{o}$", isCorrect: false },
                    { answerText: "$P(z)=(P_{atm}+P_{o})\\ln(\\frac{P_{o}gz}{2P_{o}})-P_{o}$", isCorrect: false }
                ]
            },
            {
                questionText: "Seorang pendaki terjebak di Puncak Gunung Semeru yang dingin (Suhu $T_{1}$, sementara tim penyelamat berada di Base Camp yang hangat di kaki gunung (Suhu $T_{2}$ ). Jarak vertikal antara mereka adalah L. Pendaki tersebut membunyikan peluit darurat. Karena perbedaan ketinggian, suhu udara menurun secara linear dari Base Camp ke Puncak. Jika diasumsikan kecepatan bunyi bergantung pada suhu dengan persamaan $v=\\alpha\\sqrt{T},$ di mana $\\alpha$ adalah suatu konstanta. Berapa lama waktu yang dibutuhkan suara peluit itu untuk terdengar oleh tim penyelamat di bawah?",
                answerOptions: [
                    { answerText: "$t=\\frac{2L}{\\alpha(\\sqrt{T_{puncak}}-\\sqrt{T_{base}})}$", isCorrect: false },
                    { answerText: "$t=\\frac{2L}{\\alpha(T_{puncak}+T_{base})}$", isCorrect: false },
                    { answerText: "$t=\\frac{2L(\\sqrt{T_{puncak}}+\\sqrt{T_{base}})}{a(\\sqrt{T_{base}})}$", isCorrect: false },
                    { answerText: "$t=\\frac{2L}{a(2\\sqrt{T_{puncak}}+\\sqrt{T_{base}})}$", isCorrect: false },
                    { answerText: "$t=\\frac{2L}{\\alpha(\\sqrt{T_{puncak}}+\\sqrt{T_{base}})}$", isCorrect: true }
                ]
            },
            {
                questionText: "Di kedalaman laut di Samudra selatan, secara tidak sengaja kapal selam \"Leviathan\"(A.S) dan kapal selam \"Minerve\" (Prancis) berpapasan. Minerve bergerak ke kanan dengan kecepatan $50~km/jam$ dan Leviathan bergerak ke kiri dengan kecepatan $100~km/jam$. Minerve mengirimkan sinyal sonar (gelombang suara dalam air) dengan frekuensi $10^{3}Hz.$ Gelombang sonar tersebut bergerak dengan kecepatan $5050~km/jam$ Berturut-turut tentukanlah frekuensi sinyal yang terdeteksi oleh Leviathan dan frekuensi yang terdeteksi oleh Minerve pada sinyal yang dipantulkan kembali kepadanya oleh Leviathan.",
                questionPhoto: "/competitions/exam/KodeA/Fisika/12.png",
                answerOptions: [
                    { answerText: "1015 Hz dan 1051 Hz", isCorrect: false },
                    { answerText: "1030 Hz dan 1051 Hz", isCorrect: false },
                    { answerText: "1015 Hz dan 1061 Hz", isCorrect: false },
                    { answerText: "1030 Hz dan 1061 Hz", isCorrect: true },
                    { answerText: "1015 Hz dan 1030 Hz", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah gitar dipetik sehingga pada salah satu senarnya terdapat dua buah gelombang yang saling berlawanan arah dengan persamaan: $y_{1}(x,t)=(5~mm)\\sin(3\\pi x-300\\pi t)$ $y_{2}(x,t)=(5~mm)\\sin(3\\pi x+300\\pi t+\\frac{\\pi}{2})$ Dengan x dalam meter dan t dalam detik. Kedua gelombang tersebut berinterferensi membentuk gelombang berdiri. Jika sebuah titik antinode berada di titik A, tentukan jarak yang ditempuh masing-masing gelombang berjalan pada senar selama titik A bergerak dari simpangan maksimum atas menuju posisi keseimbangan untuk pertama kali",
                answerOptions: [
                    { answerText: "$\\frac{1}{2}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{3}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{4}m$", isCorrect: true },
                    { answerText: "$\\frac{1}{6}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{12}m$", isCorrect: false }
                ]
            },
            {
                questionText: "Terdapat dua ranting kayu yang mengambang di kolam Curug Biru dan terpisah sejauh X cm. Keduanya naik-turun bersamaan dengan frekuensi B getaran per detik. Salah satu ranting berada pada puncak gelombang (titik C) dan yang lain berada pada lembah (titik D). Di antara C dan D terdapat 3 bukit gelombang lengkap. Berapakah cepat rambat gelombang pada permukaan kolam tersebut? (Asumsi debit air terjun konstan.)",
                answerOptions: [
                    { answerText: "$v=\\frac{2BX}{7}$", isCorrect: true },
                    { answerText: "$v=\\frac{BX}{7}$", isCorrect: false },
                    { answerText: "$v=\\frac{3BX}{2}$", isCorrect: false },
                    { answerText: "$v=\\frac{BX}{4}$", isCorrect: false },
                    { answerText: "$v=\\frac{3BX}{1.5}$", isCorrect: false }
                ]
            },
            {
                questionText: "Mobil-mobil bergerak mengelilingi sebuah bundaran lalu lintas yang berbentuk elips dengan $a=10$ m dan $b=50$ m. Jika mobil bergerak dengan kecepatan konstan sebesar $36~km/jam.$ Jika lintasan dinyatakan sebagai $y=f(x)$ maka jari-jari kelengkungan $\\rho$ pada setiap titik di sepanjang lintasan dapat ditentukan dari persamaan: $\\rho=\\frac{[1+(\\frac{dy}{dx})^{2}]^{\\frac{3}{2}}}{|\\frac{d^{2}y}{dx^{2}}|}$ tentukan percepatan maksimum yang dialami oleh penumpang!",
                questionPhoto: "/competitions/exam/KodeA/Fisika/15.png",
                answerOptions: [
                    { answerText: "$10~m/s^{2}$", isCorrect: false },
                    { answerText: "$20~m/s^{2}$", isCorrect: false },
                    { answerText: "$30~{m/s}^{2}$", isCorrect: false },
                    { answerText: "$40~{m/s}^{2}$", isCorrect: false },
                    { answerText: "$50~m/s^{2}$", isCorrect: true }
                ]
            }
        ]
    },
    2: {
        subject: "MATHEMATICS",
        questions: [
            {
                "questionText": "Jika $f^{-1}(x)=\\frac{x+1}{x+d}$ untuk suatu $d \\in \\mathbb{R}$ dan $f(2)=6$, maka nilai $d$ adalah...",
                "answerOptions": [
                    { "answerText": "-5/2", "isCorrect": true },
                    { "answerText": "-3/2", "isCorrect": false },
                    { "answerText": "3/2", "isCorrect": false },
                    { "answerText": "2", "isCorrect": false },
                    { "answerText": "3", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diketahui grafik fungsi $f(x)=\\frac{1}{9}x^{3}-x+2$. Garis singgung grafik ini pada $x=1$ memotong grafik pada suatu titik lain $(A, B)$. Tentukan nilai $A+B$",
                "questionPhoto": "/competitions/exam/Mat/A/2.png",
                "answerOptions": [
                    { "answerText": "1/3", "isCorrect": false },
                    { "answerText": "2/3", "isCorrect": false },
                    { "answerText": "10/9", "isCorrect": true },
                    { "answerText": "2", "isCorrect": false },
                    { "answerText": "20/9", "isCorrect": false }
                ]
            },
            {
                "questionText": "Perhatikan data berikut: 4, 7, 8, 10, 12, $x, y$. Diketahui bahwa median data ini adalah 8, dan jangkauannya adalah 10. Maka, mean terbesar yang mungkin adalah...",
                "answerOptions": [
                    { "answerText": "50/7", "isCorrect": false },
                    { "answerText": "8", "isCorrect": false },
                    { "answerText": "53/7", "isCorrect": false },
                    { "answerText": "60/7", "isCorrect": false },
                    { "answerText": "9", "isCorrect": true }
                ]
            },
            {
                "questionText": "Suatu kantong berisi 3 bola merah, 3 bola biru, dan 3 bola kuning. Arie mengambil 4 bola secara acak, dan ia menyatakan bahwa $setidaknya$ $satu$ bola berwarna merah. Berapa peluang Arie tidak mengambil bola biru?",
                "answerOptions": [
                    { "answerText": "15/81", "isCorrect": false },
                    { "answerText": "11/64", "isCorrect": false },
                    { "answerText": "27/64", "isCorrect": false },
                    { "answerText": "5/37", "isCorrect": true },
                    { "answerText": "4/9", "isCorrect": false }
                ]
            },
            {
                "questionText": "Sisa dari $5^{2026}-2^{2026}$ saat dibagi 9 adalah....",
                "answerOptions": [
                    { "answerText": "3", "isCorrect": false },
                    { "answerText": "6", "isCorrect": true },
                    { "answerText": "7", "isCorrect": false },
                    { "answerText": "8", "isCorrect": false },
                    { "answerText": "0", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan 2 buah bilangan bulat positif yakni $m$ dan 72. Jika diketahui FPB dan KPK nya berturut-turut 8 dan 1080, maka nilai $m$ adalah...",
                "answerOptions": [
                    { "answerText": "40", "isCorrect": false },
                    { "answerText": "60", "isCorrect": false },
                    { "answerText": "80", "isCorrect": false },
                    { "answerText": "90", "isCorrect": false },
                    { "answerText": "120", "isCorrect": true }
                ]
            },
            {
                "questionText": "Jika diketahui $m_{1}=1$, $m_{2}=5$ dan $m_{k}=5m_{k-1}-6m_{k-2}$, maka nilai $m_{2026}$ adalah...",
                "answerOptions": [
                    { "answerText": "$3^{2025}-2^{2025}$", "isCorrect": false },
                    { "answerText": "$3^{2026}-2^{2026}$", "isCorrect": true },
                    { "answerText": "$3^{2027}-2^{2027}$", "isCorrect": false },
                    { "answerText": "$3^{2026}-2^{2025}$", "isCorrect": false },
                    { "answerText": "$3^{2027}-2^{2026}$", "isCorrect": false }
                ]
            },
            {
                "questionText": "Misalkan Kinx diberikan pernyataan '... jika dan hanya jika $A \\cap B = A$'. Manakah pernyataan yang harus diisi Kinx pada bagian yang kosong?",
                "answerOptions": [
                    { "answerText": "$A ⊆ B$", "isCorrect": true },
                    { "answerText": "$B ⊆ A$", "isCorrect": false },
                    { "answerText": "$B ∪ A = A$", "isCorrect": false },
                    { "answerText": "$A^C = B$", "isCorrect": false },
                    { "answerText": "$B^C = A$", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan bilangan $x$ real yang memenuhi $9x^{2}+3\\{x\\}=12$. Bilangan $x$ yang memenuhi dapat dinyatakan dalam bentuk paling sederhana $\\frac{a+\\sqrt{b}}{c}$. Tentukan nilai dari $a+b+c$ Note: {x} = bilangan desimal dari x, contoh: {1.1} = 0.1, {-1.1} = 0.9",
                "answerOptions": [
                    { "answerText": "63", "isCorrect": false },
                    { "answerText": "64", "isCorrect": false },
                    { "answerText": "65", "isCorrect": false },
                    { "answerText": "66", "isCorrect": true },
                    { "answerText": "67", "isCorrect": false }
                ]
            },
            {
                "questionText": "Tentukan banyaknya pasangan $(a, b)$ yang memenuhi $FPB(a,b)=2025!$ dan $KPK(a,b)=2026!$ dengan $a \\le b$.",
                "answerOptions": [
                    { "answerText": "1", "isCorrect": false },
                    { "answerText": "2", "isCorrect": true },
                    { "answerText": "3", "isCorrect": false },
                    { "answerText": "4", "isCorrect": false },
                    { "answerText": "5", "isCorrect": false }
                ]
            },
            {
                "questionText": "Banyaknya cara menaruh 7 benteng pada papan catur 8x8 sehingga tidak ada benteng yang berada pada kolom atau baris yang sama adalah...",
                "answerOptions": [
                    { "answerText": "7!", "isCorrect": false },
                    { "answerText": "8!-7!", "isCorrect": false },
                    { "answerText": "8!", "isCorrect": false },
                    { "answerText": "9!-8!", "isCorrect": true },
                    { "answerText": "9!", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan segienam ABCDEF beraturan dengan panjang sisi 6. Titik potong garis AC dan BD adalah P. Tentukan panjang $PE^{2}$",
                "answerOptions": [
                    { "answerText": "80", "isCorrect": false },
                    { "answerText": "81", "isCorrect": false },
                    { "answerText": "82", "isCorrect": false },
                    { "answerText": "83", "isCorrect": false },
                    { "answerText": "84", "isCorrect": true }
                ]
            },
            {
                "questionText": "Diberikan bidang $2025x+45y-2025z=90$ dan $90x+2y-90z=2025$. Jarak terpendek di antara kedua bidang tersebut dapat dinyatakan dalam bentuk $\\frac{a}{b\\sqrt{c}}$. Tentukan nilai $a+b+c$",
                "answerOptions": [
                    { "answerText": "6076", "isCorrect": false },
                    { "answerText": "6075", "isCorrect": false },
                    { "answerText": "6074", "isCorrect": true },
                    { "answerText": "6073", "isCorrect": false },
                    { "answerText": "6072", "isCorrect": false }
                ]
            },
            {
                "questionText": "Dalam suatu perlombaan terdapat 25 soal. Sistem penilaian yang digunakan adalah sebagai berikut: Jawaban benar diberi skor +4, Jawaban salah diberi skor −1, Jawaban tidak diisi diberi skor 0. Perlombaan tersebut diikuti oleh 125 peserta. Setelah seluruh lembar jawaban diperiksa, diperoleh informasi bahwa rata-rata skor peserta adalah 34 dan median skor peserta adalah 32. tentukan banyak maksimum peserta yang mungkin memperoleh skor tertinggi pada perlombaan tersebut",
                "answerOptions": [
                    { "answerText": "62", "isCorrect": false },
                    { "answerText": "59", "isCorrect": false },
                    { "answerText": "57", "isCorrect": false },
                    { "answerText": "55", "isCorrect": true },
                    { "answerText": "52", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan suatu barisan $S_{n}$ yang didefinisikan secara rekursif sebagai berikut: $S_{0}=5$ dan untuk setiap bilangan bulat n ≥ 1 $S_{n}-S_{n-1}=\\frac{21\\times(5^{n}+1)}{8^{n-1}\\times4}$. Tentukan nilai $\\lim_{n \\to \\infty} S_{n}$",
                "answerOptions": [
                    { "answerText": "100", "isCorrect": false },
                    { "answerText": "81", "isCorrect": true },
                    { "answerText": "64", "isCorrect": false },
                    { "answerText": "49", "isCorrect": false },
                    { "answerText": "36", "isCorrect": false }
                ]
            }
        ]
    },
    3: {
        subject: "ESSAY",
        questions: [
            {
                questionText:
                    "Sebuah silinder berdinding tipis dengan massa $M$ dan permukaan dalam yang cukup kasar berjari-jari $R$ dapat berotasi pada sumbu pusat horizontal tetapnya, $OZ$. Sumbu $Z$ tegak lurus dan mengarah keluar dari halaman (bidang gambar).\nSebuah silinder pejal homogen lain yang lebih kecil dengan massa $m$ dan jari-jari $r$ menggelinding tanpa slip pada permukaan dalam $M$ pada sumbu pusatnya sendiri yang sejajar dengan $OZ$. Sistem dipengaruhi oleh percepatan gravitasi sebesar $g$ ke bawah. Dengan cara $Newtonian$, tentukan:\na). Berapakah periode osilasi amplitudo kecil pada sistem jika:\n1. $M > m$ (10 poin)\n2. $M \\gg m$ (2 poin)\nb). Jelaskan bagaimana ekuivalensi gerakan sistemnya secara fisis pada kasus $M \\gg m$ (3 poin)",
                    questionPhoto: "/competitions/exam/essay.png",
            },
        ],
    },
};

export const sessionsDataB = {
    1: {
        subject: "PHYSICS",
        questions: [
            {
                questionText: "Yanto adalah mahasiswa Program Studi Teknik Mesin ITB yang mengikuti sebuah Unit Kegiatan Mahasiswa yang berfokus pada pengembangan game digital. Ia tertarik untuk membuat permainan yang memenuhi hukum Fisika (khususnya Mekanika) di mana ia merancang sebuah sistem permainan yang melibatkan objek tank dan mobil penyusup. Tank tersebut menembakkan rudal dengan sudut elevasi $\\beta$ ke arah mobil penyusup yang berada di bukit yang dimodelkan sebagai suatu bidang miring sebagaimana tertera pada gambar di atas. Mula-mula, mobil tersebut tidak memiliki kecepatan awal dan berakselerasi konstan sebesar 0,5 (setengah kali P) menuruni bukit. Tentukan besar kecepatan awal rudal yang harus Satrio input ke sistem permainan agar rudal tersebut tepat mengenai mobil penyusup jika mobil tersebut tertembak di bukit dan tank selalu diam. Asumsikan ketinggian ujung moncong tembakan sama dengan ketinggian mobil sesaat setelah tertembak relatif terhadap tanah horizontal. Gesekan udara diabaikan.",
                questionPhoto: "/competitions/exam/KodeB/Fisika/1.png",
                answerOptions: [
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{12}{5}H)}{\\sin2\\beta-\\frac{12P\\sin^{2}\\beta}{13g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{12}{5}H)}{\\sin2\\beta+\\frac{12P\\sin^{2}\\beta}{13g}}}$", isCorrect: true },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{5}{12}H)}{\\sin2\\beta-\\frac{12P\\sin^{2}\\beta}{13g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{12}{5}H)}{\\sin2\\beta+\\frac{5P\\sin^{2}\\beta}{13g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{12}{5}H)}{\\sin2\\beta+\\frac{24P\\sin^{2}\\beta}{13g}}}$", isCorrect: false }
                ]
            },
            {
                questionText: "Diberikan bidang miring dengan sudut kemiringan serta balok yang memiliki massa berturut-turut adalah $m_{1}=2$ kg dan $m_{2}=5$ kg. Bidang miring tersebut berada di atas permukaan lantai yang kasar dengan suatu koefisien gesek kinetis $\\mu_{k}=0,5$ dan balok berada di atas bidang miring di mana permukaan antara balok dengan bidang miring adalah licin. Bidang miring ditarik oleh gaya konstan F sebesar 15 N. Mula-mula, bidang miring maupun balok berada pada keadaan diam serta balok berada di ujung atas bidang miring dengan ketinggian $H=5,5$ m. Tetapkan arah percepatan gravitasi $g=10~m/s^{2}$ ke bawah serta asumsikan sistem pasti bergerak, tentukan waktu t yang dibutuhkan balok agar sampai di dasar bidang miring. Diketahui juga $\\sin\\theta=0,8$ dan $\\cos\\theta=0,6$",
                questionPhoto: "/competitions/exam/KodeA/Fisika/2.png",
                answerOptions: [
                    { answerText: "$\\frac{1}{2}\\sqrt{11}$ detik", isCorrect: false },
                    { answerText: "1 detik", isCorrect: false },
                    { answerText: "Solusi Bukan Bilangan Real", isCorrect: false },
                    { answerText: "$\\frac{1}{2}\\sqrt{5}$ detik", isCorrect: true },
                    { answerText: "$\\frac{2}{5}\\sqrt{11}$ detik", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah selang air disemprotkan dengan kecepatan $v$ dari nozzle dengan diameter $d$. Air kemudian dimuncratkan keluar dari vane dengan kecepatan $v'=4v$ dengan membentuk sudut  terhadap datar. Jika massa jenis air yaitu $\\rho$ , hitunglah resultan reaksi yang diperlukan agar vane tetap diam! anggap laju aliran massa $(\\frac{dm}{dt})$ selalu sama di sepanjang lengkungan vane dan abaikan gesekan air.",
                questionPhoto: "/competitions/exam/KodeB/Fisika/3.jpeg",
                answerOptions: [
                    { answerText: "$R = \\rho \\pi d^2 v^2 \\sqrt{\\frac{17}{16} - \\frac{1}{2} \\cos \\theta}$", isCorrect: true },
                    { answerText: "$R = \\frac{\\rho \\pi d^2 v^2}{4} \\sqrt{17 - \\frac{1}{2} \\cos \\theta}$", isCorrect: false },
                    { answerText: "$R = \\frac{\\rho \\pi d^2 v^2}{4} \\sqrt{17 - 4 \\cos \\theta}$", isCorrect: false },
                    { answerText: "$R = \\rho \\pi d^2 v^2 \\sqrt{\\frac{17}{16} - \\frac{1}{2} \\sin \\theta}$", isCorrect: false },
                    { answerText: "$R = \\frac{\\rho \\pi d^2 v^2}{4} \\sqrt{\\frac{17}{16} - \\frac{1}{2} \\sin \\theta}$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah wadah diisi air dengan massa jenis $1000kg/m^{3}$ sampai ketinggian 3 meter. Wadah tersebut tertutupi oleh 3 dinding diam, lantai dan satu dinding yang dapat dibuka (secara digulung dari bawah ke atas seperti di gambar) dengan tinggi 3 meter dan lebar 4 meter seperti di gambar. Agar pintu wadah tersebut tetap tertutup, diberikan gaya F di ujung bawah pintu tersebut untuk menahannya. Besar gaya F yang dibutuhkan adalah: (percepatan gravitasi adalah $10m/s^{2}$)",
                questionPhoto: "/competitions/exam/KodeB/Fisika/4.png",
                answerOptions: [
                    { answerText: "90.000 N", isCorrect: false },
                    { answerText: "120.000 N", isCorrect: true },
                    { answerText: "130.000 N", isCorrect: false },
                    { answerText: "150.000 N", isCorrect: false },
                    { answerText: "180.000 N", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah pipa U dengan luas penampang yang sama di tiap ujung pipa berotasi dengan salah satu tabung sebagai poros kelajuan sudut putar ($\\omega=5~rad/s$) menyebabkan kedua permukaan cairan berselisih H meter. Jika panjang pipa U mendatar adalah 4 meter, maka tinggi H adalah... ($g=10m/s^{2}$)",
                questionPhoto: "/competitions/exam/KodeB/Fisika/5.png",
                answerOptions: [
                    { answerText: "5 meter", isCorrect: false },
                    { answerText: "10 meter", isCorrect: false },
                    { answerText: "15 meter", isCorrect: false },
                    { answerText: "20 meter", isCorrect: true },
                    { answerText: "25 meter", isCorrect: false }
                ]
            },
            {
                questionText: "Hitunglah Vb! (asumsikan kecepatan gravitasi $g=9,8~m/s^{2}$) ",
                questionPhoto: "/competitions/exam/KodeB/Fisika/6.png",
                answerOptions: [
                    { answerText: "$10~m/s$", isCorrect: false },
                    { answerText: "$13.4~m/s$", isCorrect: false },
                    { answerText: "$16.4~m/s$", isCorrect: false },
                    { answerText: "$12.5~m/s$", isCorrect: true },
                    { answerText: "$11.3~m/s$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah bola dilemparkan ke lantai kasar dengan sudut $\\theta=37$ derajat. Jika bolanya memantul di sudut $\\phi=37$ derajat, tentukan koefisien gesek kinetis antara bola dan lantai. Diketahui koefisien restitusi dari lantai tersebut adalah 0.75.",
                questionPhoto: "/competitions/exam/KodeB/Fisika/7.png",
                answerOptions: [
                    { answerText: "$\\frac{37}{84}$", isCorrect: true },
                    { answerText: "$\\frac{35}{84}$", isCorrect: false },
                    { answerText: "$\\frac{31}{84}$", isCorrect: false },
                    { answerText: "$\\frac{41}{84}$", isCorrect: false },
                    { answerText: "$\\frac{43}{84}$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah spool (seperti yoyo besar) memiliki massa sebesar M = 2$kg$, jari-jari luar R = 0.5$m$, dan jari-jari dalam r = 0.25$m$. Momen inersia terhadap pusat massanya adalah $I=\\frac{1}{2}M(R^{2}+r^{2}).$ Spool ini berada di atas lantai kasar horizontal sehingga dapat menggelinding tanpa slip. Sebuah pegas dengan konstanta k (128 $N/m$) diikatkan pada pegas yang melilit hub dalam (jari-jari r). Ujung tali ditarik horizontal menjauhi dinding. Tentukan frekuensi angular dari sistem tersebut.",
                answerOptions: [
                    { answerText: "$\\omega= 4 rad/s$", isCorrect: false },
                    { answerText: "$\\omega= 6 rad/s$", isCorrect: false },
                    { answerText: "$\\omega= 8 rad/s$", isCorrect: true },
                    { answerText: "$\\omega= 10 rad/s$", isCorrect: false },
                    { answerText: "$\\omega= 12 rad/s$", isCorrect: false }
                ]
            },
            {
                questionText: "Silinder halus C bermassa 4 kg memiliki pasak P yang bergerak melewati celah pada batang OA. Jarak vertikal titik O dan C adalah 1m. Jika lengan tersebut dipaksa berputar pada bidang vertikal dengan laju konstan tentukan $\\frac{d\\theta}{dt}=1~rad/s$ gaya yang diberikan lengan tersebut saat $\\theta=30^{\\circ}$ (Gunakan $\\sqrt{3}=1,71)$",
                questionPhoto: "/competitions/exam/KodeB/Fisika/9.png",
                answerOptions: [
                    { answerText: "20,76 N", isCorrect: false },
                    { answerText: "56 N", isCorrect: false },
                    { answerText: "110,8 N", isCorrect: true },
                    { answerText: "160,3 N", isCorrect: false },
                    { answerText: "75,5 N", isCorrect: false }
                ]
            },
            {
                questionText: "Tinjau sebuah silinder panjang dan narrow dengan luas penampang A yang diisi dengan cairan kompresibel hingga ketinggian h. Kedalaman z diukur ke bawah dari permukaan bebas fluida. Tekanan di permukaan bebas sama dengan tekanan atmosfer Patm  Massa jenis cairan tersebut  merupakan fungsi dari tekanan $P(z)$ yang dinyatakan sebagai:  $\\rho(z)=\\rho_{o}(1+\\alpha \\frac{P(z)}{P_{o}})$ di mana $P_{o}$, $\\rho_{o}$ dan $\\alpha$ adalah konstanta. Percepatan gravitasi adalah $g$. Tentukan tekanan dasar silinder $P(h)$!",
                questionPhoto: "/competitions/exam/KodeB/Fisika/11.png",
                answerOptions: [
                    { answerText: "$P(h) = \\frac{P_0}{\\alpha} \\left[ \\left( 1 + \\frac{\\alpha P_{\\text{atm}}}{P_0} \\right) e^{\\frac{\\alpha \\rho_0 g h}{P_0}} + 1 \\right]$", isCorrect: false },
                    { answerText: "$P(h) = \\frac{P_0}{\\alpha} \\left[ \\left( 1 + \\frac{\\alpha P_{\\text{atm}}}{P_0} \\right) e^{\\frac{\\alpha \\rho_0 g h}{P_0}} \\right]$", isCorrect: false },
                    { answerText: "$P(h) = \\frac{P_0}{\\alpha} \\left[ \\left( 1 - \\frac{\\alpha P_{\\text{atm}}}{P_0} \\right) e^{\\frac{\\alpha \\rho_0 g h}{P_0}} - 1 \\right]$", isCorrect: false },
                    { answerText: "$P(h) = \\frac{P_0}{\\alpha} \\left[ \\left( 1 + \\frac{\\alpha P_{\\text{atm}}}{P_0} \\right) e^{\\frac{\\alpha \\rho_0 g h}{P_0}} - 1 \\right]$", isCorrect: true },
                    { answerText: "$P(h) = \\frac{P_0}{\\alpha} \\left[ \\left( \\frac{\\alpha P_{\\text{atm}}}{P_0} \\right) e^{\\frac{\\alpha \\rho_0 g h}{P_0}} - 1 \\right]$", isCorrect: false }
                ]
            },
            {
                questionText: "Seorang pendaki terjebak di Puncak Gunung Semeru yang dingin (Suhu $T_{1}$, sementara tim penyelamat berada di Base Camp yang hangat di kaki gunung (Suhu $T_{2}$ ). Jarak vertikal antara mereka adalah L. Pendaki tersebut membunyikan peluit darurat. Suara peluit merambat turun ke kaki gunung dan mengenai sebuah dinding tebing di Base camp. Karena perbedaan ketinggian, suhu udara menurun secara linear dari Base Camp ke Puncak. Jika diasumsikan kecepatan bunyi bergantung pada suhu dengan persamaan $v=\\alpha\\sqrt{T},$ di mana $\\alpha$ adalah suatu konstanta. Tentukan waktu total ($t_{total}$) yang dibutuhkan sejak pendaki berteriak hingga ia mendengar gemanya sendiri?",
                answerOptions: [
                    { answerText: "$\\frac{4l}{\\alpha (\\sqrt{T_1} + \\sqrt{T_2})}$", isCorrect: true },
                    { answerText: "$\\frac{6l}{\\alpha (\\sqrt{T_1} + \\sqrt{T_2})}$", isCorrect: false },
                    { answerText: "$\\frac{4l}{\\alpha (T_1 + T_2)}$", isCorrect: false },
                    { answerText: "$\\frac{6l}{\\alpha (T_1 + T_2)}$", isCorrect: false },
                    { answerText: "$\\frac{8l}{\\alpha (\\sqrt{T_1} + \\sqrt{T_2})}$", isCorrect: false }
                ]
            },
            {
                questionText: "Di kedalaman laut di Samudra selatan, secara tidak sengaja kapal selam \"Leviathan\"(A.S) dan kapal selam \"Minerve\" (Prancis) berpapasan. Minerve bergerak ke kanan dengan kecepatan $60~km/jam$ dan Leviathan bergerak ke kiri dengan kecepatan $120~km/jam$. Minerve mengirimkan sinyal sonar (gelombang suara dalam air) dengan frekuensi $10^{3}Hz.$ Gelombang sonar tersebut bergerak dengan kecepatan $6060~km/jam$ Berturut-turut tentukanlah frekuensi sinyal yang terdeteksi oleh Leviathan dan frekuensi yang terdeteksi oleh Minerve pada sinyal yang dipantulkan kembali kepadanya oleh Leviathan.",
                questionPhoto: "/competitions/exam/KodeB/Fisika/13.jpeg",
                answerOptions: [
                    { answerText: "1015 Hz dan 1051 Hz", isCorrect: false },
                    { answerText: "1030 Hz dan 1051 Hz", isCorrect: false },
                    { answerText: "1015 Hz dan 1061 Hz", isCorrect: false },
                    { answerText: "1030 Hz dan 1061 Hz", isCorrect: true },
                    { answerText: "1015 Hz dan 1030 Hz", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah gitar dipetik sehingga pada salah satu senarnya terdapat dua buah gelombang yang saling berlawanan arah dengan persamaan: $y_{1}(x,t)=(6~mm)\\sin(7\\pi x-700\\pi t)$ $y_{2}(x,t)=(6~mm)\\sin(7\\pi x+700\\pi t+\\frac{\\pi}{3})$ Dengan x dalam meter dan t dalam detik. Kedua gelombang tersebut berinterferensi membentuk gelombang berdiri. Jika sebuah titik antinode berada di titik A, tentukan jarak yang ditempuh masing-masing gelombang berjalan pada senar selama titik A bergerak dari simpangan maksimum atas menuju posisi keseimbangan untuk pertama kali",
                answerOptions: [
                    { answerText: "$\\frac{1}{6}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{7}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{12}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{14}m$", isCorrect: true },
                    { answerText: "$\\frac{1}{15}m$", isCorrect: false }
                ]
            },
            {
                questionText: "Terdapat dua ranting kayu yang mengambang di kolam Curug Biru dan terpisah sejauh 70 cm. Keduanya naik-turun bersamaan dengan frekuensi 2 getaran per detik. Salah satu ranting berada pada puncak gelombang (titik C) dan yang lain berada pada lembah (titik D). Di antara C dan D terdapat 3 bukit gelombang lengkap. Berapakah cepat rambat gelombang pada permukaan kolam tersebut? (Asumsi debit air terjun konstan.)",
                answerOptions: [
                    { answerText: "0,20 m/s", isCorrect: false },
                    { answerText: "0,28 m/s", isCorrect: false },
                    { answerText: "0,35 m/s", isCorrect: false },
                    { answerText: "0,40 m/s", isCorrect: true },
                    { answerText: "0,70 m/s", isCorrect: false }
                ]
            },
            {
                questionText: "Mobil-mobil bergerak mengelilingi sebuah bundaran lalu lintas yang berbentuk elips dengan $a=20$ m dan $b=100$ m. Jika mobil bergerak dengan kecepatan konstan sebesar 72~km/jam.Jika lintasan dinyatakan sebagai $y=f(x)$ maka jari-jari kelengkungan $\\rho$ pada setiap titik di sepanjang lintasan dapat ditentukan dari persamaan: $\\rho=\\frac{[1+(\\frac{dy}{dx})^{2}]^{\\frac{3}{2}}}{|\\frac{d^{2}y}{dx^{2}}|}$ tentukan percepatan maksimum yang dialami oleh penumpang!",
                questionPhoto: "/competitions/exam/KodeB/Fisika/16.png",
                answerOptions: [
                    { answerText: "$20~m/s^{2}$", isCorrect: false },
                    { answerText: "$40~m/s^{2}$", isCorrect: false },
                    { answerText: "$60~{m/s}^{2}$", isCorrect: false },
                    { answerText: "$80~{m/s}^{2}$", isCorrect: false },
                    { answerText: "$100~m/s^{2}$", isCorrect: true }
                ]
            }
        ]
    },
    2: {
        subject: "MATHEMATICS",
        questions: [
            {
                "questionText": "Jika $f^{-1}(x)=\\frac{x-2}{x+d}$ untuk suatu $d\\in\\mathbb{R}$ dan $f(1)=4$, maka nilai d adalah...",
                "answerOptions": [
                    { "answerText": "-3", "isCorrect": false },
                    { "answerText": "-2", "isCorrect": true },
                    { "answerText": "-3/2", "isCorrect": false },
                    { "answerText": "-1", "isCorrect": false },
                    { "answerText": "1/2", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diketahui grafik berikut menunjukan fungsi $f(x)=\\frac{1}{6}x^{3}-2x+1$. Garis singgung grafik ini pada $x=1$ memotong grafik pada suatu titik lain (A, B). Tentukan nilai A + B!",
                "questionPhoto": "/competitions/exam/MatB/no 2.png",
                "answerOptions": [
                    { "answerText": "-1", "isCorrect": false },
                    { "answerText": "-2/3", "isCorrect": true },
                    { "answerText": "-1/3", "isCorrect": false },
                    { "answerText": "0", "isCorrect": false },
                    { "answerText": "1/3", "isCorrect": false }
                ]
            },
            {
                "questionText": "Perhatikan data berikut, di mana x,y adalah bilangan yang tidak diketahui: 3, 6, 7, 9, 11, x, y. Diketahui bahwa median data ini adalah 7, dan jangkauannya adalah 9. Maka, mean terbesar yang mungkin adalah...",
                "answerOptions": [
                    { "answerText": "55/7", "isCorrect": true },
                    { "answerText": "8", "isCorrect": false },
                    { "answerText": "59/7", "isCorrect": false },
                    { "answerText": "61/7", "isCorrect": false },
                    { "answerText": "9", "isCorrect": false }
                ]
            },
            {
                "questionText": "Suatu kantong berisi 4 bola merah, 3 bola biru, dan 3 bola hijau. Isao mengambil 4 bola secara acak, dan ia menyatakan bahwa $setidaknya$ $satu$ bola berwarna merah. Berapa peluang Isao tidak mengambil bola biru?",
                "answerOptions": [
                    { "answerText": "5/18", "isCorrect": false },
                    { "answerText": "7/18", "isCorrect": false },
                    { "answerText": "4/9", "isCorrect": true },
                    { "answerText": "2/9", "isCorrect": false },
                    { "answerText": "1/3", "isCorrect": false }
                ]
            },
            {
                "questionText": "Sisa dari $4^{2026}-7^{2026}$ saat dibagi 9 adalah...",
                "answerOptions": [
                    { "answerText": "0", "isCorrect": false },
                    { "answerText": "3", "isCorrect": false },
                    { "answerText": "5", "isCorrect": false },
                    { "answerText": "6", "isCorrect": true },
                    { "answerText": "8", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan 2 buah bilangan bulat positif yakni m dan 48. Jika diketahui FPB dan KPK nya berturut-turut 12 dan 240, maka nilai m adalah...",
                "answerOptions": [
                    { "answerText": "48", "isCorrect": false },
                    { "answerText": "60", "isCorrect": true },
                    { "answerText": "72", "isCorrect": false },
                    { "answerText": "80", "isCorrect": false },
                    { "answerText": "120", "isCorrect": false }
                ]
            },
            {
                "questionText": "Jika diketahui $m_{1}=1$, $m_{2}=5$ dan $m_{k}=5m_{k-1}-6m_{k-2}$, maka nilai $m_{2025}$ adalah...",
                "answerOptions": [
                    { "answerText": "$3^{2025}-2^{2025}$", "isCorrect": true },
                    { "answerText": "$3^{2026}-2^{2026}$", "isCorrect": false },
                    { "answerText": "$3^{2027}-2^{2027}$", "isCorrect": false },
                    { "answerText": "$3^{2026}-2^{2025}$", "isCorrect": false },
                    { "answerText": "$3^{2027}-2^{2026}$", "isCorrect": false }
                ]
            },
            {
                "questionText": "Misalkan Kinx diberikan pernyataan: \"... jika dan hanya jika $A \\cap B = \\emptyset$\". Manakah pernyataan yang harus diisi Kinx pada bagian yang kosong?",
                "answerOptions": [
                    { "answerText": "A ⊆ B", "isCorrect": false },
                    { "answerText": "B ⊆ A", "isCorrect": false },
                    { "answerText": "A ⊆ Bᶜ", "isCorrect": true },
                    { "answerText": "Aᶜ ⊆ B", "isCorrect": false },
                    { "answerText": "A = Bᶜ", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan bilangan x bilangan real yang memenuhi $4x^{2}+2\\{x\\}=8$. Bilangan x yang memenuhi dapat dinyatakan dalam bentuk paling sederhana $\\frac {a+√b}{c}$. Tentukan nilai dari a+b+c. Note: {x} = bilangan desimal dari x, contoh: {1.1} = 0.1, {-1.1} = 0.9",
                "answerOptions": [
                    { "answerText": "44", "isCorrect": true },
                    { "answerText": "45", "isCorrect": false },
                    { "answerText": "46", "isCorrect": false },
                    { "answerText": "47", "isCorrect": false },
                    { "answerText": "48", "isCorrect": false }
                ]
            },
            {
                "questionText": "Tentukan banyaknya pasangan (a, b) yang memenuhi $FPB(a,b) = 2026!$, dan $KPK(a,b) = 2027!$ dan a ≤ b.",
                "answerOptions": [
                    { "answerText": "1", "isCorrect": true },
                    { "answerText": "2", "isCorrect": false },
                    { "answerText": "3", "isCorrect": false },
                    { "answerText": "4", "isCorrect": false },
                    { "answerText": "5", "isCorrect": false }
                ]
            },
            {
                "questionText": "Banyaknya cara menaruh 8 benteng pada papan catur 9x9 sehingga tidak ada benteng yang berada pada kolom atau baris yang sama",
                "answerOptions": [
                    { "answerText": "8!", "isCorrect": false },
                    { "answerText": "9! - 8!", "isCorrect": false },
                    { "answerText": "9!", "isCorrect": false },
                    { "answerText": "10! - 9!", "isCorrect": true },
                    { "answerText": "10!", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan segienam ABCDEF beraturan dengan panjang sisi 3 dan titik potong garis AC dan BD adalah P. Tentukan panjang $PE^{2}$",
                "answerOptions": [
                    { "answerText": "21", "isCorrect": true },
                    { "answerText": "20", "isCorrect": false },
                    { "answerText": "19", "isCorrect": false },
                    { "answerText": "18", "isCorrect": false },
                    { "answerText": "17", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan bidang $2025x+45y-2025z=135$ dan $90x+2y-90z=2025$. Jarak terpendek di antara 2 bidang tersebut dapat dinyatakan dalam bentuk paling sederhana $\\frac {a}{b√c}$. Tentukan nilai a+b+c",
                "answerOptions": [
                    { "answerText": "6076", "isCorrect": false },
                    { "answerText": "6075", "isCorrect": false },
                    { "answerText": "6074", "isCorrect": false },
                    { "answerText": "6073", "isCorrect": false },
                    { "answerText": "6072", "isCorrect": true }
                ]
            },
            {
                "questionText": "Dalam suatu perlombaan terdapat 25 soal. Sistem penilaian yang digunakan adalah sebagai berikut: Jawaban benar diberi skor +4, jawaban salah diberi skor -1, dan jawaban tidak diisi diberi skor 0. Perlombaan tersebut diikuti oleh 125 peserta. Setelah seluruh lembar jawaban diperiksa, diperoleh informasi bahwa rata-rata skor peserta adalah 25 dan median skor peserta adalah 10. Tentukan banyak maksimum peserta yang mungkin memperoleh skor tertinggi pada perlombaan tersebut",
                "answerOptions": [
                    { "answerText": "51", "isCorrect": false },
                    { "answerText": "48", "isCorrect": false },
                    { "answerText": "46", "isCorrect": false },
                    { "answerText": "44", "isCorrect": true },
                    { "answerText": "41", "isCorrect": false }
                ]
            },
            {
                "questionText": "Diberikan suatu barisan $S_{n}$ yang didefinisikan secara rekursif sebagai berikut: $S_{0}=7$ dan untuk setiap bilangan bulat n ≥ 1, $S_{n}-S_{n-1}=\\frac{30\\times(2^{n}+1)}{6^{n-1}\\times3}$. Tentukan nilai $\\lim_{n \\to\\infty} S_n$",
                "answerOptions": [
                    { "answerText": "100", "isCorrect": false },
                    { "answerText": "81", "isCorrect": false },
                    { "answerText": "64", "isCorrect": false },
                    { "answerText": "49", "isCorrect": true },
                    { "answerText": "36", "isCorrect": false }
                ]
            }
        ]
    },
        3: {
        subject: "ESSAY",
        questions: [
            {
                questionText:
                    "Sebuah silinder berdinding tipis dengan massa $M$ dan permukaan dalam yang cukup kasar berjari-jari $R$ dapat berotasi pada sumbu pusat horizontal tetapnya, $OZ$. Sumbu $Z$ tegak lurus dan mengarah keluar dari halaman (bidang gambar).\nSebuah silinder pejal homogen lain yang lebih kecil dengan massa $m$ dan jari-jari $r$ menggelinding tanpa slip pada permukaan dalam $M$ pada sumbu pusatnya sendiri yang sejajar dengan $OZ$. Sistem dipengaruhi oleh percepatan gravitasi sebesar $g$ ke bawah. Dengan cara $Newtonian$, tentukan:\na). Berapakah periode osilasi amplitudo kecil pada sistem jika:\n1. $M > m$ (10 poin)\n2. $M \\gg m$ (2 poin)\nb). Jelaskan bagaimana ekuivalensi gerakan sistemnya secara fisis pada kasus $M \\gg m$ (3 poin)",
                    questionPhoto: "/competitions/exam/essay.png",
            },
        ],
    },
};

export const sessionsDataC = {
    1: {
        subject: "PHYSICS",
        questions: [
            {
                questionText: "Thifal adalah mahasiswa Program Studi Teknik Mesin ITB yang mengikuti sebuah Unit Kegiatan Mahasiswa yang berfokus pada pengembangan game digital. Ia tertarik untuk membuat permainan yang memenuhi hukum Fisika (khususnya Mekanika) di mana ia merancang sebuah sistem permainan yang melibatkan objek tank dan mobil penyusup. Tank tersebut menembakkan rudal dengan sudut elevasi $\\beta$ ke arah mobil penyusup yang berada di bukit yang dimodelkan sebagai suatu bidang miring sebagaimana tertera pada gambar di atas. Mula-mula, mobil tersebut tidak memiliki kecepatan awal dan berakselerasi konstan sebesar 5Z (lima kali Z) menuruni bukit. Tentukan besar kecepatan awal rudal yang harus Satrio input ke sistem permainan agar rudal tersebut tepat mengenai mobil penyusup jika mobil tersebut tertembak di bukit dan tank selalu diam. Asumsikan ketinggian ujung moncong tembakan sama dengan ketinggian mobil sesaat setelah tertembak relatif terhadap tanah horizontal. Gesekan udara diabaikan.",
                questionPhoto: "/competitions/exam/KodeC/Fisika/1.png",
                answerOptions: [
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+H\\sqrt{3})}{\\sin2\\beta+\\frac{5Z\\sin^{2}\\beta}{g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+H\\sqrt{3})}{\\sin2\\beta-\\frac{(5\\sqrt{3})Z\\sin^{2}\\beta}{g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+\\frac{1}{3}H\\sqrt{3})}{\\sin2\\beta+\\frac{(5\\sqrt{3})Z\\sin^{2}\\beta}{g}}}$", isCorrect: false },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+H\\sqrt{3})}{\\sin2\\beta+\\frac{(5\\sqrt{3})Z\\sin^{2}\\beta}{g}}}$", isCorrect: true },
                    { answerText: "$v_{0}=\\sqrt{\\frac{g(L+H\\sqrt{3})}{\\sin2\\beta+\\frac{(10\\sqrt{3})Z\\sin^{2}\\beta}{g}}}$", isCorrect: false }
                ]
            },
            {
                questionText: "Diberikan bidang miring dengan sudut kemiringan serta balok yang memiliki massa berturut-turut adalah $m_{1}=2$ kg dan $m_{2}=5$ kg. Bidang miring tersebut berada di atas permukaan lantai yang kasar dengan suatu koefisien gesek kinetis $\\mu_{k}=0,5$ dan balok berada di atas bidang miring di mana permukaan antara balok dengan bidang miring adalah licin. Bidang miring ditarik oleh gaya konstan F sebesar 15 N. Mula-mula, bidang miring maupun balok berada pada keadaan diam serta balok berada di ujung atas bidang miring dengan ketinggian $H=5,5$ m. Tetapkan arah percepatan gravitasi $g=10~m/s^{2}$ ke bawah serta asumsikan sistem pasti bergerak, tentukan waktu t yang dibutuhkan balok agar sampai di dasar bidang miring. Diketahui juga $\\sin\\theta=0,8$ dan $\\cos\\theta=0,6$",
                questionPhoto: "/competitions/exam/KodeC/Fisika/2.png",
                answerOptions: [
                    { answerText: "$\\sqrt{6}$ detik", isCorrect: false },
                    { answerText: "$\\frac{1}{2}\\sqrt{6}$ detik", isCorrect: false },
                    { answerText: "$\\frac{1}{2}\\sqrt{3}$ detik", isCorrect: false },
                    { answerText: "Solusi Bukan Bilangan Real", isCorrect: false },
                    { answerText: "$\\frac{1}{3}\\sqrt{6}$ detik", isCorrect: true }
                ]
            },
            {
                questionText: "Sebuah selang menyemprotkan air pada titik A dengan kecepatan 20$m/s$ dari nozzle dengan diameter d = 25 $mm$.Air kemudian dimuncratkan keluar dari vane dengan kecepatan yang sama dengan kecepatan air tepat ketika kontak dengan vane tegak lurus terhadap sumbu-x. Jika massa jenis air yaitu  $1000kg/m^3$ dan $F_x$ dan $F_y$ adalah gaya reaksi vane,  hitunglah nilai $F_x$ dan $F_y$ jika vane bergerak ke kiri dengan kecepatan sesuai gambar! anggap laju aliran massa ($\\frac{dm}{dt}$) selalu sama di sepanjang lengkungan vane, abaikan gesekan air dan gesekan vane dengan tanah, semua kecepatan konstan, dan perhatikan sumbu koordinat pada gambar!",
                questionPhoto: "/competitions/exam/KodeC/Fisika/3.jpeg",
                answerOptions: [
                    { answerText: "$F_x$= -93,75$\\pi N$ & $F_y$= 93,75$\\pi N$", isCorrect: false },
                    { answerText: "$F_x$= 93,75$\\pi N$ & $F_y$= 93,75$\\pi N$", isCorrect: true },
                    { answerText: "$F_x$= -31,25$\\pi N$ & $F_y$= 31,25$\\pi N$", isCorrect: false },
                    { answerText: "$F_x$= 31,25$\\pi N$ & $F_y$= 31,25$\\pi N$", isCorrect: false },
                    { answerText: "$F_x$= -93,75$\\pi N$ & $F_y$= 31,25$\\pi N$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah wadah diisi air dengan massa jenis $1000kg/m^{3}$ sampai ketinggian 3 meter. Wadah tersebut tertutupi oleh 3 dinding diam, lantai dan satu dinding yang dapat dibuka (secara digulung dari bawah ke atas seperti di gambar) dengan tinggi 3 meter dan lebar 5 meter seperti di gambar. Agar pintu wadah tersebut tetap tertutup, diberikan gaya F di ujung bawah pintu tersebut untuk menahannya. Besar gaya F yang dibutuhkan adalah: (percepatan gravitasi adalah $10m/s^{2}$)",
                questionPhoto: "/competitions/exam/KodeC/Fisika/4.png",
                answerOptions: [
                    { answerText: "90.000 N", isCorrect: false },
                    { answerText: "120.000 N", isCorrect: false },
                    { answerText: "150.000 N", isCorrect: true },
                    { answerText: "200.000 N", isCorrect: false },
                    { answerText: "250.000 N", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah pipa U dengan luas penampang yang sama di tiap ujung pipa berotasi dengan salah satu tabung sebagai poros kelajuan sudut putar ($\\omega=3~rad/s$) menyebabkan kedua permukaan cairan berselisih H meter. Jika panjang pipa U mendatar adalah 2 meter, maka tinggi H adalah... ($g=10m/s^{2}$)",
                questionPhoto: "/competitions/exam/KodeC/Fisika/5.png",
                answerOptions: [
                    { answerText: "1,2 meter", isCorrect: false },
                    { answerText: "1,8 meter", isCorrect: true },
                    { answerText: "2,4 meter", isCorrect: false },
                    { answerText: "3,6 meter", isCorrect: false },
                    { answerText: "4,2 meter", isCorrect: false }
                ]
            },
            {
                questionText: "Hitunglah Vb! (asumsikan kecepatan gravitasi $g=9,8~m/s^{2}$) ",
                questionPhoto: "/competitions/exam/KodeC/Fisika/6.png",
                answerOptions: [
                    { answerText: "$9,4~m/s$", isCorrect: false },
                    { answerText: "$10,3~m/s$", isCorrect: true },
                    { answerText: "$8,9~m/s$", isCorrect: false },
                    { answerText: "$11,8~m/s$", isCorrect: false },
                    { answerText: "$12,1~m/s$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah bola dilemparkan ke lantai kasar dengan sudut $\\theta=45$ derajat. Jika bolanya memantul di sudut $\\phi=30$ derajat, tentukan koefisien gesek kinetis antara bola dan lantai. Diketahui koefisien restitusi dari lantai tersebut adalah 0.5.",
                questionPhoto: "/competitions/exam/KodeC/Fisika/7.png",
                answerOptions: [
                    { answerText: "$\\frac{1}{2}$", isCorrect: false },
                    { answerText: "$\\frac{2-\\sqrt{3}}{3}$", isCorrect: true },
                    { answerText: "$\\frac{2+\\sqrt{3}}{3}$", isCorrect: false },
                    { answerText: "$\\frac{2-\\sqrt{3}}{2}$", isCorrect: false },
                    { answerText: "$\\frac{2+\\sqrt{3}}{5}$", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah spool (seperti yoyo besar) memiliki massa sebesar M = 6.5$kg$, jari-jari luar R = 0.6$m$, dan jari-jari dalam r = 0.3$m$. Momen inersia terhadap pusat massanya adalah $I=\\frac{1}{2}M(R^{2}+r^{2}).$ Spool ini berada di atas lantai kasar horizontal sehingga dapat menggelinding tanpa slip. Sebuah pegas dengan konstanta k (169 $N/m$) diikatkan pada pegas yang melilit hub dalam (jari-jari r). Ujung tali ditarik horizontal menjauhi dinding. Tentukan frekuensi angular dari sistem tersebut.",
                answerOptions: [
                    { answerText: "$\\omega= 4 rad/s$", isCorrect: false },
                    { answerText: "$\\omega= 6 rad/s$", isCorrect: true },
                    { answerText: "$\\omega= 8 rad/s$", isCorrect: false },
                    { answerText: "$\\omega= 10 rad/s$", isCorrect: false },
                    { answerText: "$\\omega= 12 rad/s$", isCorrect: false }
                ]
            },
            {
                questionText: "Silinder halus C bermassa 5 kg memiliki pasak P yang bergerak melewati celah pada batang OA. Jarak vertikal titik O dan C adalah 1m. Jika lengan tersebut dipaksa berputar pada bidang vertikal dengan laju konstan tentukan $\\frac{d\\theta}{dt}=1~rad/s$ gaya yang diberikan lengan tersebut saat $\\theta=30^{\\circ}$ (Gunakan $\\sqrt{3}=1,71)$",
                questionPhoto: "/competitions/exam/KodeC/Fisika/10.png",
                answerOptions: [
                    { answerText: "56 N", isCorrect: false },
                    { answerText: "138,57 N", isCorrect: true },
                    { answerText: "160,52 N", isCorrect: false },
                    { answerText: "173,75 N", isCorrect: false },
                    { answerText: "150,5 N", isCorrect: false }
                ]
            },
            {
                questionText: "Tinjau sebuah silinder panjang dan narrow dengan luas penampang A yang 	diisi dengan cairan kompresibel hingga ketinggian h. Massa jenis cairan tersebut  merupakan fungsi dari tekanan $P(z)$ yang dinyatakan sebagai:  $\\rho(z)=\\rho_{o}(1+\\frac{P(z)}{P_{o}})$ di mana $P_{o}$ dan $\\rho_{o}$  adalah konstanta. Percepatan gravitasi adalah $g$. Kedalaman z diukur dari permukaan bebas cairan, di mana tekanannya sama dengan tekanan atmosfer ($P_{atm}$). Tentukan massa total ($M$) cairan dalam silinder hingga ketinggian $h$!",
                questionPhoto: "/competitions/exam/KodeC/Fisika/11.png",
                answerOptions: [
                    { answerText: "$M = \\frac{A(P_{\\text{atm}} + P_0)}{g} \\left[ e^{\\left( \\frac{\\rho_0 g h}{2P_0} \\right)} + 1 \\right]$", isCorrect: false },
                    { answerText: "$M = \\frac{A(P_{\\text{atm}} + P_0)}{g} \\left[ e^{\\left( \\frac{\\rho_0 g h}{2P_0} \\right)} - 1 \\right]$", isCorrect: true },
                    { answerText: "$M = \\frac{A(P_{\\text{atm}} + P_0)}{2g} \\left[ e^{\\left( \\frac{\\rho_0 g h}{2P_0} \\right)} - 1 \\right]$", isCorrect: false },
                    { answerText: "$M = \\frac{A(P_{\\text{atm}} + P_0)}{g} \\left[ e^{\\left( \\frac{\\rho_0 g h}{P_0} \\right)} - 1 \\right]$", isCorrect: false },
                    { answerText: "$M = \\frac{A(P_{\\text{atm}} + P_0)}{2g} \\left[ e^{\\left( \\frac{\\rho_0 g h}{2P_0} \\right)} + 1 \\right]$", isCorrect: false }
                ]
            },
            {
                questionText: "Seorang pendaki terjebak di Puncak Gunung Semeru yang dingin (Suhu $T_{1}$, sementara tim penyelamat berada di Base Camp yang hangat di kaki gunung (Suhu $T_{2}$ ). Jarak vertikal antara mereka adalah L. Pendaki tersebut membunyikan peluit darurat. Karena perbedaan ketinggian, suhu udara menurun secara linear dari Base Camp ke Puncak. Jika diasumsikan kecepatan bunyi bergantung pada suhu dengan persamaan $v=\\alpha\\sqrt{T},$ di mana $\\alpha$ adalah suatu konstanta. Tentukan kecepatan rambat bunyi efektif rata rata sepanjang lintasan?",
                answerOptions: [
                    { answerText: "$v_{ef} = \\frac{\\alpha}{2} (\\sqrt{T_1} + \\sqrt{T_2})$", isCorrect: true },
                    { answerText: "$v_{ef} = \\frac{\\alpha}{2} (T_1 + T_2)$", isCorrect: false },
                    { answerText: "$v_{ef} = \\frac{\\alpha}{2} (\\sqrt{T_1} - \\sqrt{T_2})$", isCorrect: false },
                    { answerText: "$v_{ef} = \\alpha (\\sqrt{T_1} + \\sqrt{T_2})$", isCorrect: false },
                    { answerText: "$v_{ef} = \\alpha (T_1 - T_2)$", isCorrect: false }
                ]
            },
            {
                questionText: "Di kedalaman laut di Samudra selatan, secara tidak sengaja kapal selam \"Leviathan\"(A.S) dan kapal selam \"Minerve\" (Prancis) berpapasan. Minerve bergerak ke kanan dengan kecepatan $40~km/jam$ dan Leviathan bergerak ke kiri dengan kecepatan $80~km/jam$. Minerve mengirimkan sinyal sonar (gelombang suara dalam air) dengan frekuensi $10^{3}Hz.$ Gelombang sonar tersebut bergerak dengan kecepatan $4040~km/jam$ Berturut-turut tentukanlah frekuensi sinyal yang terdeteksi oleh Leviathan dan frekuensi yang terdeteksi oleh Minerve pada sinyal yang dipantulkan kembali kepadanya oleh Leviathan.",
                questionPhoto: "/competitions/exam/KodeC/Fisika/13.jpeg",
                answerOptions: [
                    { answerText: "1015 Hz dan 1051 Hz", isCorrect: false },
                    { answerText: "1030 Hz dan 1051 Hz", isCorrect: false },
                    { answerText: "1015 Hz dan 1061 Hz", isCorrect: false },
                    { answerText: "1030 Hz dan 1061 Hz", isCorrect: true },
                    { answerText: "1015 Hz dan 1030 Hz", isCorrect: false }
                ]
            },
            {
                questionText: "Sebuah gitar dipetik sehingga pada salah satu senarnya terdapat dua buah gelombang yang saling berlawanan arah dengan persamaan: $y_{1}(x,t)=(9~mm)\\sin(6\\pi x-600\\pi t)$ $y_{2}(x,t)=(9~mm)\\sin(6\\pi x+600\\pi t+\\frac{\\pi}{4})$ Dengan x dalam meter dan t dalam detik. Kedua gelombang tersebut berinterferensi membentuk gelombang berdiri. Jika sebuah titik antinode berada di titik A, tentukan jarak yang ditempuh masing-masing gelombang berjalan pada senar selama titik A bergerak dari simpangan maksimum atas menuju posisi keseimbangan untuk pertama kali",
                answerOptions: [
                    { answerText: "$\\frac{1}{6}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{9}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{12}m$", isCorrect: true },
                    { answerText: "$\\frac{1}{15}m$", isCorrect: false },
                    { answerText: "$\\frac{1}{18}m$", isCorrect: false }
                ]
            },
            {
                questionText: "Terdapat dua ranting kayu yang mengambang di kolam Curug Biru dan terpisah sejauh 80 cm. Keduanya naik-turun bersamaan dengan frekuensi 2,5 getaran per detik. Salah satu ranting berada pada puncak gelombang (titik C) dan yang lain berada pada lembah (titik D). Di antara C dan D terdapat 2 bukit gelombang lengkap. Berapakah cepat rambat gelombang pada permukaan kolam tersebut? (Asumsi debit air terjun konstan.)",
                answerOptions: [
                    { answerText: "0,25 m/s", isCorrect: false },
                    { answerText: "0,40 m/s", isCorrect: false },
                    { answerText: "0,50 m/s", isCorrect: false },
                    { answerText: "0,60 m/s", isCorrect: false },
                    { answerText: "0,80 m/s", isCorrect: true }
                ]
            },
            {
                questionText: "Mobil-mobil bergerak mengelilingi sebuah bundaran lalu lintas yang berbentuk elips dengan $a=5$ m dan $b=10$ m. Jika mobil bergerak dengan kecepatan konstan sebesar 36~km/jam.Jika lintasan dinyatakan sebagai $y=f(x)$ maka jari-jari kelengkungan $\\rho$ pada setiap titik di sepanjang lintasan dapat ditentukan dari persamaan: $\\rho=\\frac{[1+(\\frac{dy}{dx})^{2}]^{\\frac{3}{2}}}{|\\frac{d^{2}y}{dx^{2}}|}$ tentukan percepatan maksimum yang dialami oleh penumpang!",
                questionPhoto: "/competitions/exam/KodeC/Fisika/16.png",
                answerOptions: [
                    { answerText: "$10~m/s^{2}$", isCorrect: false },
                    { answerText: "$20~m/s^{2}$", isCorrect: false },
                    { answerText: "$30~{m/s}^{2}$", isCorrect: false },
                    { answerText: "$40~{m/s}^{2}$", isCorrect: true },
                    { answerText: "$50~m/s^{2}$", isCorrect: false }
                ]
            }
        ]
    },
    2: {
        subject: "MATHEMATICS",
        questions: [
            {
                questionText:
                    "Jika $f^{-1}(x) = \\frac{2x + 1}{x + d}$ untuk suatu $d \\in \\mathbb{R}$ dan $f(3) = 5$, maka nilai $d$ adalah...",
                answerOptions: [
                    { answerText: "-$\\frac{7}{2}$", isCorrect: false },
                    { answerText: "-3", isCorrect: false },
                    { answerText: "-$\\frac{5}{2}$", isCorrect: true },
                    { answerText: "-2", isCorrect: false },
                    { answerText: "-1", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Diketahui grafik berikut menunjukan fungsi $f(x) = \\frac{1}{6}x^3 − x + 1$. Garis singgung grafik ini pada $x = −1$ memotong grafik pada suatu titik lain (A,B).",
                questionPhoto: "/competitions/exam/Mat/C/C2.png",
                answerOptions: [
                    { answerText: "-2", isCorrect: false },
                    { answerText: "-1", isCorrect: false },
                    { answerText: "$-\\frac{2}{3}$", isCorrect: false },
                    { answerText: "0", isCorrect: false },
                    { answerText: "$-\\frac{1}{3}$", isCorrect: true },
                ],
            },
            {
                questionText:
                    "Perhatikan data berikut, di mana x, y adalah bilangan yang tidak diketahui :",
                questionPhoto: "/competitions/exam/Mat/C/C4.png",
                answerOptions: [
                    { answerText: "$\\frac{50}{7}$", isCorrect: false },
                    { answerText: "$\\frac{53}{7}$", isCorrect: true },
                    { answerText: "$\\frac{56}{7}$", isCorrect: false },
                    { answerText: "$9$", isCorrect: false },
                    { answerText: "$\\frac{65}{7}$", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Suatu kantong berisi 2 bola merah, 4 bola biru, dan 4 bola kuning. Arie mengambil 3 bola secara acak, dan ia menyatakan bahwa setidaknya satu bola berwarna merah. Berapa peluang Arie tidak mengambil bola biru?",
                answerOptions: [
                    { answerText: "$\\frac{1}{6}$", isCorrect: false },
                    { answerText: "$\\frac{1}{5}$", isCorrect: false },
                    { answerText: "$\\frac{1}{4}$", isCorrect: true },
                    { answerText: "$\\frac{1}{3}$", isCorrect: false },
                    { answerText: "$\\frac{2}{5}$", isCorrect: false },
                ],
            },
            {
                questionText: "Sisa dari $5^{2026}$- $3^{2026}$ saat dibagi 7 adalah...",
                answerOptions: [
                    { answerText: "1", isCorrect: false },
                    { answerText: "3", isCorrect: false },
                    { answerText: "4", isCorrect: false },
                    { answerText: "5", isCorrect: true },
                    { answerText: "6", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Diberikan 2 buah bilangan bulat positif yakni m dan 60. Jika diketahui FPB dan KPK nya berturut-turut 15 dan 180, maka nilai m adalah . . .",
                answerOptions: [
                    { answerText: "30", isCorrect: false },
                    { answerText: "45", isCorrect: true },
                    { answerText: "60", isCorrect: false },
                    { answerText: "75", isCorrect: false },
                    { answerText: "90", isCorrect: false },
                ],

            },
            {
                questionText:
                    "Jika diketahui $m_1 = 1$, $m_2 = 5$ dan $m_k = 5m_{k-1}$ $-$ $6m_{k-2}$, maka nilai $m_{2027}$ adalah...",
                answerOptions: [
                    { answerText: "$3^{2025} - 2^{2025}$", isCorrect: false },
                    { answerText: "$3^{2026} - 2^{2026}$", isCorrect: false },
                    { answerText: "$3^{2027} - 2^{2027}$", isCorrect: true },
                    { answerText: "$3^{2026} - 2^{2025}$", isCorrect: false },
                    { answerText: "$3^{2027} - 2^{2026}$", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Misalkan Kinx diberikan pernyataan $\\boxed{\\quad}$ jika dan hanya jika $A \\subseteq B$. Manakah pernyataan yang harus diisi Kinx di dalam kotak?",
                answerOptions: [
                    { answerText: "$A \\cap B = A$", isCorrect: true },
                    { answerText: "$B \\subseteq A$", isCorrect: false },
                    { answerText: "$C \\cup A = A$", isCorrect: false },
                    { answerText: "$A^C = B$", isCorrect: false },
                    { answerText: "$B^C = A$", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Diberikan bilangan $x$ bilangan real yang memenuhi $16x^2 + 4\\{x\\} = 16$. Bilangan $x$ yang memenuhi dapat dinyatakan dalam bentuk paling sederhana $\\frac{a + \\sqrt{b}}{c}$. Tentukan nilai dari $a + b + c$. Note: $\\{x\\} = $ bilangan desimal dari $x$, contoh: $\\{1.1\\} = 0.1, \\{-1.1\\} = 0.9$",
                answerOptions: [
                    { answerText: "$68$", isCorrect: false },
                    { answerText: "$69$", isCorrect: false },
                    { answerText: "$70$", isCorrect: false },
                    { answerText: "$71$", isCorrect: false },
                    { answerText: "$72$", isCorrect: true },
                ],
            },
            {
                questionText:
                    "Tentukan banyaknya pasangan $(a,b)$ yang memenuhi $FPB(a,b) = 2022!$, dan $KPK(a,b) = 2023!$ dan $a \\le b$",
                answerOptions: [
                    { answerText: "$1$", isCorrect: false },
                    { answerText: "$2$", isCorrect: true },
                    { answerText: "$3$", isCorrect: false },
                    { answerText: "$5$", isCorrect: false },
                    { answerText: "$6$", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Banyaknya cara menaruh 6 benteng pada papan catur 7x7 sehingga tidak ada benteng yang berada pada kolom atau baris yang sama",
                answerOptions: [
                    { answerText: "$6!$", isCorrect: false },
                    { answerText: "$7!-6!$", isCorrect: false },
                    { answerText: "$7!$", isCorrect: false },
                    { answerText: "$8!-7!$", isCorrect: true },
                    { answerText: "$8!$", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Diberikan segienam $ABCDEF$ beraturan dengan panjang sisi 9 dan titik potong garis $AC$ dan $BD$ adalah $P$. tentukan panjang $PE^2$",
                answerOptions: [
                    { answerText: "187", isCorrect: false },
                    { answerText: "188", isCorrect: false },
                    { answerText: "189", isCorrect: true },
                    { answerText: "190", isCorrect: false },
                    { answerText: "191", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Diberikan bidang $2025x + 45y - 2025z = 45$ dan $90x + 2y - 90z = 2025$. jarak terpendek diantara 2 bidang tersebut dapat dinyatakan dalam bentuk paling sederhana $\\frac{a}{b\\sqrt{c}}$. tentukan nilai $a+b+c$",
                answerOptions: [
                    { answerText: "6076", isCorrect: true },
                    { answerText: "6075", isCorrect: false },
                    { answerText: "6074", isCorrect: false },
                    { answerText: "6073", isCorrect: false },
                    { answerText: "6072", isCorrect: false },
                ],
            },
            {
                questionText:
                    "Dalam suatu perlombaan terdapat 25 soal. Sistem penilaian yang digunakan adalah sebagai berikut :",
                questionPhoto: "/competitions/exam/Mat/C/C20.png",
                answerOptions: [
                    { answerText: "54", isCorrect: false },
                    { answerText: "53", isCorrect: false },
                    { answerText: "52", isCorrect: false },
                    { answerText: "51", isCorrect: false },
                    { answerText: "50", isCorrect: true },
                ],
            },
            {
                questionText:
                    "Diberikan suatu barisan $S_n$ yang didefinisikan secara rekursif sebagai berikut :",
                questionPhoto: "/competitions/exam/Mat/C/C21.png",
                answerOptions: [
                    { answerText: "100", isCorrect: true },
                    { answerText: "81", isCorrect: false },
                    { answerText: "64", isCorrect: false },
                    { answerText: "49", isCorrect: false },
                    { answerText: "36", isCorrect: false },
                ],
            },
        ],
    },
    3: {
        subject: "ESSAY",
        questions: [
            {
                questionText:
                    "Sebuah silinder berdinding tipis dengan massa $M$ dan permukaan dalam yang cukup kasar berjari-jari $R$ dapat berotasi pada sumbu pusat horizontal tetapnya, $OZ$. Sumbu $Z$ tegak lurus dan mengarah keluar dari halaman (bidang gambar).\nSebuah silinder pejal homogen lain yang lebih kecil dengan massa $m$ dan jari-jari $r$ menggelinding tanpa slip pada permukaan dalam $M$ pada sumbu pusatnya sendiri yang sejajar dengan $OZ$. Sistem dipengaruhi oleh percepatan gravitasi sebesar $g$ ke bawah. Dengan cara $Newtonian$, tentukan:\na). Berapakah periode osilasi amplitudo kecil pada sistem jika:\n1. $M > m$ (10 poin)\n2. $M \\gg m$ (2 poin)\nb). Jelaskan bagaimana ekuivalensi gerakan sistemnya secara fisis pada kasus $M \\gg m$ (3 poin)",
                    questionPhoto: "/competitions/exam/essay.png",
            },
        ],
    },
};

export const sessionsDataTechMeet = {
    1: {
        subject: "PHYSICS",
        questions: [
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
                questionText: "Sebuah kubus homogen bermassa 40 gram yang semula diam dimampatkan terhadap pegas dengan $k=100 N/m$ sejauh 20 cm sebelum meluncur dengan kecepatan konstan diatas permukaan yang licin hingga melewati seluncuran licin dengan arah $\\theta_1=30^\\circ$ terhadap sumbu-y positif (lihat gambar) mulai dari titik A dan mendarat di dasar pada titik B dengan arah $\\theta_2$ terhadap sumbu-y positif. Jika ketinggian titik A setara dengan titik awal pegas yaitu 2,2 m, tentukan perbandingan sisi (a:b:c) pada segitiga siku-siku yang terbentuk oleh sudut $\\theta_2$ (lihat gambar)! Anggap kubus sebagai partikel dan ambil $g=10 m/s2$.",
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
