import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Wisata - Nirwana Nusa Penida",
  description: "Add Wisata to Nirwana Nusa Penida",
};

export default function WisataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
