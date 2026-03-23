/**
 * ============================================================
 * CHECKOUT CONSTANTS
 * ============================================================
 *
 * All static configuration for the checkout drawer lives here.
 * Change theme colors, shipping tiers, pickup locations, or
 * time-slot pricing in one place — every component picks it up.
 *
 * Sections:
 *   1. Theme (colors, fonts)
 *   2. Shipping Options & Costs
 *   3. Pickup Stations
 *   4. Timeframes
 *   5. Tax Rate
 * ============================================================
 */

import { DeliveryOption } from "./types";

/* ─── 1. Theme ──────────────────────────────────────────────── */

export interface PlatformTheme {
  /** Primary brand accent color */
  primaryColor: string;
  /** Font stack */
  fontFamily: string;
  /** Which logo component to render */
  logo: "walmart" | "reformation" | "wayfair" | "target";
  /** Delivery-tab pickup icon path (relative to /public) */
  pickupIcon?: string;
  /** Delivery-tab doorstep icon path (relative to /public) */
  doorstepIcon?: string;
  /** When true → pill buttons, large corner radii; when false → squared */
  rounded: boolean;
  /** available delivery options */
  availableDeliveryOptions: "all" | DeliveryOption;
}

const COMMON_FONTS =
  "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/** Named platform presets — add new brands here */
export const PLATFORMS: Record<string, PlatformTheme> = {
  walmart: {
    primaryColor: "#0054E2",
    fontFamily: `var(--font-walmart),${COMMON_FONTS}`,
    logo: "walmart",
    pickupIcon: "/icons/wmt_pickup.svg",
    doorstepIcon: "/icons/wmt_doorstep.svg",
    rounded: true,
    availableDeliveryOptions: "all",
  },
  reformation: {
    primaryColor: "#000000",
    fontFamily: `var(--font-reformation),${COMMON_FONTS}`,
    logo: "reformation",
    rounded: false,
    availableDeliveryOptions: "door",
  },
  wayfair: {
    primaryColor: "#7B189F",
    fontFamily: `var(--font-wayfair),${COMMON_FONTS}`,
    logo: "wayfair",
    rounded: true,
    availableDeliveryOptions: "door",
  },
};

/**
 * ★ Change this value to switch the entire checkout look & feel.
 *   Supported keys: "walmart" | "target"
 */
export const ACTIVE_PLATFORM = "wayfair";

export const CHECKOUT_THEME: PlatformTheme = PLATFORMS[ACTIVE_PLATFORM];

/* ─── Derived radius tokens ─────────────────────────────────── */

/** Drawer window corner radius */
export const DRAWER_RADIUS = CHECKOUT_THEME.rounded ? "16px" : "8px";
/** Bottom-sheet top-corner radius */
export const SHEET_RADIUS = CHECKOUT_THEME.rounded ? "24px" : "12px";
/** CTA / primary button border radius */
export const BUTTON_RADIUS = CHECKOUT_THEME.rounded ? "9999px" : "0px";
/** Color / size swatch border radius */
export const SWATCH_RADIUS = CHECKOUT_THEME.rounded ? "8px" : "4px";

/* ─── 2. Shipping Options & Costs ───────────────────────────── */

export type ShippingOption = "standard" | "express" | "overnight";

export interface ShippingTier {
  title: string;
  days: number;
  price: string;
  text: string;
}

/** Displayed in the Shipping sheet for the user to pick from */
export const SHIPPING_OPTIONS: Record<ShippingOption, ShippingTier> = {
  standard: {
    title: "Standard",
    days: 5,
    price: "$0.00",
    text: "3-4 hours",
  },
  express: {
    title: "Rush",
    days: 2,
    price: "$3.00",
    text: "2-3 hours",
  },
  overnight: {
    title: "Priority",
    days: 1,
    price: "$8.00",
    text: "60 Mins or less",
  },
};

/** Dollar amounts used for order-total math */
export const SHIPPING_COST_BY_OPTION: Record<ShippingOption, number> = {
  standard: 0,
  express: 3,
  overnight: 8,
};

/* ─── 3. Pickup Stations ────────────────────────────────────── */

export interface PickupStation {
  id: string;
  name: string;
  address: string;
  distance: string;
}

export const PICKUP_STATIONS: PickupStation[] = [
  {
    id: "st-1",
    name: "Downtown Hub",
    address: "120 Broadway, NY 10271",
    distance: "0.1 mi",
  },
  {
    id: "st-2",
    name: "Midtown Station",
    address: "400 5th Ave, NY 10018",
    distance: "0.2 mi",
  },
  {
    id: "st-3",
    name: "Uptown Locker",
    address: "125th St & Lex, NY 10035",
    distance: "0.4 mi",
  },
  {
    id: "st-4",
    name: "West Side Hub",
    address: "500 W 23rd St, NY 10011",
    distance: "0.5 mi",
  },
  {
    id: "st-5",
    name: "Brooklyn Depot",
    address: "180 Atlantic Ave, Brooklyn 11201",
    distance: "0.5 mi",
  },
];

/* ─── 4. Timeframes ─────────────────────────────────────────── */

export interface Timeframe {
  label: string;
  price: string;
}

export const TIMEFRAMES: Timeframe[] = [
  { label: "9am-10am", price: "$9.95" },
  { label: "10am-11am", price: "$9.95" },
  { label: "11am-12pm", price: "$9.95" },
  { label: "1pm-2pm", price: "$9.95" },
  { label: "2pm-3pm", price: "$9.95" },
  { label: "3pm-4pm", price: "$9.95" },
];

/* ─── 5. Tax Rate ───────────────────────────────────────────── */

/** Multiplier applied to the subtotal for estimated taxes */
export const ESTIMATED_TAX_RATE = 0.1035;
