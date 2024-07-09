"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/lib/store/redux-provider";
import localFont from "next/font/local";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sirukota = localFont({
  src: "/fonts/Sirukota.ttf",
  variable: "--font-sirukota",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className={`${poppins.variable} ${sirukota.variable} `}>
          <NextTopLoader color="#f5dd61" height={5} />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ReduxProvider>
  );
}
