import ButtonToTop from "@/components/Button/ButtonToTop";
import Navbar from "@/components/LandingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wisata - Nirwana Nusa Penida",
  description:
    "Discover the breathtaking tourist destinations in Nirwana Nusa Penida. Explore beautiful beaches, majestic mountains, and other stunning locations that make Nusa Penida a paradise for travelers.",
};

export default function UmkmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <Navbar />
        {children}
        <ButtonToTop />
      </main>
    </>
  );
}
