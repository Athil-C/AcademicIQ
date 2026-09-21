import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | AcademIQ — Research & CFP Network",
    default: "AcademIQ — Research & CFP Network | Connecting Scholars with Opportunities",
  },
  description:
    "Discover research papers, Calls for Papers (CFPs), conferences, funding opportunities, fellowships, workshops, and scholarly resources across the academic community.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  keywords: [
    "Academic Research",
    "Calls for Papers",
    "CFPs",
    "Academic Conferences",
    "Postdoctoral Fellowships",
    "Research Grants",
    "SSRF",
    "Social Sciences",
    "Scholarly Publishing",
  ],
  authors: [{ name: "AcademIQ Editorial Directorate" }],
  openGraph: {
    title: "AcademIQ — Research & CFP Network",
    description: "Connecting Scholars with Opportunities across the Global Academic Community.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${lora.variable} h-full antialiased selection:bg-blue-100 selection:text-blue-900`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white text-slate-900"
      >
        {children}
      </body>
    </html>
  );
}
