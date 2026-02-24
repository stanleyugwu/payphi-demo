/**
 * ============================================================
 * SHEET HEADER
 * ============================================================
 *
 * Standard header used at the top of every bottom sheet.
 * Shows a title, optional subtitle, and a close button.
 *
 * Used in: Shipping, Delivery, Payment sheets.
 * (Product sheet uses its own gallery-based header.)
 * ============================================================
 */

"use client";

import { CloseIcon } from "./Icons";

interface SheetHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export default function SheetHeader({
  title,
  subtitle,
  onClose,
}: SheetHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 mb-4 mt-2 shrink-0">
      <div>
        <h3
          className="text-[20px] font-semibold leading-none"
          style={{ color: "var(--color-graphite)" }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className="text-[13px] mt-1.5"
            style={{ color: "var(--color-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:scale-110 active:scale-90 transition-all"
        aria-label="Close sheet"
      >
        <CloseIcon size={14} />
      </button>
    </div>
  );
}
