/**
 * ============================================================
 * CHECKOUT UTILITIES
 * ============================================================
 *
 * Pure functions — no React, no side-effects.
 * Easy to unit test independently.
 *
 * Sections:
 *   1. Card Brand Detection & Formatting
 *   2. Date Helpers
 *   3. Currency Formatting
 * ============================================================
 */

/* ─── 1. Card Brand Detection & Formatting ──────────────────── */

export type CardBrand = "visa" | "mastercard" | "unknown";

/** Detect card network from the first few digits */
export function detectCardBrand(cardDigits: string): CardBrand {
  if (/^4/.test(cardDigits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(cardDigits)) return "mastercard";
  return "unknown";
}

/** Format raw digits into groups of 4 (e.g. "1234 5678 9012 3456") */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

/** Format raw digits into MM/YY */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/** Check if MM/YY is a valid, non-expired date */
export function isValidExpiry(expiry: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
  const [mm, yy] = expiry.split("/");
  const month = Number(mm);
  const year = 2000 + Number(yy);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(year, month, 0, 23, 59, 59, 999);
  return expiryDate >= now;
}

/* ─── 2. Date Helpers ───────────────────────────────────────── */

/** Human-readable arrival date string, e.g. "Monday, 4 Mar" */
export function getArrivalDate(daysToAdd: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

export interface DateOption {
  full: string; // ISO string for keying
  weekday: string; // "Today", "Mon", "Tue", etc.
  mmdd: string; // "2/25"
}

/** Generate an array of calendar dates starting from today */
export function generateDates(days: number): DateOption[] {
  const dates: DateOption[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      full: d.toISOString(),
      weekday:
        i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" }),
      mmdd: `${String(d.getMonth() + 1)}/${String(d.getDate())}`,
    });
  }
  return dates;
}

/* ─── 3. Currency Formatting ────────────────────────────────── */

/** Format a number as USD, e.g. 12.5 → "$12.50" */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
