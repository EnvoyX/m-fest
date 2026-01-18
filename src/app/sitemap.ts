import { env } from "@/env";
import { getCurrentDate } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: getCurrentDate(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/competitions`,
            lastModified: getCurrentDate(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: getCurrentDate(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: getCurrentDate(),
            changeFrequency: "yearly",
            priority: 0.1,
        },
    ];
    return staticRoutes;
}
