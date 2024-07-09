import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM - Nirwana Nusa Penida",
  description: "A list of UMKM in Nirwana Nusa Penida",
};

export default function WisataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
