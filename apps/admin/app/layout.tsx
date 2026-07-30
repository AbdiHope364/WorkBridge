import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore: side-effect CSS import handled by Next.js
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "WorkBridge | Admin Dashboard",
  description: "Advanced recruitment and job management dashboard",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#F8FAFC] min-h-screen`}>
        <main>
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
