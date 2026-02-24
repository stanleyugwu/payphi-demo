"use client";

import { CartProvider } from "@/components/CartContext";
import CheckoutDrawer from "@/components/CheckoutDrawer";
import HeaderBag from "@/components/HeaderBag";
import ParticlesBackground from "@/components/ParticlesBackground";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  return (
    <CartProvider>
      <div
        className="min-h-screen relative"
        style={{ background: "var(--color-ivory)" }}
      >
        {/* ─── Particles Background ─── */}
        <ParticlesBackground />

        {/* ─── Nav Bar ─── */}
        <nav
          className="animate-fade-in fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
          style={{
            background: "rgba(250, 248, 245, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-6">
            <button className="md:hidden" aria-label="Menu">
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path
                  d="M0 1h20M0 7h20M0 13h20"
                  stroke="var(--color-charcoal)"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <div
              className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.12em] uppercase"
              style={{ color: "var(--color-muted)" }}
            >
              <span
                className="gold-underline cursor-pointer"
                style={{ color: "var(--color-charcoal)" }}
              >
                New In
              </span>
              <span className="gold-underline cursor-pointer">Knitwear</span>
              <span className="gold-underline cursor-pointer">Tops</span>
            </div>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-[28px] tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--color-graphite)",
              fontWeight: 400,
            }}
          >
            Maison
          </Link>

          <div className="flex items-center gap-5">
            {/* Search Icon */}
            <button className="hidden md:block" aria-label="Search">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-charcoal)"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            {/* Bag Icon — now a client component with live count + animation */}
            <HeaderBag />
          </div>
        </nav>

        {/* ─── Hero Section ─── */}
        <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 text-center">
          <p
            className="animate-fade-up text-[11px] md:text-[12px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--color-taupe)" }}
          >
            Spring / Summer 2026
          </p>
          <h1
            className="animate-fade-up delay-1 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-[0.04em] mb-5"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--color-graphite)",
              fontWeight: 300,
            }}
          >
            The Edit
          </h1>
          <p
            className="animate-fade-up delay-2 text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            Timeless pieces crafted with the finest materials.
            <br className="hidden md:block" />
            Designed to transcend seasons.
          </p>
          <div
            className="animate-line-expand delay-4 mx-auto mt-10 h-px w-12"
            style={{ background: "var(--color-gold)" }}
          />
        </section>

        {/* ─── Product Grid ─── */}
        <section className="relative z-10 px-4 md:px-12 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-7xl mx-auto">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer
          className="relative z-10 border-t py-12 px-6 md:px-12"
          style={{ borderColor: "var(--color-sand)" }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p
              className="font-serif text-lg tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--color-graphite)",
                fontWeight: 400,
              }}
            >
              Maison
            </p>
            <p
              className="text-[11px] tracking-widest"
              style={{ color: "var(--color-taupe)" }}
            >
              © 2026 Maison. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      <CheckoutDrawer />
    </CartProvider>
  );
}
