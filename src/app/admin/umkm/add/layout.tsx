import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add UMKM - Nirwana Nusa Penida",
  description: "Add UMKM to Nirwana Nusa Penida",
};

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
