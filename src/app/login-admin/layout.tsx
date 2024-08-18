import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Nirwana Nusa Penida",
  description: "Only for Admins - Login to Nirwana Nusa Penida as Admin",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
