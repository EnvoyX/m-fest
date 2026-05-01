import {
    ActivityIcon,
    HeartHandshakeIcon,
    MicVocalIcon,
    MotorbikeIcon,
    Wrench,
    type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { EventType } from "../../prisma/generated/prisma/enums";

type EventId = "M-CARE" | "M-RUN" | "ETU" | "M-TALKS" | "M-EXPO";

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
    price3?: number;
    price4?: number;
    slotmatic?: number;
    slotmanual?: number;
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
    },
    {
        id: "ETU",
        dbId: "ETU",
        title: "Engine Tune Up",
        desc: "Free Vehicle Maintenance",
        logo: MotorbikeIcon,
        href: "events/engine-tune-up",
        location: "Institut Teknologi Bandung Ganesha",
        eventDate: "Sabtu, 7 Maret 2026 (8:30 - 17:00)",
        startRegDate1: new Date("2026-02-26T19:00:00"),
        endRegDate1: new Date("2026-03-01T23:59:59"),
        slotmanual: 60,
        slotmatic: 90,

    },
    {
        id: "M-RUN",
        dbId: "M_RUN",
        title: "M-Run",
        desc: "5KM Campus Run",
        logo: ActivityIcon,
        href: "events/m-run",
        eventDate: "Minggu, 3 Mei 2026",
        location: "Institut Teknologi Bandung Ganesha",
        startRegDate1: new Date("2026-04-05T13:00:00"),
        endRegDate1: new Date("2026-04-16T11:30:00"),
        // Batch 1 : 13 Maret - 4 April
        // Batch 2 : 5 April - 11 April
        Batch1StartRegDate: new Date("2026-03-13T15:00:00"),
        Batch1EndRegDate: new Date("2026-04-04T23:59:59"),
        Batch2StartRegDate: new Date("2026-04-05T00:00:00"),
        Batch2EndRegDate: new Date("2026-04-16T11:30:00"),
        // Batch 1
        price1: 120001, // Umum
        price2: 110001, // Mahasiswa
        // Batch 2
        price3: 130001, // Umum
        price4: 120001, // Mahasiswa
    },
    {
        id: "M-TALKS",
        dbId: "M_TALKS",
        title: "M-Talks",
        desc: "Mech-Eng Talkshow",
        logo: MicVocalIcon,
        href: "events/m-talks",
        eventDate: "8-9 Mei 2026",
        location: "ITB, Aula Timur (M-Talks)",
        startRegDate1: new Date("2026-05-01T15:00:00"),
        endRegDate1: new Date("2026-05-09T21:00:00"),
    },
    {
        id: "M-EXPO",
        dbId: "M_EXPO",
        title: "M-Expo",
        desc: "Mech-Eng Exhibition",
        logo: Wrench,
        href: "events/m-expo",
        eventDate: "8-9 Mei 2026",
        location: "ITB, Aula Barat (M-Expo)",
        startRegDate1: new Date("2026-05-01T15:00:00"),
        endRegDate1: new Date("2026-05-09T15:00:00"),
    },
];
