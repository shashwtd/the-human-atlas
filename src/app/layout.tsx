import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Human Atlas",
  description: "Welcome to a library full of various human emotions, categorized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 5000,
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid rgba(var(--foreground-rgb), 0.2)',
                  padding: '16px 24px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-geist-mono)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                success: {
                  style: {
                    border: '1px solid var(--mood-excellent-border)',
                    background: 'var(--mood-excellent-bg)',
                  },
                  iconTheme: {
                    primary: 'var(--mood-excellent-border)',
                    secondary: 'var(--background)',
                  },
                },
                error: {
                  style: {
                    border: '1px solid var(--mood-difficult-border)',
                    background: 'var(--mood-difficult-bg)',
                  },
                  iconTheme: {
                    primary: 'var(--mood-difficult-border)',
                    secondary: 'var(--background)',
                  },
                },
              }}
            />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
