import type { Metadata } from "next";
import { Geist, Geist_Mono, Onest } from "next/font/google";
import "@/assets/globals.css";
import { env } from "@/lib/config/env";
import { OG_IMAGE, SEO } from "@/lib/seo";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: SEO.name,
    template: `%s - ${SEO.name}`,
  },
  description: SEO.description,
  metadataBase: new URL(env.APP_URL),
  applicationName: SEO.name,
  keywords: SEO.keywords,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/touch-icons/192x192.png",
    other: {
      rel: "touch-icons",
      url: "/touch-icons/192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: SEO.url,
    siteName: SEO.name,
    title: SEO.name,
    description: SEO.description,
    locale: "ru_RU",
    emails: ["next-app-owner@gmail.com"],
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.name,
    description: SEO.description,
    images: [OG_IMAGE],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${onest.variable} h-full antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
