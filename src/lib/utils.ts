import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { competitions } from "./competition";
import { CompetitionName } from "../../prisma/generated/prisma/enums";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Real date
export const currentDate = new Date();
// For testing date
// export const currentDate = new Date("2026-01-20T00:00:00");

export function getCompFee(comp: string) {
    const compStartDate1 = competitions.find(
        (competition) => competition.abbreviation === comp.toUpperCase(),
    )?.startRegDate1 as Date;
    const compEndDate1 = competitions.find(
        (competition) => competition.abbreviation === comp.toUpperCase(),
    )?.endRegDate1 as Date;

    if (compStartDate1 < currentDate && currentDate < compEndDate1) {
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
