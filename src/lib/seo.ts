import { env } from "@/lib/config/env";

export const SEO = {
  name: "Next-App",
  description:
    "Next application by illinpayne, powered by PeakCLI to start with something, not a blank.",
  url: env.APP_URL,
  keywords: ["next-app", "peakcli-pull", "nextjs", "website"],
};

export const OG_IMAGE = {
  url: new URL("/opengraph.jpg", env.APP_URL),
  width: 2400,
  height: 1260,
  alt: "Next-app peakcli in peak!",
};
