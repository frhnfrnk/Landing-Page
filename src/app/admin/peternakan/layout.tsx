import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farm - Nirwana Nusa Penida",
  description: "A list of Farm in Nirwana Nusa Penida",
};

export default function FarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
