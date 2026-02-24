/**
 * ============================================================
 * QUANTITY STEPPER
 * ============================================================
 *
 * Outlined pill with [−] count [+] buttons.
 * When quantity is 1 the minus button becomes a trash icon.
 *
 * Used in:
 *   • Cart item rows (compact — size=sm)
 *   • Product detail sheet (standard — size=md)
 * ============================================================
 */

"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "./Icons";

interface QuantityStepperProps {
  /** Current quantity value */
  quantity: number;
  /** Called when the user taps "−" (or trash at qty 1) */
  onDecrement: () => void;
  /** Called when the user taps "+" */
  onIncrement: () => void;
  /** Visual size variant */
  size?: "sm" | "md";
}

export default function QuantityStepper({
  quantity,
  onDecrement,
  onIncrement,
  size = "sm",
}: QuantityStepperProps) {
  const isSmall = size === "sm";
  const btnSize = isSmall ? "w-7 h-7" : "w-8 h-8";
  const iconSize = isSmall ? 10 : 11;
  const fontSize = isSmall ? "text-[11px]" : "text-[13px]";
  const minWidth = isSmall ? "min-w-[18px]" : "min-w-[24px]";

  return (
    <div
      className="flex items-center rounded-full overflow-hidden"
      style={{ border: "1px solid var(--color-sand)" }}
    >
      {/* Decrement / Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDecrement();
        }}
        className={`flex items-center justify-center ${btnSize} transition-colors hover:bg-black/5 active:bg-black/10`}
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
      >
        {quantity === 1 ? (
          <TrashIcon size={iconSize} />
        ) : (
          <MinusIcon size={iconSize} />
        )}
      </button>

      {/* Count */}
      <span
        className={`${fontSize} font-medium tabular-nums ${minWidth} text-center`}
        style={{ color: "var(--color-charcoal)" }}
      >
        {quantity}
      </span>

      {/* Increment */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIncrement();
        }}
        className={`flex items-center justify-center ${btnSize} transition-colors hover:bg-black/5 active:bg-black/10`}
        aria-label="Increase quantity"
      >
        <PlusIcon size={iconSize} />
      </button>
    </div>
  );
}
