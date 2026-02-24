/**
 * ============================================================
 * SHEET FOOTER BUTTON
 * ============================================================
 *
 * Sticky CTA button pinned to the bottom of a sheet.
 * Shared across Payment, Delivery, and Product detail sheets.
 * ============================================================
 */

"use client";

import { CHECKOUT_THEME } from "./constants";

interface SheetFooterButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function SheetFooterButton({
  label,
  onClick,
  disabled = false,
}: SheetFooterButtonProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md rounded-b-[24px]"
      style={{ zIndex: 10 }}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className="btn-press w-full py-3.5 rounded-full text-[13px] tracking-[0.15em] uppercase font-medium transition-all"
        style={{
          background: CHECKOUT_THEME.primaryColor,
          color: "var(--color-ivory)",
          fontFamily: CHECKOUT_THEME.fontFamily,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {label}
      </button>
    </div>
  );
}
