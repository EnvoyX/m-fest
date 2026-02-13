import { } from "date-fns-tz";
import {
    ActivityIcon,
    HeartHandshakeIcon,
    MicVocalIcon,
    MotorbikeIcon,
    type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { EventType } from "../../prisma/generated/prisma/enums";

type EventId = "M-CARE" | "M-RUN" | "ETU" | "M-TALKS";

export type Event = {
    id: EventId;
    dbId: EventType;
    title: string;
    desc: string;
    logo: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    href: string;
    eventDate?: string;
    location?: string;
    startRegDate1?: Date;
    endRegDate1?: Date;
    Batch1StartRegDate?: Date;
    Batch1EndRegDate?: Date;
    Batch2StartRegDate?: Date;
    Batch2EndRegDate?: Date;
    price1?: number;
    price2?: number;
    maxQuota?: number;
};

export const eventsList: Event[] = [
    {
        id: "M-CARE",
        dbId: "M_CARE",
        title: "M-Care",
        desc: "Community Support Initiative",
        logo: HeartHandshakeIcon,
        href: "events/m-care",
        eventDate: "Sabtu, 14 Februari 2026 (07.00 - 12.00)",
        location: "Institut Teknologi Bandung Ganesha (RKB FTMD)",
        startRegDate1: new Date("2026-02-07T09:00:00"),
        endRegDate1: new Date("2026-02-13T21:00:00"),
        maxQuota: 50,
    },
    {
        id: "M-RUN",
        dbId: "M_RUN",
        title: "M-Run",
        desc: "5km Campus Run",
        logo: ActivityIcon,
        href: "events/m-run",
        eventDate: "Minggu, 3 Mei 2026",
        location: "Institut Teknologi Bandung Ganesha",
        startRegDate1: new Date("2026-03-08T00:00:00"),
        endRegDate1: new Date("2026-04-04T23:59:59"),
        // Batch 1 : 8 Maret - 21 Maret
        // Batch 2 : 22 Maret - 4 April
        Batch1StartRegDate: new Date("2026-03-08T00:00:00"),
        Batch1EndRegDate: new Date("2026-03-21T23:59:59"),
        Batch2StartRegDate: new Date("2026-03-22T00:00:00"),
        Batch2EndRegDate: new Date("2026-04-04T23:59:59"),
        price1: 175000,
        price2: 200000,
    },
    {
        id: "ETU",
        dbId: "ETU",
        title: "Engine Tune Up",
        desc: "Free Vehicle Maintenance",
        logo: MotorbikeIcon,
        href: "events/engine-tune-up",
        location: "Institut Teknologi Bandung Ganesha",
        eventDate: "Sabtu, 7 Maret 2026 (8:00 - 16:30)",
        startRegDate1: new Date("2026-02-14T00:00:00"),
        endRegDate1: new Date("2026-02-28T23:59:59"),
    },
    {
        id: "M-TALKS",
        dbId: "M_TALKS",
        title: "M-Talks & M-Expo",
        desc: "Mech-Eng Exhibition",
        logo: MicVocalIcon,
        href: "events/m-talks",
        eventDate: "8-9 Mei 2026",
        location: "ITB, Aula Barat (M-Expo) & Aula Timur (M-Talks)",
        startRegDate1: new Date("2026-04-26T00:00:00"),
        endRegDate1: new Date("2026-05-08T23:59:59"),
    },
];
