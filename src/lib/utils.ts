import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { competitions } from "./competition";
import { CompetitionName } from "../../prisma/generated/prisma/enums";
import { isWithinInterval } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For testing date
// export const getCurrentDate = () => {
//     const now = new Date("2026-01-26T00:00:00");

//     return now;
// };

// Real date
export const getCurrentDate = () => {
  const now = new Date();

  return now;
};
const currentDate = getCurrentDate();

export function getCompCaseDate(comp: CompetitionName) {
  if (comp === "BCC") {
    return new Date("2026-01-23T00:00:00");
  } else if (comp === "IPPC") return null;
  else if (comp === "PDC") {
    new Date("2026-02-01T00:00:00");
  } else if (comp === "STEM") {
    new Date("2026-03-08T00:00:00");
  }
  return null;
}

export function getSubmissionDeadline(comp: CompetitionName) {
  if (comp === "BCC") {
    return new Date("2026-03-14T23:59:59");
  } else if (comp === "IPPC") {
    return new Date("2026-02-28T23:59:59");
  } else if (comp === "PDC") {
    return new Date("2026-03-06T23:59:59");
  } else if (comp === "STEM") return null;
  return null;
}
export function getCompFee(comp: string) {
  const compStartDate1 = competitions.find(
    (competition) => competition.abbreviation === comp.toUpperCase(),
  )?.startRegDate1 as Date;
  const compEndDate1 = competitions.find(
    (competition) => competition.abbreviation === comp.toUpperCase(),
  )?.endRegDate1 as Date;
  if (
    isWithinInterval(currentDate, {
      start: compStartDate1,
      end: compEndDate1,
    })
  ) {
    const compFee = competitions.find(
      (competition) => competition.abbreviation === comp.toUpperCase(),
    )?.fee1 as number;

    return compFee;
  }

  const compFee = competitions.find(
    (competition) => competition.abbreviation === comp.toUpperCase(),
  )?.fee2 as number;

  return compFee;
}

export function getTwibbonFormatLink(comp: CompetitionName) {
  switch (comp) {
    case CompetitionName.BCC:
      return "https://drive.google.com/drive/folders/1BWJJ8mOQbO8S1psZmvJ_00pAr6ejR1G-?usp=sharing";
    case CompetitionName.IPPC:
      return "https://drive.google.com/drive/folders/1Suy1QMroEjRlUzivl-gLiKBGDZ3oFBux?usp=sharing";
    case CompetitionName.PDC:
      return "https://drive.google.com/drive/folders/17ADXN7Iom5nPJXJHEw2oQZvRRvf9q4fP?usp=sharing";
    case CompetitionName.STEM:
      return "https://drive.google.com/drive/folders/1IfVYRpYq67Vk5Sgwnpvrr5eUKpKgNlng?usp=sharing";
  }
}
