import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wisata - Nirwana Nusa Penida",
  description: "A list of Wisata in Nirwana Nusa Penida",
};

export default function WisataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}