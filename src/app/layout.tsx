import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xpenses",
  description: "¡Tu app para gestionar tus ingresos y gastos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-blue-700 to-fuchsia-700 min-h-screen`}
      >
        <h1 className="text-2xl font-bold text-center mx-auto max-w-screen-xl p-10 sm:px-3 lg:px-8 text-white">
        Xpenses</h1>
        
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
