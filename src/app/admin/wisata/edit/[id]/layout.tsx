import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Wisata - Nirwana Nusa Penida",
  description: "Edit Wisata to Nirwana Nusa Penida",
};

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
