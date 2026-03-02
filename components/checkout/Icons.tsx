/**
 * ============================================================
 * CHECKOUT ICONS
 * ============================================================
 *
 * Reusable SVG icon components used throughout the checkout drawer.
 * Each is a lightweight functional component — no external deps.
 *
 * Why a shared file?
 * → The close (×), chevron (>), plus (+), minus (−), and trash
 *   icons were previously duplicated 2-8× across the monolith.
 *   Now there's a single source of truth for each.
 * ============================================================
 */

/* ─── Shared prop type ──────────────────────────────────────── */

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/* ─── Close "×" icon ────────────────────────────────────────── */

export function CloseIcon({
  size = 14,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Chevron ">" icon (rotatable via CSS) ──────────────────── */

export function ChevronIcon({
  size = 16,
  color = "var(--color-taupe)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ─── Chevron Down "∨" icon ─────────────────────────────────── */

export function ChevronDownIcon({
  size = 10,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ─── Plus "+" icon ─────────────────────────────────────────── */

export function PlusIcon({
  size = 10,
  color = "var(--color-charcoal)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─── Minus "−" icon ────────────────────────────────────────── */

export function MinusIcon({
  size = 10,
  color = "var(--color-charcoal)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─── Trash (filled) icon — shown when qty is 1 ────────────── */

export function TrashIcon({
  size = 10,
  color = "var(--color-charcoal)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M3 6h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" fill={color} />
      <line
        x1="10"
        y1="10"
        x2="10"
        y2="18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="10"
        x2="14"
        y2="18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Shopping Bag icon (empty-state) ───────────────────────── */

export function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="36"
      viewBox="0 0 22 24"
      fill="none"
      stroke="var(--color-taupe)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 8h16l-1.4 12H4.4L3 8Z" />
      <path d="M7 8V7a4 4 0 1 1 8 0v1" />
    </svg>
  );
}

/* ─── Walmart Logo ──────────────────────────────────────────── */

export function WalmartLogo({ color }: { color?: string } = {}) {
  const sparkFill = color ?? "#FFC220";
  const textFill = color ?? "#0053E2";

  return (
    <svg
      width="152"
      height="36"
      viewBox="0 0 152 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "28px", width: "auto", transition: "filter 0.8s ease" }}
    >
      <mask
        id="mask0_0_871"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="120"
        y="0"
        width="32"
        height="36"
      >
        <rect x="120.158" width="31.8421" height="36" fill="white" />
      </mask>
      <g mask="url(#mask0_0_871)">
        <path
          d="M142.632 16.3674C143.38 16.2132 149.999 13.1778 150.59 12.8364C151.939 12.057 152.401 10.3308 151.622 8.98137C150.843 7.63137 149.118 7.16877 147.77 7.94817C147.179 8.28957 141.243 12.5088 140.736 13.08C140.154 13.7352 140.054 14.6718 140.484 15.417C140.914 16.1628 141.774 16.5438 142.632 16.3674Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M150.59 23.088C149.999 22.7472 143.38 19.7112 142.632 19.5576C141.774 19.3806 140.914 19.7616 140.484 20.5074C140.054 21.2532 140.154 22.1904 140.736 22.8444C141.243 23.4156 147.179 27.6354 147.77 27.9762C149.119 28.7562 150.843 28.293 151.622 26.9436C152.401 25.5936 151.938 23.8674 150.59 23.088Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M136.08 23.0526C135.219 23.0526 134.459 23.6082 134.183 24.4392C133.943 25.1652 133.26 32.4192 133.26 33.102C133.26 34.6602 134.522 35.9244 136.08 35.9244C137.638 35.9244 138.9 34.6608 138.9 33.102C138.9 32.4192 138.217 25.1646 137.976 24.4392C137.7 23.6076 136.94 23.0526 136.08 23.0526V23.0526Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M129.526 19.5576C128.779 19.7112 122.159 22.7466 121.569 23.088C120.219 23.868 119.758 25.5942 120.537 26.9436C121.315 28.2936 123.04 28.7562 124.389 27.9762C124.979 27.6348 130.915 23.4156 131.423 22.8444C132.005 22.1892 132.105 21.2532 131.675 20.5074C131.245 19.7622 130.384 19.3806 129.526 19.5576V19.5576Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M124.388 7.94817C123.039 7.16877 121.315 7.63137 120.536 8.98137C119.757 10.3314 120.22 12.0576 121.568 12.8364C122.159 13.1778 128.778 16.2132 129.526 16.3674C130.384 16.5438 131.244 16.1634 131.675 15.417C132.105 14.6718 132.004 13.7346 131.423 13.08C130.915 12.5088 124.979 8.28957 124.388 7.94817Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M136.08 0C134.522 0 133.26 1.26336 133.26 2.82246C133.26 3.50508 133.943 10.7598 134.183 11.4858C134.459 12.3174 135.219 12.8724 136.08 12.8724C136.94 12.8724 137.7 12.3168 137.976 11.4858C138.217 10.7598 138.9 3.50568 138.9 2.82246C138.9 1.26396 137.638 0 136.08 0V0Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
      </g>
      <mask
        id="mask1_0_871"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="7"
        width="110"
        height="22"
      >
        <rect y="7.80005" width="109.345" height="20.4" fill="white" />
      </mask>
      <g mask="url(#mask1_0_871)">
        <path
          d="M21.5111 7.80005L18.8819 20.859L15.9319 7.80005H10.8085L7.85846 20.859L5.23082 7.80005H0L4.26541 27.7482H10.3526L13.3303 14.5032L16.3079 27.7482H22.2616L26.4994 7.80005H21.5111Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.5397 13.3326C27.3715 12.5628 29.651 11.4714 32.8971 11.4714H32.8953C37.2943 11.4714 39.6548 13.4664 39.6548 17.961V27.7494H34.667V25.707C33.91 27.1374 32.5276 28.2018 30.2139 28.2018C27.4515 28.2018 25.5466 26.526 25.5466 23.6538C25.5466 20.5428 27.6389 19.2384 31.2593 18.4938C33.6475 17.9886 34.5054 17.6688 34.5054 16.8714C34.5054 15.9402 33.8884 15.4878 32.2266 15.4878C29.5434 15.4878 27.5049 16.7376 26.5397 17.5884V13.3326ZM30.3755 23.2806C30.3755 24.264 31.0184 24.9822 32.1989 24.9822H32.2001C33.594 24.9822 34.4796 24.0252 34.4796 22.3494V20.1426C34.0254 20.5362 33.3531 20.796 32.682 21.0462C31.3945 21.4986 30.3755 22.0038 30.3755 23.2806Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M46.6998 7.80005H41.5227V27.7482H46.6998V7.80005Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M67.4753 11.5249C64.9634 11.5249 63.3401 13.0213 62.4918 15.0151C62.0363 12.8791 60.5235 11.5249 58.4087 11.5249C56.014 11.5249 54.4531 12.9097 53.6619 14.8549V11.9767H48.5659V27.7495H53.743V18.9997C53.743 16.8457 54.4675 15.6223 56.0224 15.6223C57.2823 15.6223 57.7124 16.4731 57.7124 17.8033V27.7513H62.8895V19.0009C62.8895 16.8475 63.6134 15.6235 65.1683 15.6235C66.4288 15.6235 66.8583 16.4743 66.8583 17.8045V27.7531H72.0354V17.0833C72.0354 13.7587 70.4529 11.5249 67.4753 11.5249V11.5249Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M74.1525 13.3326C74.9846 12.5628 77.2641 11.4714 80.5102 11.4714H80.5084C84.9074 11.4714 87.2679 13.4664 87.2679 17.961V27.7494H82.2801V25.707C81.5231 27.1374 80.1407 28.2018 77.827 28.2018C75.0645 28.2018 73.1594 26.526 73.1594 23.6538C73.1594 20.5428 75.252 19.2384 78.8724 18.4938C81.2605 17.9886 82.1185 17.6688 82.1185 16.8714C82.1185 15.9402 81.5015 15.4878 79.8397 15.4878C77.1565 15.4878 75.118 16.7376 74.1525 17.5884V13.3326ZM77.9898 23.2806C77.9898 24.264 78.6333 24.9822 79.8132 24.9822C81.2089 24.9822 82.0945 24.0252 82.0945 22.3494V20.1426C81.6402 20.5362 80.968 20.796 80.2969 21.0462C79.0094 21.4986 77.9898 22.0038 77.9898 23.2806Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M94.1091 16.4323V11.9767H89.0396V27.7495H94.2166V21.0463C94.2166 17.9611 96.1476 17.1361 97.9986 17.1361C98.6156 17.1361 99.205 17.2153 99.4736 17.2963V11.8699C96.5609 11.7313 94.7916 13.5751 94.1091 16.4323Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M109.345 15.966V11.9766H106.046V8.91724H100.869V22.4814C100.869 26.2854 103.041 28.0674 106.502 28.0674C108.112 28.0674 108.97 27.7476 109.345 27.5088V23.5452C109.05 23.7588 108.566 23.9184 107.949 23.9184C106.797 23.9442 106.045 23.439 106.045 21.765V15.966H109.343H109.345Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
      </g>
    </svg>
  );
}

/* ─── Delivery Method Icons ─────────────────────────────────── */

import type { DeliveryTab } from "./types";

/** Delivery method badge — Door / Pickup (uses same icons as the delivery sheet tabs) */
export function DeliveryMethodIcon({ type }: { type: DeliveryTab }) {
  return (
    <div
      className="w-8 h-7 rounded-md flex items-center justify-center"
      style={{
        background: "rgba(0,83,226,0.08)",
        border: "1px solid rgba(0,83,226,0.2)",
      }}
    >
      <img
        src={
          type === "door" ? "/icons/wmt_doorstep.svg" : "/icons/wmt_pickup.svg"
        }
        alt={type === "door" ? "Doorstep" : "Pickup"}
        className="w-5 h-5"
      />
    </div>
  );
}

/* ─── Card Brand Icons ──────────────────────────────────────── */

import { CHECKOUT_THEME } from "./constants";
import type { CardBrand } from "./utils";

/** Card brand badge — Visa / Mastercard / generic fallback */
export function CardBrandIcon({ brand }: { brand: CardBrand }) {
  if (brand === "visa") {
    return (
      <div
        className="w-8 h-5 rounded-md flex items-center justify-center"
        style={{
          background: "rgba(0,83,226,0.08)",
          border: "1px solid rgba(0,83,226,0.2)",
        }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M3 9 7 1h2.1L5.1 9H3Z" fill={CHECKOUT_THEME.primaryColor} />
          <path
            d="M8.2 9 12.2 1h2.1l-4 8H8.2Z"
            fill={CHECKOUT_THEME.primaryColor}
            opacity="0.65"
          />
        </svg>
      </div>
    );
  }

  if (brand === "mastercard") {
    return (
      <div
        className="w-8 h-5 rounded-md flex items-center justify-center"
        style={{
          background: "rgba(0,0,0,0.03)",
          border: "1px solid var(--color-sand)",
        }}
      >
        <div className="relative w-4.5 h-3">
          <span
            className="absolute left-0 top-0 w-3 h-3 rounded-full"
            style={{ background: "#EA001B" }}
          />
          <span
            className="absolute left-1.5 top-0 w-3 h-3 rounded-full"
            style={{ background: "#FF9900", opacity: 0.95 }}
          />
        </div>
      </div>
    );
  }

  // Generic card fallback
  return (
    <div
      className="w-8 h-5 rounded-md flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.03)",
        border: "1px solid var(--color-sand)",
      }}
    >
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <rect
          x="1"
          y="1"
          width="12"
          height="8"
          rx="2"
          stroke="var(--color-muted)"
          strokeWidth="1"
        />
        <path d="M1 4h12" stroke="var(--color-muted)" strokeWidth="1" />
      </svg>
    </div>
  );
}
