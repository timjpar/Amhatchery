import type { Metadata } from "next";
import { Newsreader, Karla, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme/ThemeProvider";
import { Navigation } from "@/app/_components/nav/Navigation";
import { AnnouncementBanner } from "@/app/_components/AnnouncementBanner";
import { Footer } from "@/app/_components/Footer";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { localBusinessSchema } from "@/app/_lib/schema";
import { SITE_URL, BUSINESS, GOOGLE_SITE_VERIFICATION } from "@/app/_config/business";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const shareImage = "/images/farm/muscovy-duck-broody-nest-hatching-eggs.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AM Hatchery — Hatching Eggs, Chicks, Ducklings & Quail in East Tennessee",
    template: "%s | AM Hatchery",
  },
  description: BUSINESS.description,
  keywords: [
    "hatching eggs",
    "fertile eggs for sale",
    "chicks for sale",
    "ducklings for sale",
    "Coturnix quail",
    "blue egg layers",
    "Newport TN",
    "East Tennessee hatchery",
  ],
  openGraph: {
    siteName: BUSINESS.name,
    type: "website",
    images: [
      {
        url: shareImage,
        alt: "A broody Muscovy duck on a nest of hatching eggs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImage],
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const fontVars = [newsreader.variable, karla.variable, spaceMono.variable].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="eggshell" className={fontVars}>
      <head>
        {/* Flash-prevention: reads localStorage before React hydrates, and
            validates against the current theme list so a stale value falls
            back to the default cleanly. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var allowed=['eggshell','brooder'];var t=localStorage.getItem('amh-theme');if(!t||allowed.indexOf(t)===-1){t='eggshell';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <JsonLd data={localBusinessSchema()} />
        <ThemeProvider>
          <AnnouncementBanner />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
