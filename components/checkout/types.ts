/**
 * ============================================================
 * CHECKOUT TYPES
 * ============================================================
 *
 * Shared type definitions used across checkout sub-components.
 * Import from here instead of redeclaring types in each file.
 * ============================================================
 */

import type { CardBrand } from "./utils";

/** Which bottom sheet is currently visible inside the drawer */
export type SheetType =
  | "shipping"
  | "delivery"
  | "payment"
  | "estimate"
  | "product"
  | null;

/** Toggle state for the delivery sheet tabs */
export type DeliveryOption = "door" | "pickup";

/** Persisted summary shown on the main drawer after the user confirms delivery */
export interface DeliverySummary {
  type: DeliveryOption;
  title: string;
  subtitle: string;
}

/** Persisted summary shown on the main drawer after payment is saved */
export interface PaymentSummary {
  brand: CardBrand;
  last4: string;
}
