/**
 * ============================================================
 * ESTIMATE SHEET
 * ============================================================
 *
 * Read-only breakdown of the order total:
 *   Subtotal → Shipping → Taxes → Estimated Total
 * ============================================================
 */

"use client";

import { CHECKOUT_THEME } from "./constants";
import { formatCurrency } from "./utils";

interface EstimateSheetProps {
  subtotal: number;
  shippingCost: number;
  estimatedTaxes: number;
  estimatedTotal: number;
  itemLabel: string;
  onClose: () => void;
}

export default function EstimateSheet({
  subtotal,
  shippingCost,
  estimatedTaxes,
  estimatedTotal,
  itemLabel,
  onClose,
}: EstimateSheetProps) {
  return (
    <div className="flex-1 flex flex-col px-6 pb-6 pt-5">
      <h3
        className="text-[20px] font-medium leading-none"
        style={{ color: "var(--color-graphite)", fontWeight: "600" }}
      >
        Estimated Total
      </h3>

      <div className="mt-8 space-y-3">
        {/* Subtotal */}
        <LineItem
          label={`Subtotal (${itemLabel})`}
          value={formatCurrency(subtotal)}
          labelWeight={600}
        />

        {/* Shipping */}
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-[15px]"
            style={{
              fontFamily: CHECKOUT_THEME.fontFamily,
              color: "var(--color-graphite)",
            }}
          >
            Shipping
          </p>
          <p
            className="text-[15px] font-semibold"
            style={{
              fontFamily: CHECKOUT_THEME.fontFamily,
              color:
                shippingCost === 0
                  ? "var(--color-gold)"
                  : "var(--color-graphite)",
            }}
          >
            {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
          </p>
        </div>

        {/* Taxes */}
        <LineItem
          label="Estimated taxes"
          value={formatCurrency(estimatedTaxes)}
          labelWeight={600}
        />

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: "var(--color-sand)", opacity: 0.8 }}
        />

        {/* Total */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <p
            className="text-[15px] font-semibold"
            style={{
              fontFamily: CHECKOUT_THEME.fontFamily,
              color: "var(--color-graphite)",
            }}
          >
            Estimated total
          </p>
          <p
            className="text-[15px] font-bold"
            style={{
              fontFamily: CHECKOUT_THEME.fontFamily,
              color: "var(--color-graphite)",
            }}
          >
            {formatCurrency(estimatedTotal)}
          </p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="btn-press w-full mt-auto py-3.5 rounded-full text-[13px] tracking-[0.15em] uppercase font-medium transition-all"
        style={{
          background: CHECKOUT_THEME.primaryColor,
          color: "var(--color-ivory)",
          fontFamily: CHECKOUT_THEME.fontFamily,
        }}
      >
        Close
      </button>
    </div>
  );
}

/* ─── Helper: single line in the breakdown ──────────────────── */

function LineItem({
  label,
  value,
  labelWeight = 400,
}: {
  label: string;
  value: string;
  labelWeight?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p
        className="text-[15px]"
        style={{
          fontFamily: CHECKOUT_THEME.fontFamily,
          color: "var(--color-graphite)",
          fontWeight: labelWeight,
        }}
      >
        {label}
      </p>
      <p
        className="text-[15px] font-medium"
        style={{
          fontFamily: CHECKOUT_THEME.fontFamily,
          color: "var(--color-graphite)",
        }}
      >
        {value}
      </p>
    </div>
  );
}
