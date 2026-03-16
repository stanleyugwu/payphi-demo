"use client";

import type { Product } from "@/lib/products";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useCart } from "./CartContext";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [colorIdx, setColorIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const [liked, setLiked] = useState(false);
  const bagBtnRef = useRef<HTMLButtonElement>(null);
  const { addItem, removeItem } = useCart();
  const params = useSearchParams();
  const brand = params.get("brand");

  const currentColor = product.colors[colorIdx];

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCheck(true);
    const rect = bagBtnRef.current?.getBoundingClientRect();
    addItem(product, colorIdx, product.sizes[sizeIdx], rect ?? undefined);
    setTimeout(() => {
      setShowCheck(false);
      setQuantity(1);
    }, 600);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((q) => Math.min(q + 1, 10));
    const rect = bagBtnRef.current?.getBoundingClientRect();
    addItem(product, colorIdx, product.sizes[sizeIdx], rect ?? undefined);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((q) => q - 1);
    removeItem();
  };

  const handleColorClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setColorIdx(idx);
  };

  const handleSizeClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSizeIdx(idx);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Link
      href={`/products/${brand ? product.id + "?brand=" + brand : product.id}`}
      className={`animate-fade-up delay-${index + 2} luxury-card group block relative overflow-hidden rounded-lg`}
      style={{ background: "var(--color-cream)" }}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium"
          style={{
            background: "var(--color-graphite)",
            color: "var(--color-ivory)",
          }}
        >
          {product.badge}
        </span>
      )}

      {/* Image + Overlay Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={currentColor.image}
          alt={`${product.name} - ${currentColor.name}`}
          width={600}
          height={800}
          className="img-zoom h-full w-full object-cover transition-opacity duration-500"
          style={{
            viewTransitionName: `product-image-${product.id}`,
          }}
          priority={index < 2}
        />

        {/* Favourite Heart Icon */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="transition-all duration-300"
            style={{
              transform: liked ? "scale(1.15)" : "scale(1)",
            }}
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

        {/* Overlay on hover — desktop only */}
        <div
          className="absolute inset-0 justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:flex flex-col"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.65) 0%, transparent 60%)",
          }}
        >
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-1"
            style={{ color: "var(--color-gold-light)" }}
          >
            {product.category}
          </p>
          <p
            className="font-serif text-lg"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "#fff",
              fontWeight: 400,
            }}
          >
            {product.name}
          </p>
        </div>
      </div>

      {/* Info below image */}
      <div className="p-3 md:p-4">
        <p
          className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase mb-1"
          style={{ color: "var(--color-taupe)" }}
        >
          {product.category}
        </p>

        {/* Name + Price + Bag Button Row */}
        <div className="flex items-start gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3
              className="font-serif text-lg md:text-xl leading-snug"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--color-graphite)",
                fontWeight: 600,
              }}
            >
              {product.name}
            </h3>
            <p
              className="text-[14px] md:text-[15px] font-medium tracking-wide mt-1"
              style={{ color: "var(--color-gold)" }}
            >
              ${product.price}
            </p>
          </div>

          {/* Bag / Quantity — right-aligned */}
          {quantity > 0 ? (
            <div
              className="shrink-0 flex items-center rounded-full overflow-hidden transition-all duration-300"
              style={{
                background: "var(--color-graphite)",
                boxShadow: "0 3px 12px rgba(26, 26, 26, 0.25)",
              }}
            >
              <button
                onClick={handleDecrement}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-colors duration-200 hover:bg-white/10 active:bg-white/20"
                aria-label="Decrease quantity"
              >
                {quantity === 1 ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
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
                className="text-[12px] md:text-[13px] font-medium tabular-nums min-w-[22px] text-center"
                style={{ color: "white" }}
              >
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 transition-colors duration-200 hover:bg-white/10 active:bg-white/20"
                aria-label="Increase quantity"
              >
                <svg
                  width="12"
                  height="12"
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
            <button
              ref={bagBtnRef}
              onClick={handleAddToBag}
              className="relative shrink-0 flex items-center justify-center w-14 h-14 md:w-[60px] md:h-[60px] rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: showCheck ? "var(--color-gold)" : "transparent",
                boxShadow: showCheck
                  ? "0 4px 16px rgba(201, 169, 110, 0.4)"
                  : "0 2px 10px rgba(26, 26, 26, 0.2)",
              }}
              aria-label="Add to bag"
              title="Add to bag"
            >
              {showCheck ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <div className="relative">
                  <svg
                    width="24"
                    height="26"
                    viewBox="0 0 22 24"
                    fill="none"
                    stroke="var(--color-charcoal)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h16l-1.4 12H4.4L3 8Z" />
                    <path d="M7 8V7a4 4 0 1 1 8 0v1" />
                  </svg>
                  {/* Plus badge — relative to bag icon */}
                  <span
                    className="absolute -top-1.5 -right-2 flex items-center justify-center w-5 h-5 rounded-full text-white text-[14px] font-bold leading-none"
                    style={{ background: "var(--color-gold)" }}
                  >
                    +
                  </span>
                </div>
              )}
            </button>
          )}
        </div>

        {/* Color + Size swatches */}
        <div className="flex items-end gap-3">
          {/* Color group */}
          <div>
            <span
              className="text-[9px] md:text-[10px] tracking-[0.12em] uppercase font-medium block mb-1.5"
              style={{ color: "var(--color-taupe)" }}
            >
              Color
            </span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={(e) => handleColorClick(e, idx)}
                  className={`color-swatch w-5 h-5 md:w-[22px] md:h-[22px] rounded-full transition-all duration-200 ${
                    colorIdx === idx ? "active" : ""
                  }`}
                  style={{
                    background: color.hex,
                    border: "1.5px solid rgba(0,0,0,0.1)",
                  }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-px self-stretch mb-0.5"
            style={{ background: "var(--color-sand)" }}
          />

          {/* Size group */}
          <div>
            <span
              className="text-[9px] md:text-[10px] tracking-[0.12em] uppercase font-medium block mb-1.5"
              style={{ color: "var(--color-taupe)" }}
            >
              Size
            </span>
            <div className="flex items-center gap-1">
              {product.sizes.map((size, idx) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeClick(e, idx)}
                  className={`text-[10px] md:text-[11px] tracking-[0.05em] uppercase font-medium px-2 py-1 md:px-2.5 md:py-1 rounded transition-all duration-200 ${
                    sizeIdx === idx ? "" : "hover:opacity-70"
                  }`}
                  style={{
                    background:
                      sizeIdx === idx ? "var(--color-charcoal)" : "transparent",
                    color:
                      sizeIdx === idx
                        ? "var(--color-ivory)"
                        : "var(--color-muted)",
                    border:
                      sizeIdx === idx
                        ? "1px solid var(--color-charcoal)"
                        : "1px solid var(--color-sand)",
                  }}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
