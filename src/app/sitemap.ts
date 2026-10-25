import type { MetadataRoute } from "next";

import { env } from "@/lib/config/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: env.APP_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
