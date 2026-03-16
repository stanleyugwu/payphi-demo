import { CheckoutThemeProvider } from "@/components/checkout/ThemeContext";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bogleBlack = localFont({
  src: "../public/BOGLEBLACK.otf",
  variable: "--font-bogle",
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
      <CheckoutThemeProvider>
        <html
          lang="en"
          className={`${inter.variable} ${bogleBlack.variable} ${cormorant.variable}`}
        >
          <body className="antialiased">{children}</body>
        </html>
      </CheckoutThemeProvider>
    </ViewTransitions>
  );
}
