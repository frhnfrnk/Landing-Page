import ButtonToTop from "@/components/Button/ButtonToTop";
import Navbar from "@/components/LandingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wisata - Nirwana Nusa Penida",
  description:
    "Temukan destinasi wisata menakjubkan di Nirwana Nusa Penida. Jelajahi pantai yang indah, gunung yang megah, dan lokasi-lokasi menawan lainnya yang menjadikan Nusa Penida sebagai surga bagi para pelancong.",
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
