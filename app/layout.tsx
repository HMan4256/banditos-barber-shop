import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "../public/fonts/inter-display.woff",
  variable: "--font-display",
  weight: "800",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../public/fonts/inter-regular.woff", weight: "400" },
    { path: "../public/fonts/inter-bold.woff", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Banditos Barber Shop — Pánské holičství ve Vrchlabí",
  description:
    "Pánské střihy a péče o vousy v srdci Vrchlabí. Prohlédněte si služby a rezervujte si termín v Banditos Barber Shop.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Banditos Barber Shop",
    description: "Pánské holičství ve Vrchlabí.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
