import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { ProfileProvider } from "@/contexts/profile-context";
import { NotificationProvider } from "@/contexts/notification-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "WorkBridge | Jobs and Talent in Ethiopia",
  description:
    "WorkBridge connects job seekers and employers across Ethiopia with trusted local opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <AuthProvider>
          <ProfileProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
