import Navbar from "@/components/LandingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM - Nirwana Nusa Penida",
  description:
    "Explore a diverse range of local businesses in Nirwana Nusa Penida. Discover unique products, traditional crafts, and local services that showcase the rich culture and entrepreneurial spirit of the community.",
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
      </main>
    </>
  );
}
