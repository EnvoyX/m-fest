import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { competitions } from "./competition";
import { CompetitionName } from "../../prisma/generated/prisma/enums";
import { isWithinInterval } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { eventsList, type Event } from "./eventDashboard";

const WIB_TZ = "Asia/Jakarta";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Date Testing or Real Date
export const getCurrentDate = () => {
    const now = new Date();
    //     const now = new Date("2026-01-26T00:00:00");

    return now;
};
const currentDate = getCurrentDate();

export function wibToUTC(date: Date) {
    return fromZonedTime(date, WIB_TZ);
}

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
        return new Date("2026-03-15T23:59:59");
    } else if (comp === "IPPC") {
        return new Date("2026-03-01T02:00:00");
    } else if (comp === "PDC") {
        return new Date("2026-03-06T23:59:59");
    } else if (comp === "STEM") return null;
    return null;
}
export function getCompFee(comp: string) {
    // const compStartDate1 = competitions.find(
    //   (competition) => competition.abbreviation === comp.toUpperCase(),
    // )?.startRegDate1 as Date;
    // const compEndDate1 = competitions.find(
    //   (competition) => competition.abbreviation === comp.toUpperCase(),
    // )?.endRegDate1 as Date;
    // if (
    //   isWithinInterval(currentDate, {
    //     start: compStartDate1,
    //     end: compEndDate1,
    //   })
    // ) {
    //   const compFee = competitions.find(
    //     (competition) => competition.abbreviation === comp.toUpperCase(),
    //   )?.fee1 as number;

    //   return compFee;
    // }

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

export function getMRUNBatchInfo(currentDate: Date) {
    const mRunInfo = eventsList.find((event) => event.id === "M-RUN");
    if (
        isWithinInterval(currentDate, {
            start: mRunInfo?.Batch1StartRegDate as Date,
            end: mRunInfo?.Batch1EndRegDate as Date,
        })
    ) {
        return {
            batch: "1",
            pricePublic: mRunInfo?.price1,
            priceStudent: mRunInfo?.price2,
            startRegDate: mRunInfo?.Batch1StartRegDate,
            endRegDate: mRunInfo?.Batch1EndRegDate,
        };
    }
    if (
        isWithinInterval(currentDate, {
            start: mRunInfo?.Batch2StartRegDate as Date,
            end: mRunInfo?.Batch2EndRegDate as Date,
        })
    ) {
        return {
            batch: "2",
            pricePublic: mRunInfo?.price3,
            priceStudent: mRunInfo?.price4,
            startRegDate: mRunInfo?.Batch2StartRegDate,
            endRegDate: mRunInfo?.Batch2EndRegDate,
        };
    }
    // Return hard-coded info or default info
    return {
        batch: "1",
        pricePublic: mRunInfo?.price1,
        priceStudent: mRunInfo?.price2,
        startRegDate: mRunInfo?.Batch1StartRegDate,
        endRegDate: mRunInfo?.Batch1EndRegDate,
    };
}

export function isEventOpen(event: Event, now: Date) {
    if (!event.startRegDate1 || !event.endRegDate1) return false;
    return isWithinInterval(now, {
        start: event.startRegDate1,
        end: event.endRegDate1,
    });
}
