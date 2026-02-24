/**
 * ============================================================
 * CHECKOUT DRAWER — Main Orchestrator
 * ============================================================
 *
 * This is the top-level component that owns:
 *   1. Drawer open/close animation
 *   2. Cart item list rendering
 *   3. Footer section buttons (Shipping, Delivery, Payment, Est Total)
 *   4. Sheet routing — delegates to the appropriate sheet component
 *
 * Each sheet's internal UI lives in its own file under ./
 *
 * File map (all in components/checkout/):
 *   constants.ts        — Theme, shipping tiers, pickup stations, timeframes
 *   types.ts             — Shared TS types
 *   utils.ts             — Pure utility functions (card, date, currency)
 *   Icons.tsx             — All SVG icons (single source of truth)
 *   QuantityStepper.tsx   — Reusable [−] n [+] pill
 *   SheetWrapper.tsx      — Backdrop + slide animation container
 *   SheetHeader.tsx       — Title + subtitle + close button
 *   SheetFooterButton.tsx — Sticky CTA at sheet bottom
 *   ShippingSheet.tsx     — Shipping tier picker
 *   DeliverySheet.tsx     — Door / Pickup delivery form
 *   PaymentSheet.tsx      — Credit card form
 *   EstimateSheet.tsx     — Order total breakdown
 *   ProductDetailSheet.tsx — Cart item detail editor
 * ============================================================
 */

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "../CartContext";

/* ── checkout module imports ── */
import {
  CHECKOUT_THEME,
  ESTIMATED_TAX_RATE,
  SHIPPING_COST_BY_OPTION,
  SHIPPING_OPTIONS,
  type ShippingOption,
} from "./constants";
import DeliverySheet from "./DeliverySheet";
import EstimateSheet from "./EstimateSheet";
import {
  CardBrandIcon,
  ChevronDownIcon,
  ChevronIcon,
  CloseIcon,
  ShoppingBagIcon,
  WalmartLogo,
} from "./Icons";
import PaymentSheet from "./PaymentSheet";
import ProductDetailSheet from "./ProductDetailSheet";
import QuantityStepper from "./QuantityStepper";
import SheetWrapper from "./SheetWrapper";
import ShippingSheet from "./ShippingSheet";
import type { DeliverySummary, PaymentSummary, SheetType } from "./types";
import type { CardBrand } from "./utils";
import { formatCurrency, getArrivalDate } from "./utils";

/* ================================================================
   COMPONENT
   ================================================================ */

export default function CheckoutDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isCheckoutOpen,
    closeCheckout,
    removeCartItem,
    addItem,
    incrementItem,
    decrementItem,
  } = useCart();

  /* ── drawer animation state ── */
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [removingKeys, setRemovingKeys] = useState<Set<string>>(new Set());
  const drawerRef = useRef<HTMLDivElement>(null);

  /* ── sheet state ── */
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const [sheetAnimatingOut, setSheetAnimatingOut] = useState(false);

  const closeSheet = useCallback(() => {
    setSheetAnimatingOut(true);
    setTimeout(() => {
      setActiveSheet(null);
      setSheetAnimatingOut(false);
    }, 350);
  }, []);

  /* ── persisted selections ── */
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);
  const [selectedDeliverySummary, setSelectedDeliverySummary] =
    useState<DeliverySummary | null>(null);
  const [selectedPaymentSummary, setSelectedPaymentSummary] =
    useState<PaymentSummary | null>(null);

  /* ── payment form state ── */
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiry: "",
    cvv: "",
  });

  /* ── product detail sheet state ── */
  const [selectedCartItemKey, setSelectedCartItemKey] = useState<string | null>(
    null,
  );
  const selectedCartItem =
    items.find((i) => i.key === selectedCartItemKey) ?? null;

  const openProductSheet = useCallback((item: (typeof items)[number]) => {
    setSelectedCartItemKey(item.key);
    setActiveSheet("product");
  }, []);

  /* ── derived calculations ── */
  const completedSteps =
    1 + // items in cart
    (selectedShipping ? 1 : 0) +
    (selectedDeliverySummary ? 1 : 0) +
    (selectedPaymentSummary ? 1 : 0);
  const totalSteps = 4;
  const progressPercent = (completedSteps / totalSteps) * 100;
  const isCheckoutReady =
    !!selectedShipping && !!selectedDeliverySummary && !!selectedPaymentSummary;

  const shippingCost = selectedShipping
    ? SHIPPING_COST_BY_OPTION[selectedShipping]
    : 0;
  const estimatedTaxes = Number((subtotal * ESTIMATED_TAX_RATE).toFixed(2));
  const estimatedTotal = Number(
    (subtotal + shippingCost + estimatedTaxes).toFixed(2),
  );
  const itemLabel = `${totalItems} item${totalItems === 1 ? "" : "s"}`;

  /* ── drawer mount / unmount animation ── */
  useEffect(() => {
    if (isCheckoutOpen) {
      setVisible(true);
      setAnimatingOut(false);
    } else if (visible) {
      setAnimatingOut(true);
      const t = setTimeout(() => {
        setVisible(false);
        setAnimatingOut(false);
      }, 380);
      return () => clearTimeout(t);
    }
  }, [isCheckoutOpen, visible]);

  /* ── ESC to close ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCheckout();
    };
    if (isCheckoutOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isCheckoutOpen, closeCheckout]);

  if (!visible) return null;

  const isClosing = animatingOut;

  /* ================================================================
     SHEET ACTION HANDLERS
     ================================================================ */

  const handleSelectShipping = (option: ShippingOption) => {
    setSelectedShipping(option);
    closeSheet();
  };

  const handleConfirmDelivery = (summary: DeliverySummary) => {
    setSelectedDeliverySummary(summary);
    closeSheet();
  };

  const handleSavePayment = (brand: CardBrand, last4: string) => {
    setSelectedPaymentSummary({ brand, last4 });
    closeSheet();
  };

  const handleUpdateProduct = (colorIdx: number, newSize: string) => {
    if (!selectedCartItem) return;
    const qty = selectedCartItem.quantity;
    removeCartItem(selectedCartItem.key);
    for (let q = 0; q < qty; q++) {
      addItem(selectedCartItem.product, colorIdx, newSize);
    }
    closeSheet();
  };

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <>
      {/* ─── Backdrop ─── */}
      <div
        className="fixed inset-0 z-998"
        style={{
          background: "rgba(26, 26, 26, 0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          animation: isClosing
            ? "backdropFadeOut 0.32s ease forwards"
            : "backdropFadeIn 0.35s ease forwards",
        }}
        onClick={closeCheckout}
        aria-hidden="true"
      />

      {/* ─── Drawer Panel ─── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping bag"
        aria-modal="true"
        className="fixed top-0 right-0 z-999 flex flex-col"
        style={{
          height: "calc(100vh - 24px)",
          width: "min(360px, calc(100vw - 24px))",
          background: "var(--color-ivory)",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
          margin: "12px",
          borderRadius: "16px",
          animation: isClosing
            ? "drawerSlideOut 0.35s cubic-bezier(0.4, 0, 0.7, 0.2) forwards"
            : "drawerSlideIn 0.45s cubic-bezier(0.32, 0.72, 0, 1) forwards",
          transition:
            "transform 0.45s cubic-bezier(0.32, 0.72, 0, 1), filter 0.45s ease",
        }}
      >
        {/* ─── Header ─── */}
        <div
          className="flex flex-col px-6 py-4"
          style={{ borderBottom: "1px solid var(--color-sand)" }}
        >
          {/* Progress bar */}
          <div
            className="w-full flex items-center h-1.5 rounded-full overflow-hidden mb-4"
            style={{ background: "var(--color-cream)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: CHECKOUT_THEME.primaryColor,
              }}
            />
          </div>

          <div className="relative flex items-center justify-center">
            <div className="flex items-center gap-2">
              <WalmartLogo />
            </div>
            <button
              onClick={closeCheckout}
              className="absolute right-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 active:scale-90"
              style={{ background: "rgba(0,0,0,0.05)" }}
              aria-label="Close bag"
            >
              <CloseIcon size={16} color="var(--color-charcoal)" />
            </button>
          </div>
        </div>

        {/* ─── Body ─── */}
        {items.length === 0 ? (
          <EmptyState onClose={closeCheckout} />
        ) : (
          <div
            className="flex-1 overflow-y-auto px-5 py-4 cart-drawer-scroll"
            style={{ overscrollBehavior: "contain" }}
          >
            <div className="flex flex-col gap-1">
              {items.map((item, idx) => (
                <CartItemRow
                  key={item.key}
                  item={item}
                  index={idx}
                  isRemoving={removingKeys.has(item.key)}
                  onDecrement={() => decrementItem(item.key)}
                  onIncrement={() => incrementItem(item.key)}
                  onClick={() => openProductSheet(item)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── Footer Sections ─── */}
        {items.length > 0 && (
          <div
            className="mt-auto px-6 pt-2 pb-4 flex flex-col"
            style={{ borderTop: "1px solid var(--color-sand)" }}
          >
            {/* Shipping */}
            <FooterRow
              title="Shipping"
              subtitle={
                selectedShipping
                  ? `${SHIPPING_OPTIONS[selectedShipping].title} • Arrives ${getArrivalDate(SHIPPING_OPTIONS[selectedShipping].days)}`
                  : "Click to select shipping option"
              }
              hasValue={!!selectedShipping}
              onClick={() => setActiveSheet("shipping")}
            />
            <Divider />

            {/* Delivery */}
            <FooterRow
              title="Delivery"
              subtitle={
                selectedDeliverySummary
                  ? selectedDeliverySummary.title
                  : "Click to add delivery details"
              }
              extraText={selectedDeliverySummary?.subtitle}
              hasValue={!!selectedDeliverySummary}
              onClick={() => setActiveSheet("delivery")}
            />
            <Divider />

            {/* Payment */}
            <button
              onClick={() => setActiveSheet("payment")}
              className="flex items-center justify-between py-2.5 group text-left transition-colors hover:bg-black/5 rounded-lg -mx-2 px-2"
            >
              <div>
                <p
                  className="text-[15px] font-semibold"
                  style={{
                    fontFamily: CHECKOUT_THEME.fontFamily,
                    color: "var(--color-graphite)",
                  }}
                >
                  Payment
                </p>
                {selectedPaymentSummary ? (
                  <div className="flex items-center gap-2 mt-1">
                    <CardBrandIcon brand={selectedPaymentSummary.brand} />
                    <p
                      className="text-[12px]"
                      style={{
                        color: "var(--color-graphite)",
                        fontWeight: 500,
                      }}
                    >
                      {`${selectedPaymentSummary.brand === "mastercard" ? "Mastercard" : "Visa"} •••• ${selectedPaymentSummary.last4}`}
                    </p>
                  </div>
                ) : (
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Click to add payment method
                  </p>
                )}
              </div>
              <ChevronIcon className="transition-transform group-hover:translate-x-1" />
            </button>
            <Divider />

            {/* Est Total */}
            <button
              onClick={() => setActiveSheet("estimate")}
              className="flex items-center justify-between py-3 group text-left transition-colors hover:bg-black/5 rounded-lg -mx-2 px-2"
            >
              <p
                className="text-[15px] font-semibold"
                style={{
                  fontFamily: CHECKOUT_THEME.fontFamily,
                  color: "var(--color-graphite)",
                }}
              >
                Est Total
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-[16px] font-medium tracking-wide"
                  style={{ color: "var(--color-graphite)" }}
                >
                  {formatCurrency(estimatedTotal)}
                </span>
                <ChevronIcon
                  color="var(--color-graphite)"
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </button>

            {/* Checkout CTA */}
            <button
              onClick={() => {}}
              disabled={!isCheckoutReady}
              className="btn-press w-full mt-1 mb-1 py-3.5 rounded-full text-[13px] tracking-[0.18em] uppercase font-medium transition-all duration-300"
              style={{
                background: CHECKOUT_THEME.primaryColor,
                color: "var(--color-ivory)",
                opacity: isCheckoutReady ? 1 : 0.45,
                cursor: isCheckoutReady ? "pointer" : "not-allowed",
              }}
            >
              Checkout
            </button>
          </div>
        )}

        {/* ─── Bottom Sheet Overlay ─── */}
        {activeSheet && (
          <SheetWrapper animatingOut={sheetAnimatingOut} onClose={closeSheet}>
            {activeSheet === "shipping" && (
              <ShippingSheet
                selectedShipping={selectedShipping}
                onSelect={handleSelectShipping}
                onClose={closeSheet}
              />
            )}

            {activeSheet === "estimate" && (
              <EstimateSheet
                subtotal={subtotal}
                shippingCost={shippingCost}
                estimatedTaxes={estimatedTaxes}
                estimatedTotal={estimatedTotal}
                itemLabel={itemLabel}
                onClose={closeSheet}
              />
            )}

            {activeSheet === "payment" && (
              <PaymentSheet
                paymentDetails={paymentDetails}
                onChange={setPaymentDetails}
                onSave={handleSavePayment}
                onClose={closeSheet}
              />
            )}

            {activeSheet === "product" && selectedCartItem && (
              <ProductDetailSheet
                item={selectedCartItem}
                onDecrement={decrementItem}
                onIncrement={incrementItem}
                onUpdate={handleUpdateProduct}
              />
            )}

            {activeSheet === "delivery" && (
              <DeliverySheet
                onConfirm={handleConfirmDelivery}
                onClose={closeSheet}
              />
            )}
          </SheetWrapper>
        )}
      </div>
    </>
  );
}

/* ================================================================
   PRIVATE SUB-COMPONENTS
   ================================================================ */

/** Empty bag illustration + "Continue Shopping" CTA */
function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <div
        className="mb-6 flex items-center justify-center w-20 h-20 rounded-full"
        style={{ background: "var(--color-cream)" }}
      >
        <ShoppingBagIcon />
      </div>
      <p
        className="text-lg mb-2"
        style={{
          fontFamily: CHECKOUT_THEME.fontFamily,
          color: "var(--color-graphite)",
          fontWeight: 500,
        }}
      >
        Your bag is empty
      </p>
      <p
        className="text-[13px] leading-relaxed mb-8"
        style={{ color: "var(--color-muted)" }}
      >
        Discover our curated collection
        <br />
        and find something you love.
      </p>
      <button
        onClick={onClose}
        className="btn-press px-8 py-3 rounded-lg text-[12px] tracking-[0.15em] uppercase font-medium"
        style={{
          background: CHECKOUT_THEME.primaryColor,
          color: "var(--color-ivory)",
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

/** Single cart item row */
function CartItemRow({
  item,
  index,
  isRemoving,
  onDecrement,
  onIncrement,
  onClick,
}: {
  item: ReturnType<typeof useCart>["items"][number];
  index: number;
  isRemoving: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  onClick: () => void;
}) {
  const color = item.product.colors[item.colorIdx];

  return (
    <div
      className="relative rounded-xl p-3 transition-all duration-300 cursor-pointer"
      style={{
        background: "rgba(0,0,0,0.02)",
        animation: isRemoving
          ? "cartItemRemove 0.32s ease forwards"
          : `cartItemEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s both`,
      }}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div
          className="relative shrink-0 w-[65px] h-[65px] rounded-lg overflow-hidden"
          style={{ background: "var(--color-sand)" }}
        >
          <Image
            src={color.image}
            alt={`${item.product.name} - ${color.name}`}
            width={65}
            height={65}
            className="h-full w-full object-cover aspect-square"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col py-0.5">
          <div className="flex items-start justify-between mb-2">
            <p
              className="text-[15px] leading-snug truncate pr-8"
              style={{
                fontFamily: CHECKOUT_THEME.fontFamily,
                color: "var(--color-graphite)",
                fontWeight: 600,
              }}
            >
              {item.product.name}
            </p>
            <p
              className="text-[14px] font-medium tracking-wide shrink-0"
              style={{ color: "var(--color-charcoal)" }}
            >
              ${item.product.price * item.quantity}
            </p>
          </div>

          {/* Attribute pills row */}
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            {/* Quantity stepper */}
            <QuantityStepper
              quantity={item.quantity}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
              size="sm"
            />

            {/* Size pill */}
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors hover:bg-black/5"
              style={{
                background: "rgba(0,0,0,0.03)",
                color: "var(--color-charcoal)",
              }}
            >
              {item.selectedSize}
              <ChevronDownIcon />
            </button>

            {/* Color pill */}
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors hover:bg-black/5"
              style={{
                background: "rgba(0,0,0,0.03)",
                color: "var(--color-charcoal)",
              }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{
                  background: color.hex,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Footer row — Shipping, Delivery, etc. */
function FooterRow({
  title,
  subtitle,
  extraText,
  hasValue,
  onClick,
}: {
  title: string;
  subtitle: string;
  extraText?: string;
  hasValue: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between py-2.5 group text-left transition-colors hover:bg-black/5 rounded-lg -mx-2 px-2"
    >
      <div>
        <p
          className="text-[15px] font-semibold"
          style={{
            fontFamily: CHECKOUT_THEME.fontFamily,
            color: "var(--color-graphite)",
          }}
        >
          {title}
        </p>
        <div className="flex flex-row gap-0.5 mt-0.5">
          <p
            className="text-[12px]"
            style={{
              color: hasValue ? "var(--color-graphite)" : "var(--color-muted)",
              fontWeight: hasValue ? 500 : 400,
            }}
          >
            {subtitle}
          </p>
          {extraText && (
            <p
              className="text-[11.5px]"
              style={{ color: "var(--color-graphite)" }}
            >
              • {extraText}
            </p>
          )}
        </div>
      </div>
      <ChevronIcon className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

/** Thin divider between footer rows */
function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{ background: "var(--color-sand)", opacity: 0.5 }}
    />
  );
}
