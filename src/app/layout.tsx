"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/lib/store/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader color="#f5dd61" height={5} />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ReduxProvider>
  );
}
