/**
 * ============================================================
 * SHIPPING SHEET
 * ============================================================
 *
 * Lets the user pick a shipping tier (Standard / Rush / Priority).
 * Selecting an option auto-closes the sheet and persists the choice.
 * ============================================================
 */

"use client";

import {
  CHECKOUT_THEME,
  SHIPPING_OPTIONS,
  type ShippingOption,
} from "./constants";
import SheetHeader from "./SheetHeader";

interface ShippingSheetProps {
  selectedShipping: ShippingOption | null;
  onSelect: (option: ShippingOption) => void;
  onClose: () => void;
}

export default function ShippingSheet({
  selectedShipping,
  onSelect,
  onClose,
}: ShippingSheetProps) {
  return (
    <div className="flex-1 flex flex-col pb-6 overflow-y-auto cart-drawer-scroll">
      <SheetHeader
        title="Shipping Options"
        subtitle="Select your preferred shipping plan"
        onClose={onClose}
      />

      <div className="flex px-6 flex-col gap-3">
        {(Object.keys(SHIPPING_OPTIONS) as ShippingOption[]).map((key) => {
          const opt = SHIPPING_OPTIONS[key];
          const isSelected = selectedShipping === key;

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="w-full flex items-center justify-between p-4 py-3 rounded-xl text-left border transition-all hover:bg-black/5"
              style={{
                borderColor: isSelected
                  ? CHECKOUT_THEME.primaryColor
                  : "var(--color-sand)",
                background: isSelected ? "rgba(0,0,0,0.02)" : "transparent",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Radio circle */}
                <div
                  className="w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors"
                  style={{
                    borderColor: isSelected
                      ? CHECKOUT_THEME.primaryColor
                      : "var(--color-taupe)",
                    background: isSelected
                      ? CHECKOUT_THEME.primaryColor
                      : "transparent",
                  }}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <p
                    className="font-medium text-[15px]"
                    style={{ color: "var(--color-graphite)" }}
                  >
                    {opt.title}
                  </p>
                  <p
                    className="text-[13px] mt-0.5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Delivery: {opt.text}
                  </p>
                </div>
              </div>
              <span
                className="font-medium text-[15px]"
                style={{ color: "var(--color-graphite)" }}
              >
                {opt.price}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
