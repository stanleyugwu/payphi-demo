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
import { useCheckoutTheme } from "./ThemeContext";

interface SheetWrapperProps {
  /** Whether the sheet is animating out (slide-down) */
  animatingOut: boolean;
  /** Called when the user taps the backdrop */
  onClose: () => void;
  height?: string;
  children: React.ReactNode;
}

export default function SheetWrapper({
  animatingOut,
  onClose,
  height = "85%",
  children,
}: SheetWrapperProps) {
  const theme = useCheckoutTheme();
  return (
    <div
      className="checkout-sheet-wrapper absolute inset-0 z-[1000] flex flex-col justify-end overflow-hidden"
      style={{ borderRadius: theme.drawerRadius }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.3)",
          animation: animatingOut
            ? "backdropFadeOut var(--sheet-backdrop-duration, 0.4s) ease forwards"
            : "backdropFadeIn var(--sheet-backdrop-duration, 0.4s) ease forwards",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full bg-white flex flex-col"
        style={{
          height,
          borderTopLeftRadius: theme.sheetRadius,
          borderTopRightRadius: theme.sheetRadius,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          animation: animatingOut
            ? "sheetSlideDown var(--sheet-exit-duration, 0.35s) cubic-bezier(0.4, 0, 0.7, 0.2) forwards"
            : "sheetSlideUp var(--sheet-enter-duration, 0.45s) cubic-bezier(0.32, 0.72, 0, 1) forwards",
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
