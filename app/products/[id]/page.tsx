"use client";

import { CartProvider, useCart } from "@/components/CartContext";
import CheckoutDrawer from "@/components/CheckoutDrawer";
import HeaderBag from "@/components/HeaderBag";
import { getProduct } from "@/lib/products";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense, use, useRef, useState } from "react";

function ProductDetailContent({ id }: { id: string }) {
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] ?? null,
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lockedImageIdx, setLockedImageIdx] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const addBtnRef = useRef<HTMLElement>(null);
  const { addItem, removeItem } = useCart();

  const currentColor = product.colors[selectedColorIdx];
  const gallery = currentColor.gallery;

  const handleAddToBag = () => {
    if (!selectedSize) return;
    setIsAdding(true);
    const rect = addBtnRef.current?.getBoundingClientRect();
    addItem(product, selectedColorIdx, selectedSize, rect ?? undefined);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 800);
  };

  const handleIncrement = () => {
    if (!selectedSize) return;
    setQuantity((q) => Math.min(q + 1, 10));
    const rect = addBtnRef.current?.getBoundingClientRect();
    addItem(product, selectedColorIdx, selectedSize, rect ?? undefined);
  };

  const handleDecrement = () => {
    setQuantity((q) => q - 1);
    removeItem();
  };

  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    setActiveImageIdx(0);
  };

  const handlePrevImage = () => {
    const newIdx =
      activeImageIdx === 0 ? gallery.length - 1 : activeImageIdx - 1;
    setActiveImageIdx(newIdx);
    setLockedImageIdx(newIdx);
  };

  const handleNextImage = () => {
    const newIdx =
      activeImageIdx === gallery.length - 1 ? 0 : activeImageIdx + 1;
    setActiveImageIdx(newIdx);
    setLockedImageIdx(newIdx);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-ivory)" }}>
      {/* ─── Nav Bar ─── */}
      <nav
        className="animate-fade-in fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
        style={{
          background: "rgba(250, 248, 245, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] tracking-widest uppercase group"
          style={{ color: "var(--color-muted)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="hidden md:inline">Back</span>
        </Link>

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

        <HeaderBag />
      </nav>

      {/* ─── Main Content ─── */}
      <div className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
          {/* ─── Left: Image Gallery (Sticky) ─── */}
          <div className="animate-fade-up lg:sticky lg:top-24 lg:self-start relative">
            {/* Mobile-only floating close button over image */}
            <Link
              href="/"
              className="lg:hidden absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              aria-label="Close and go back"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-charcoal)"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </Link>
            <div className="flex flex-col-reverse lg:flex-row gap-3 px-4 lg:px-6">
              {/* Vertical Thumbnail Strip */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[75vh]  py-1 lg:px-1 thumbnail-strip">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIdx(idx);
                      setLockedImageIdx(idx);
                    }}
                    onMouseEnter={() => setActiveImageIdx(idx)}
                    onMouseLeave={() => setActiveImageIdx(lockedImageIdx)}
                    className={`shrink-0 w-16 h-20 md:w-[72px] md:h-[88px] rounded-lg overflow-hidden transition-all duration-200 ${
                      lockedImageIdx === idx
                        ? "ring-2 ring-neutral-800 ring-offset-2 opacity-100"
                        : "opacity-60 hover:opacity-90"
                    }`}
                    style={{
                      background: "var(--color-cream)",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      width={72}
                      height={88}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div
                className="relative aspect-3/4 flex-1 overflow-hidden rounded-lg"
                style={{ background: "var(--color-cream)" }}
              >
                <Image
                  src={gallery[activeImageIdx]}
                  alt={`${product.name} - ${currentColor.name}`}
                  fill
                  className="object-cover transition-all duration-500 ease-out"
                  style={{
                    viewTransitionName: `product-image-${id}`,
                  }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Badge */}
                {product.badge && (
                  <span
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium"
                    style={{
                      background: "var(--color-graphite)",
                      color: "var(--color-ivory)",
                    }}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Prev / Next Arrows */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handlePrevImage}
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                    aria-label="Previous image"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-charcoal)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                    aria-label="Next image"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-charcoal)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right: Product Info (Scrollable) ─── */}
          <div className="px-6 md:px-8 lg:px-0 lg:pr-12 py-6 lg:py-4">
            {/* Category + Close */}
            <div className="animate-fade-up delay-1 flex items-center justify-between mb-4">
              <p
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ color: "var(--color-taupe)" }}
              >
                {product.category}
              </p>
              <Link
                href="/"
                className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ background: "rgba(0,0,0,0.08)" }}
                aria-label="Close and go back"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-charcoal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </Link>
            </div>

            {/* Name */}
            <h1
              className="animate-fade-up delay-2 font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.15] tracking-[0.02em] mb-3"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--color-graphite)",
                fontWeight: 400,
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p
              className="animate-fade-up delay-3 text-lg md:text-xl font-light tracking-wide mb-6"
              style={{ color: "var(--color-charcoal)" }}
            >
              ${product.price}
            </p>

            {/* Divider */}
            <div
              className="animate-line-expand delay-3 h-px w-full mb-6"
              style={{ background: "var(--color-sand)" }}
            />

            {/* Description */}
            <p
              className="animate-fade-up delay-4 text-[14px] leading-[1.7] mb-8"
              style={{ color: "var(--color-muted)" }}
            >
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="animate-fade-up delay-5 mb-8">
              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-3 flex items-center gap-2"
                style={{ color: "var(--color-charcoal)" }}
              >
                Color
                <span
                  className="font-normal capitalize tracking-normal"
                  style={{ color: "var(--color-taupe)", textTransform: "none" }}
                >
                  — {currentColor.name}
                </span>
              </p>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(idx)}
                    className={`color-swatch w-7 h-7 rounded-full ${
                      selectedColorIdx === idx ? "active" : ""
                    }`}
                    style={{
                      background: color.hex,
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="animate-fade-up delay-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Size
                </p>
                <button
                  className="text-[11px] tracking-[0.05em] underline underline-offset-2"
                  style={{ color: "var(--color-taupe)" }}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-pill px-5 py-2.5 rounded-md text-[12px] tracking-widest uppercase font-medium ${
                      selectedSize === size ? "active" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag / Quantity + Favourite Row */}
            <div className="animate-fade-up delay-7 flex gap-3 mb-4">
              {quantity > 0 ? (
                /* ─ Quantity Selector ─ */
                <div
                  ref={addBtnRef as React.RefObject<HTMLDivElement | null>}
                  className="flex-1 flex items-center justify-between rounded-lg overflow-hidden"
                  style={{
                    background: "var(--color-graphite)",
                  }}
                >
                  <button
                    onClick={handleDecrement}
                    className="flex items-center justify-center w-14 h-14 transition-colors duration-200 hover:bg-white/10 active:bg-white/20"
                    aria-label="Decrease quantity"
                  >
                    {quantity === 1 ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </button>
                  <span
                    className="text-[15px] font-medium tabular-nums"
                    style={{ color: "white" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="flex items-center justify-center w-14 h-14 transition-colors duration-200 hover:bg-white/10 active:bg-white/20"
                    aria-label="Increase quantity"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              ) : (
                /* ─ Add to Bag Button ─ */
                <button
                  ref={addBtnRef as React.RefObject<HTMLButtonElement | null>}
                  onClick={handleAddToBag}
                  disabled={!selectedSize}
                  className={`btn-press flex-1 py-4 rounded-lg text-[13px] tracking-[0.18em] uppercase font-medium transition-all duration-300 ${
                    !selectedSize ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{
                    background: isAdding
                      ? "var(--color-gold)"
                      : "var(--color-graphite)",
                    color: "var(--color-ivory)",
                  }}
                >
                  {isAdding ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Added
                    </span>
                  ) : (
                    "Add to Bag"
                  )}
                </button>
              )}

              {/* Favourite / Heart Button */}
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  border: "1px solid var(--color-sand)",
                  background: liked ? "rgba(226, 85, 85, 0.06)" : "transparent",
                }}
                aria-label={
                  liked ? "Remove from favourites" : "Add to favourites"
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="transition-all duration-300"
                  style={{ transform: liked ? "scale(1.1)" : "scale(1)" }}
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                    fill={liked ? "#E25555" : "none"}
                    stroke={liked ? "#E25555" : "var(--color-charcoal)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Trust icons */}
            <div className="animate-fade-up delay-8 flex items-center justify-center gap-6 mt-2 mb-8">
              <div
                className="flex items-center gap-1.5 text-[10px] tracking-[0.08em] uppercase"
                style={{ color: "var(--color-taupe)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                </svg>
                Secure Checkout
              </div>
              <div
                className="flex items-center gap-1.5 text-[10px] tracking-[0.08em] uppercase"
                style={{ color: "var(--color-taupe)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
                  <path d="m7 12 4 4 8-8" />
                </svg>
                Free Returns
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full mb-6"
              style={{ background: "var(--color-sand)" }}
            />

            {/* Details Accordion — expanded by default */}
            <details className="group mb-4" open>
              <summary
                className="flex items-center justify-between cursor-pointer py-3 text-[12px] tracking-[0.15em] uppercase font-medium list-none"
                style={{ color: "var(--color-charcoal)" }}
              >
                Details & Care
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-open:rotate-180"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <ul className="pt-2 pb-4 space-y-2">
                {product.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-[13px] leading-relaxed flex items-start gap-2"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--color-gold)" }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </details>

            <details className="group" open>
              <summary
                className="flex items-center justify-between cursor-pointer py-3 text-[12px] tracking-[0.15em] uppercase font-medium list-none"
                style={{ color: "var(--color-charcoal)" }}
              >
                Shipping & Returns
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-open:rotate-180"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="pt-2 pb-4 space-y-2">
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  Complimentary shipping on all orders. Express delivery
                  available at checkout. Free returns within 30 days of
                  delivery.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <footer
        className="border-t py-12 px-6 md:px-12 mt-12"
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
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <CartProvider>
      <Suspense>
        <ProductDetailContent id={id} />
        <CheckoutDrawer />
      </Suspense>
    </CartProvider>
  );
}
