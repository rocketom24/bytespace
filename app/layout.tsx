import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { HomeNavProgressProvider } from "@/components/layout/HomeNavProgress";
import { NavVisibilityProvider } from "@/components/layout/NavVisibility";
import "./globals.css";

const pally = localFont({
  src: [
    {
      path: "../public/fonts/Pally_Complete/Fonts/WEB/fonts/Pally-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pally_Complete/Fonts/WEB/fonts/Pally-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Pally_Complete/Fonts/WEB/fonts/Pally-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pally",
  display: "swap",
});

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ByteSpace",
  description: "Learn to build, one lesson at a time.",
  openGraph: {
    title: "ByteSpace",
    description: "Learn to build, one lesson at a time.",
    siteName: "ByteSpace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteSpace",
    description: "Learn to build, one lesson at a time.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pally.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-ink antialiased">
        <HomeNavProgressProvider>
          <NavVisibilityProvider>
            <Navbar />
            <main>{children}</main>
          </NavVisibilityProvider>
        </HomeNavProgressProvider>
      </body>
    </html>
  );
}
