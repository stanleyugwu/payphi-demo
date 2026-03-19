import Body from "@/components/Body";
import { CheckoutThemeProvider } from "@/components/checkout/ThemeContext";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bogleBlack = localFont({
  src: "../public/fonts/bogleblack.otf",
  variable: "--font-walmart",
  display: "swap",
});

const newTimes = localFont({
  src: "../public/fonts/newtimes.otf",
  variable: "--font-reformation",
  display: "swap",
});

const sofiaPro = localFont({
  src: "../public/fonts/sofia-pro.otf",
  variable: "--font-wayfair",
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
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-8">
            <div className="size-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
          </div>
        }
      >
        <CheckoutThemeProvider>
          <html
            lang="en"
            className={`${inter.variable} ${sofiaPro.variable} ${bogleBlack.variable} ${newTimes.variable} ${cormorant.variable}`}
          >
            <Body>{children}</Body>
          </html>
        </CheckoutThemeProvider>
      </Suspense>
    </ViewTransitions>
  );
}
