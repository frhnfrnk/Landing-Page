import ButtonToTop from "@/components/Button/ButtonToTop";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Lokasi from "@/components/LandingPage/Lokasi";
import Maskot from "@/components/LandingPage/Maskot";
import Navbar from "@/components/LandingPage/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nirwana Nusa Penida - Surga Wisata di Bali",
  description:
    "Nirwana Nusa Penida adalah situs web yang menyediakan informasi lengkap tentang Nusa Penida, Bali. Pulau kecil ini terletak di tenggara Bali dan merupakan bagian dari Kabupaten Klungkung. Nusa Penida terkenal dengan pantainya yang indah, air laut yang jernih, dan pemandangan alam yang menakjubkan. Pulau ini menjadi destinasi favorit bagi wisatawan yang ingin menikmati suasana yang lebih tenang dibandingkan dengan Bali. Dikenal juga sebagai surga bagi penyelam dan snorkeler, Nusa Penida menawarkan pengalaman luar biasa dengan keanekaragaman hayati lautnya. Temukan semua informasi yang Anda butuhkan untuk merencanakan perjalanan ke Nusa Penida di situs ini.",
};

export default function Home() {
  return (
    <main className="bg-[#F8EEEB] flex min-h-screen flex-col items-center justify-between">
      <div className="w-full  items-center justify-between  lg:flex flex-col">
        <Navbar />
        <Hero />
        <Maskot />
        <Lokasi />
        <Footer />
        <ButtonToTop />
      </div>
    </main>
  );
}
