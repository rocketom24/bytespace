import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
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

export const metadata: Metadata = {
  title: "ByteSpace",
  description: "Learn to build, one lesson at a time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pally.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
