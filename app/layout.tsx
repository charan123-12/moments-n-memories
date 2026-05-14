import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import Script from "next/script";

import "./globals.css";

import ClientNavbar from "../components/ClientNavbar";

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

export const metadata:
  Metadata = {
  title:
    "Moments & Memories",

  description:
    "Find planners for unforgettable moments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full bg-black text-white flex flex-col">

        {/* Razorpay */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {/* Navbar */}
        <ClientNavbar />

        {/* Main */}
        <main className="flex-1">
          {children}
        </main>

        {/* Toast */}
        <Toaster position="bottom-center" />

      </body>

    </html>
  );
}