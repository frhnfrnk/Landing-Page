import ButtonToTop from "@/components/Button/ButtonToTop";
import Navbar from "@/components/LandingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budaya - Nirwana Nusa Penida",
  description:
    "Immerse yourself in the rich cultural heritage of Nirwana Nusa Penida. Explore traditional ceremonies, vibrant festivals, and local arts that reflect the island's unique history and traditions.",
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
