"use client";

import { useCart } from "./CartContext";

export default function HeaderBag() {
  const { totalItems, bagRef, wiggling, openCheckout } = useCart();

  return (
    <button
      ref={bagRef}
      className="relative"
      aria-label="Shopping Bag"
      onClick={openCheckout}
      style={{
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: wiggling ? "scale(1.25)" : "scale(1)",
        animation: wiggling ? "bag-wiggle 0.6s ease-in-out" : "none",
      }}
    >
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        stroke="var(--color-charcoal)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 5h16l-1.5 13H2.5L1 5Z" />
        <path d="M5 5V4a4 4 0 1 1 8 0v1" />
      </svg>
      <span
        className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full text-[9px] font-medium transition-all duration-300"
        style={{
          background:
            totalItems > 0 ? "var(--color-gold)" : "var(--color-charcoal)",
          color: "var(--color-ivory)",
          width: totalItems > 0 ? "18px" : "16px",
          height: totalItems > 0 ? "18px" : "16px",
          transform: wiggling ? "scale(1.2)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
      >
        {totalItems}
      </span>
    </button>
  );
}
