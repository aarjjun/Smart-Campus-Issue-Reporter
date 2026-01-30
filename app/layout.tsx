import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smartcampus.example.com"),
  title: "Smart Campus Issue Reporter",
  description: "Report campus issues. Track resolutions. Make your campus better.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smart Campus",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Smart Campus Issue Reporter",
    title: "Smart Campus Issue Reporter",
    description: "Report campus issues. Track resolutions. Make your campus better.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Campus Issue Reporter",
    description: "Report campus issues. Track resolutions. Make your campus better.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f9fa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
