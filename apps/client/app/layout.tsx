import { AuthProvider } from "@/contexts/auth-context";
import { NotificationProvider } from "@/contexts/notification-context";
import { ProfileProvider } from "@/contexts/profile-context";
import "./globals.css";

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
