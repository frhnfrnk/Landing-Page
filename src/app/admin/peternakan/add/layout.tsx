import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Farm - Nirwana Nusa Penida",
  description: "Add Farm to Nirwana Nusa Penida",
};

export default function FarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
