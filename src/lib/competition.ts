import { getCompCaseDate, getSubmissionDeadline } from "./utils";

enum CompetitionName {
  BCC = "BCC",
  IPPC = "IPPC",
  PDC = "PDC",
  STEM = "STEM",
}

const startRegDate1 = new Date("2026-01-18T14:00:00");
const startRegDate2 = new Date("2026-01-25T00:00:00");
const startRegDate3 = new Date("2026-02-16T00:00:00");
const endRegDate1 = new Date("2026-01-24T23:59:59");
const endRegDate2 = new Date("2026-02-15T23:59:59");
const endRegDate3 = new Date("2026-02-22T23:59:59");

export const competitions: {
  title: string;
  logo: string;
  desc: string;
  regLink: string;
  abbreviation: CompetitionName;
  cover: string;
  isOpen?: boolean;
  prize1: string; // 1st Place
  prize2: string; // 2nd Place
  prize3: string; // 3rd Place
  prize4?: string;
  prize5?: string;
  reg1: string;
  reg2: string;
  reg3: string;
  startRegDate1: Date;
  startRegDate2: Date;
  startRegDate3: Date;
  endRegDate1: Date;
  endRegDate2: Date;
  endRegDate3: Date;
  fee1: number;
  fee2: number;
  guideBook: string;
  icon: string;
  uploadThingRoute: string;
  submissionDeadline: Date | null;
  submissionDetails?: string;
  submissionContext?: string;
  compOpenCase: Date | null;
  examOpen?: Date;
}[] = [
  {
    title: "Business Case Competition",
    logo: "/competitions/logo/bcc.png",
    desc: "Business Case Competition M-Fest 2026 challenges Indonesian undergraduate students to develop problem-solving and innovative thinking skills. The competition involves company collaborations to create case books for participants to analyze and provide strategic business solutions.",
    regLink: "https://www.google.com",
    abbreviation: CompetitionName.BCC,
    isOpen: true,
    cover: "/competition/bcc-cover.png",
    prize1: "Rp5.000.000 + Winner Board ",
    prize2: "Rp4.000.000 + Winner Board ",
    prize3: "Rp3.000.000 + Winner Board ",
    prize4: "Best Presentation: Rp500000 + Best Presentation Board",
    reg1: "18 January - 24 January 2026", // Early Bird
    reg2: "25 January - 15 February 2026", // Regular
    reg3: "16 Ferbuary - 22 February 2026", // Extended Regular
    startRegDate1,
    startRegDate2,
    startRegDate3,
    endRegDate1,
    endRegDate2,
    endRegDate3,
    fee1: 150001, // Early bird
    fee2: 200001, // Regular
    guideBook:
      "https://drive.google.com/drive/folders/1BWJJ8mOQbO8S1psZmvJ_00pAr6ejR1G-?usp=sharing",
    icon: "Zap",
    uploadThingRoute: "submitFileBCC",
    submissionDeadline: getSubmissionDeadline("BCC"),
    submissionContext: "Submit your paper before:",
    compOpenCase: getCompCaseDate("BCC"),
  },

  {
    title: "Innovative Poster and Paper Competition",
    logo: "/competitions/logo/ippc.png",
    desc: "Innovative Paper and Poster Competition M-Fest 2026 is a platform for Indonesian undergraduate students to develop clean energy solutions. The competition aims to generate creative ideas for reducing carbon emissions and accelerating Indonesia's clean energy transition through innovative waste energy utilization.",
    regLink: "https://www.google.com",
    abbreviation: CompetitionName.IPPC,
    cover: "/competition/paper-cover.png",
    reg1: "18 January - 24 January 2026", // Early Bird
    reg2: "25 January - 15 February 2026", // Regular
    reg3: "16 Ferbuary - 22 February 2026", // Extended Regular
    startRegDate1,
    startRegDate2,
    startRegDate3,
    endRegDate1,
    endRegDate2,
    endRegDate3,
    prize1: "Rp5.000.000",
    prize2: "Rp3.500.000",
    prize3: "Rp2.500.000",
    prize4: "Most Favorite Poster: Rp 1.000.000",
    fee1: 90001, // Early Bird
    fee2: 110001, // Regular
    guideBook:
      "https://drive.google.com/drive/folders/1Suy1QMroEjRlUzivl-gLiKBGDZ3oFBux?usp=sharing",
    isOpen: true,
    icon: "Cpu",
    uploadThingRoute: "submitFileIPPC",
    submissionDeadline: getSubmissionDeadline("IPPC"),
    submissionContext: "Submit Extended Abstract before:",
    compOpenCase: null,
  },
  {
    title: "Pipeline Design Competition",
    logo: "/competitions/logo/pdc.png",
    desc: "Pipeline Design Competition M-Fest 2026 is a platform for Indonesian undergraduate students to develop pipeline design expertise. The competition challenges participants to create economical and reliable pipeline solutions while considering safety and environmental sustainability in energy distribution.",
    regLink: "https://www.google.com",
    abbreviation: CompetitionName.PDC,
    cover: "/competition/pipeline-cover.png",
    prize1: "Rp5000000",
    prize2: "Rp3.500.000",
    prize3: "Rp2.500.000",
    prize4: "Rp1.000.000",
    prize5: "Rp500.000",
    reg1: "18 January - 24 January 2026", // Early Bird
    reg2: "25 January - 15 February 2026", // Regular
    reg3: "16 Ferbuary - 22 February 2026", // Extended Regular
    startRegDate1,
    startRegDate2,
    startRegDate3,
    endRegDate1,
    endRegDate2,
    endRegDate3,
    fee1: 200001, // Early Bird
    fee2: 250001, // Regular
    guideBook:
      "https://drive.google.com/drive/folders/17ADXN7Iom5nPJXJHEw2oQZvRRvf9q4fP?usp=sharing",
    isOpen: true,
    icon: "Lock",
    uploadThingRoute: "submitFilePDC",
    submissionDeadline: getSubmissionDeadline("PDC"),
    submissionContext: "Submit your work before:",
    compOpenCase: getCompCaseDate("PDC"),
  },
  {
    title: "Science, Technology, Engineering, and Mathematics",
    logo: "/competitions/logo/stem.png",
    desc: "STEM Competition M-Fest 2026 provides an inspiring platform for Indonesian high school students to enhance their Science, Technology, Engineering, and Mathematics skills. The competition encourages innovation and real contributions to sustainability in Indonesia while accelerating SDGs achievement through STEM-based solutions.",
    regLink: "https://www.google.com",
    abbreviation: CompetitionName.STEM,
    cover: "/competition/stem-cover.png",
    prize1: "Rp5.000.000 + E-certificate",
    prize2: "Rp4.000.000 + E-certificate",
    prize3: "Rp3.000.000 + E-certificate",
    reg1: "18 January - 24 January 2026", // Early Bird
    reg2: "25 January - 15 February 2026", // Regular
    reg3: "16 Ferbuary - 22 February 2026", // Extended Regular
    startRegDate1,
    startRegDate2,
    startRegDate3,
    endRegDate1,
    endRegDate2,
    endRegDate3,
    fee1: 120001, // Early Bird
    fee2: 180001, // Regular
    guideBook:
      "https://drive.google.com/drive/folders/1IfVYRpYq67Vk5Sgwnpvrr5eUKpKgNlng?usp=sharing",
    icon: "Sparkles",
    uploadThingRoute: "submitFileSTEM",
    submissionDeadline: null,
    compOpenCase: null,
    examOpen: getCompCaseDate("STEM") as Date,
  },
];
