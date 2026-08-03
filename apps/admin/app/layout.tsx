import type { Metadata } from "next";
// @ts-ignore: side-effect CSS import handled by Next.js
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "WorkBridge | Admin Dashboard",
  description: "Advanced recruitment and job management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#F8FAFC] min-h-screen">
        <main>
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
