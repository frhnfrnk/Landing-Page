import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Lokasi from "@/components/LandingPage/Lokasi";
import Maskot from "@/components/LandingPage/Maskot";
import Navbar from "@/components/LandingPage/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#F8EEEB] flex min-h-screen flex-col items-center justify-between">
      <div className="w-full  items-center justify-between  lg:flex flex-col">
        <Navbar />
        <Hero />
        <Maskot />
        <Lokasi />
        <Footer />
      </div>
    </main>
  );
}
