/**
 * ============================================================
 * SHEET WRAPPER
 * ============================================================
 *
 * The common container for every bottom sheet inside the drawer.
 * Handles:
 *   • Dark backdrop + tap-to-dismiss
 *   • Slide-up / slide-down animation
 *   • Rounded top corners + grab handle
 *
 * Individual sheet *content* is passed as `children`.
 * ============================================================
 */

"use client";

import React from "react";

interface SheetWrapperProps {
  /** Whether the sheet is animating out (slide-down) */
  animatingOut: boolean;
  /** Called when the user taps the backdrop */
  onClose: () => void;
  children: React.ReactNode;
}

export default function SheetWrapper({
  animatingOut,
  onClose,
  children,
}: SheetWrapperProps) {
  return (
    <div
      className="absolute inset-0 z-[1000] flex flex-col justify-end overflow-hidden"
      style={{ borderRadius: "16px" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.3)",
          animation: animatingOut
            ? "backdropFadeOut 0.4s ease forwards"
            : "backdropFadeIn 0.4s ease forwards",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full bg-white flex flex-col"
        style={{
          height: "85%",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          animation: animatingOut
            ? "sheetSlideDown 0.35s cubic-bezier(0.4, 0, 0.7, 0.2) forwards"
            : "sheetSlideUp 0.45s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        }}
      >
        {/* Grab handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "var(--color-sand)" }}
          />
        </div>

        {children}
      </div>
    </div>
  );
}
