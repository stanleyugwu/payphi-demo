/**
 * ============================================================
 * BACKWARD-COMPATIBILITY RE-EXPORT
 * ============================================================
 *
 * The CheckoutDrawer has been refactored into the
 * `components/checkout/` module for better maintainability.
 *
 * This file exists so that existing imports like
 *   import CheckoutDrawer from "@/components/CheckoutDrawer"
 * continue to work without touching every consumer.
 *
 * New code should import directly from the module:
 *   import CheckoutDrawer from "@/components/checkout"
 * ============================================================
 */

export { default } from "./checkout";
