/**
 * ============================================================
 * PRODUCT DETAIL SHEET
 * ============================================================
 *
 * Opened when the user taps a cart item. Shows:
 *   • Horizontal image gallery with dot pagination
 *   • Expandable description
 *   • Color & Size selectors
 *   • Quantity stepper
 *   • Price display
 *   • "Update In Cart" CTA
 * ============================================================
 */

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CartItem } from "../CartContext";
import { CHECKOUT_THEME } from "./constants";
import { ChevronIcon } from "./Icons";
import QuantityStepper from "./QuantityStepper";
import SheetFooterButton from "./SheetFooterButton";

interface ProductDetailSheetProps {
  /** The currently selected cart item */
  item: CartItem;
  /** Decrement quantity (or remove if qty=1) */
  onDecrement: (key: string) => void;
  /** Increment quantity */
  onIncrement: (key: string) => void;
  /** Called when user taps "Update In Cart" — receives new colorIdx & size */
  onUpdate: (colorIdx: number, size: string) => void;
}

export default function ProductDetailSheet({
  item,
  onDecrement,
  onIncrement,
  onUpdate,
}: ProductDetailSheetProps) {
  const product = item.product;

  /* ── local sheet state ── */
  const [colorIdx, setColorIdx] = useState(item.colorIdx);
  const [sizeIdx, setSizeIdx] = useState(
    product.sizes.indexOf(item.selectedSize),
  );
  const [descExpanded, setDescExpanded] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const color = product.colors[colorIdx];
  const gallery = color?.gallery ?? [];

  return (
    <div className="flex-1 flex flex-col bg-white rounded-t-[24px] overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto cart-drawer-scroll pb-24">
        {/* ── Horizontal Image Gallery ── */}
        <div
          ref={galleryRef}
          className="w-full overflow-x-auto snap-x snap-mandatory flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: "smooth" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollLeft / el.clientWidth);
            setGalleryIdx(idx);
          }}
        >
          {gallery.map((img, i) => (
            <div
              key={i}
              className="w-full shrink-0 snap-center flex items-center justify-center"
              style={{
                background: "var(--color-sand)",
                aspectRatio: "1 / 1",
              }}
            >
              <Image
                src={img}
                alt={`${product.name} - ${color.name} ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* ── Gallery dot indicators ── */}
        {gallery.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  galleryRef.current?.scrollTo({
                    left: i * (galleryRef.current?.clientWidth ?? 0),
                    behavior: "smooth",
                  });
                }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: galleryIdx === i ? 18 : 6,
                  height: 6,
                  background:
                    galleryIdx === i
                      ? CHECKOUT_THEME.primaryColor
                      : "var(--color-taupe)",
                  opacity: galleryIdx === i ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        )}

        {/* ── Info sections ── */}
        <div className="px-6 mt-5">
          {/* Description (expandable) */}
          <button
            onClick={() => setDescExpanded((v) => !v)}
            className="w-full flex items-center justify-between py-3 text-left"
            style={{ borderBottom: "1px solid var(--color-sand)" }}
          >
            <div className="flex-1 min-w-0 pr-3">
              <p
                className="text-[15px] font-semibold"
                style={{
                  fontFamily: CHECKOUT_THEME.fontFamily,
                  color: "var(--color-graphite)",
                }}
              >
                Description
              </p>
              {!descExpanded && (
                <p
                  className="text-[13px] mt-0.5 truncate"
                  style={{ color: "var(--color-muted)" }}
                >
                  {product.description.slice(0, 60)}…
                </p>
              )}
            </div>
            <ChevronIcon
              size={16}
              className="shrink-0 transition-transform duration-200"
              color="var(--color-taupe)"
            />
          </button>
          {descExpanded && (
            <div
              className="py-3 text-[13px] leading-relaxed"
              style={{
                color: "var(--color-charcoal)",
                borderBottom: "1px solid var(--color-sand)",
                animation: "fadeSlideIn 0.25s ease",
              }}
            >
              {product.description}
              {product.details.length > 0 && (
                <ul className="mt-3 space-y-1 list-disc pl-4">
                  {product.details.map((d, i) => (
                    <li
                      key={i}
                      className="text-[12px]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Color selector */}
          <div
            className="py-3"
            style={{ borderBottom: "1px solid var(--color-sand)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-[15px] font-semibold"
                style={{
                  fontFamily: CHECKOUT_THEME.fontFamily,
                  color: "var(--color-graphite)",
                }}
              >
                Color
              </p>
              <ChevronIcon size={16} />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 pb-1">
              {product.colors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setColorIdx(idx);
                    setGalleryIdx(0);
                    galleryRef.current?.scrollTo({
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                  style={{
                    border:
                      colorIdx === idx
                        ? `1px solid ${CHECKOUT_THEME.primaryColor}`
                        : "1px solid transparent",
                    background:
                      colorIdx === idx
                        ? "rgba(0,83,226,0.04)"
                        : "rgba(0,0,0,0.02)",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full shrink-0"
                    style={{
                      background: c.hex,
                      border: "1.5px solid rgba(0,0,0,0.1)",
                    }}
                  />
                  <span
                    className="text-[13px] font-medium whitespace-nowrap"
                    style={{ color: "var(--color-graphite)" }}
                  >
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div
            className="py-3"
            style={{ borderBottom: "1px solid var(--color-sand)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-[15px] font-semibold"
                style={{
                  fontFamily: CHECKOUT_THEME.fontFamily,
                  color: "var(--color-graphite)",
                }}
              >
                Size
              </p>
              <ChevronIcon size={16} />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes.map((sz, idx) => (
                <button
                  key={idx}
                  onClick={() => setSizeIdx(idx)}
                  className="px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all"
                  style={{
                    border:
                      sizeIdx === idx
                        ? `1px solid ${CHECKOUT_THEME.primaryColor}`
                        : "1px solid var(--color-sand)",
                    background:
                      sizeIdx === idx ? "rgba(0,83,226,0.04)" : "transparent",
                    color:
                      sizeIdx === idx
                        ? CHECKOUT_THEME.primaryColor
                        : "var(--color-graphite)",
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div
            className="py-3"
            style={{ borderBottom: "1px solid var(--color-sand)" }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-[15px] font-semibold"
                style={{
                  fontFamily: CHECKOUT_THEME.fontFamily,
                  color: "var(--color-graphite)",
                }}
              >
                Quantity
              </p>
              <QuantityStepper
                quantity={item.quantity}
                onDecrement={() => onDecrement(item.key)}
                onIncrement={() => onIncrement(item.key)}
                size="md"
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between py-4">
            <p
              className="text-[15px] font-semibold"
              style={{
                fontFamily: CHECKOUT_THEME.fontFamily,
                color: "var(--color-graphite)",
              }}
            >
              Price
            </p>
            <p
              className="text-[17px] font-bold"
              style={{
                fontFamily: CHECKOUT_THEME.fontFamily,
                color: "var(--color-graphite)",
              }}
            >
              ${product.price}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <SheetFooterButton
        label="Update In Cart"
        onClick={() => onUpdate(colorIdx, product.sizes[sizeIdx])}
      />
    </div>
  );
}
