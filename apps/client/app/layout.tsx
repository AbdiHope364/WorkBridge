import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth-context";
import { NotificationProvider } from "@/contexts/notification-context";
import { ProfileProvider } from "@/contexts/profile-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkBridge | Skilled Labor & Trade Marketplace",
  description: "Direct connection platform for electricians, plumbers, skilled trade workers, and employers in Ethiopia.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NotificationProvider>
            <ProfileProvider>
              {children}
            </ProfileProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
