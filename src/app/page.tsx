import ButtonToTop from "@/components/Button/ButtonToTop";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Lokasi from "@/components/LandingPage/Lokasi";
import Maskot from "@/components/LandingPage/Maskot";
import Navbar from "@/components/LandingPage/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nirwana Nusa Penida",
  description:
    "Nirwana Nusa Penida is a website that provides information about Nusa Penida, Bali. Nusa Penida is a small island located in the southeast of Bali, Indonesia. The island is part of the Klungkung Regency and is the largest of the three Nusa Islands. The other two are Nusa Lembongan and Nusa Ceningan. Nusa Penida is a popular destination for tourists who are looking to escape the hustle and bustle of Bali and experience a more relaxed and laid-back atmosphere. The island is known for its stunning beaches, crystal-clear waters, and beautiful landscapes. It is also home to a wide variety of marine life, making it a popular spot for snorkeling and diving. Whether you are looking to relax on the beach, explore the islands natural beauty, or get up close and personal with the local marine life, Nusa Penida has something for everyone. This website aims to provide visitors with all the information they need to plan their trip to Nusa Penida and make the most of their time on the island.",
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
