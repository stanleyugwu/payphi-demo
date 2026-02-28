/**
 * ============================================================
 * PAYMENT SHEET
 * ============================================================
 *
 * Credit card entry form with:
 *   • Live card-brand detection (Visa / Mastercard)
 *   • Masked preview card at the top
 *   • Validation-gated "Save Payment Method" CTA
 * ============================================================
 */

"use client";

import { CHECKOUT_THEME } from "./constants";
import { CardBrandIcon } from "./Icons";
import SheetFooterButton from "./SheetFooterButton";
import SheetHeader from "./SheetHeader";
import {
  type CardBrand,
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  isValidExpiry,
} from "./utils";

interface PaymentSheetProps {
  paymentDetails: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvv: string;
  };
  onChange: (
    updater: (
      prev: PaymentSheetProps["paymentDetails"],
    ) => PaymentSheetProps["paymentDetails"],
  ) => void;
  onSave: (brand: CardBrand, last4: string) => void;
  onClose: () => void;
}

export default function PaymentSheet({
  paymentDetails,
  onChange,
  onSave,
  onClose,
}: PaymentSheetProps) {
  /* ── derived card state ── */
  const cardDigits = paymentDetails.cardNumber.replace(/\D/g, "");
  const cardBrand = detectCardBrand(cardDigits);
  const isSupportedCard = cardBrand === "visa" || cardBrand === "mastercard";
  const isCardNumberValid = cardDigits.length === 16 && isSupportedCard;
  const isCardholderNameValid =
    paymentDetails.cardholderName.trim().length >= 2;
  const isCardExpiryValid = isValidExpiry(paymentDetails.expiry);
  const isCardCvvValid = /^\d{3,4}$/.test(paymentDetails.cvv);
  const isFormValid =
    isCardNumberValid &&
    isCardholderNameValid &&
    isCardExpiryValid &&
    isCardCvvValid;
  const cardLast4 = cardDigits.slice(-4);
  const maskedCardNumber = cardDigits
    ? `•••• •••• •••• ${cardLast4 || "••••"}`
    : "•••• •••• •••• ••••";

  const handleSave = () => {
    if (!isFormValid || !cardLast4) return;
    onSave(cardBrand, cardLast4);
  };

  return (
    <div className="flex-1 flex flex-col pt-2 bg-white rounded-t-[24px] overflow-hidden">
      <SheetHeader
        title="Payment"
        subtitle="Add your card details to continue"
        onClose={onClose}
      />

      {/* Scrollable form area */}
      <div className="flex-1 overflow-y-auto cart-drawer-scroll px-6 pb-24">
        {/* Card preview */}
        <div
          className="rounded-xl p-4 mb-4"
          style={{
            border: "1px solid var(--color-sand)",
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <p
              className="text-[12px] uppercase tracking-[0.12em] font-medium"
              style={{ color: "var(--color-muted)" }}
            >
              Card
            </p>
            <CardBrandIcon brand={cardBrand} />
          </div>
          <p
            className="text-[16px] tracking-[0.15em] font-medium"
            style={{
              fontFamily: CHECKOUT_THEME.fontFamily,
              color: "var(--color-graphite)",
            }}
          >
            {maskedCardNumber}
          </p>
          <p
            className="text-[12px] mt-2 uppercase tracking-[0.08em]"
            style={{ color: "var(--color-muted)" }}
          >
            {paymentDetails.cardholderName || "CARDHOLDER NAME"}
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-3">
          {/* Card number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-gray-600">
              Card number
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    cardNumber: formatCardNumber(e.target.value),
                  }))
                }
                className="w-full px-4 py-3 pr-[84px] rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-gray-800 transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <CardBrandIcon brand={cardBrand} />
              </div>
            </div>
            {cardDigits.length > 0 && !isSupportedCard && (
              <p
                className="text-[11px]"
                style={{ color: "var(--color-muted)" }}
              >
                Enter a Visa or Mastercard number.
              </p>
            )}
          </div>

          {/* Cardholder name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-gray-600">
              Cardholder name
            </label>
            <input
              type="text"
              autoComplete="cc-name"
              placeholder="John Doe"
              value={paymentDetails.cardholderName}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  cardholderName: e.target.value,
                }))
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-gray-800 transition-colors"
            />
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-gray-600">
                Expiry
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                value={paymentDetails.expiry}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    expiry: formatExpiry(e.target.value),
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-gray-800 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-gray-600">
                CVV
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-gray-800 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <SheetFooterButton
        label="Save payment method"
        onClick={handleSave}
        disabled={!isFormValid}
      />
    </div>
  );
}
