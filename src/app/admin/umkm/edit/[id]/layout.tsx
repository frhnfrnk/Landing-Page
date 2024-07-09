import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit UMKM - Nirwana Nusa Penida",
  description: "Edit UMKM to Nirwana Nusa Penida",
};

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
