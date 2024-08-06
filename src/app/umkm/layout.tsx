import ButtonToTop from "@/components/Button/ButtonToTop";
import Navbar from "@/components/LandingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM - Nirwana Nusa Penida",
  description:
    "Jelajahi berbagai usaha lokal di Nirwana Nusa Penida. Temukan produk unik, kerajinan tradisional, dan layanan lokal yang mencerminkan kekayaan budaya serta semangat kewirausahaan masyarakat setempat.",
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
