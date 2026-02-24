import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MAISON — Luxury Fashion",
  description:
    "Curated luxury fashion. Timeless pieces crafted with the finest materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
