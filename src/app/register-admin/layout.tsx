import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Nirwana Nusa Penida",
  description: "Only for Admins - Register to Nirwana Nusa Penida as Admin",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
