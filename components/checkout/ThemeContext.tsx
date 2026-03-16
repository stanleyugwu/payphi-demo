/**
 * ============================================================
 * CHECKOUT THEME CONTEXT
 * ============================================================
 *
 * Provides the active platform theme to all checkout components
 * based on the `?brand=` URL query parameter.
 *
 * Usage:
 *   1. Wrap with <CheckoutThemeProvider> at the page level
 *   2. In any checkout component: const theme = useCheckoutTheme();
 *
 * Fallback: if no query param is present, defaults to "walmart".
 * ============================================================
 */

"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useMemo } from "react";
import { PLATFORMS, type PlatformTheme } from "./constants";

/* ─── Derived radius helpers (same logic as static exports) ── */

export interface ResolvedTheme extends PlatformTheme {
  drawerRadius: string;
  sheetRadius: string;
  buttonRadius: string;
  swatchRadius: string;
}

function resolve(theme: PlatformTheme): ResolvedTheme {
  return {
    ...theme,
    drawerRadius: theme.rounded ? "16px" : "0px",
    sheetRadius: theme.rounded ? "24px" : "0px",
    buttonRadius: theme.rounded ? "9999px" : "0px",
    swatchRadius: theme.rounded ? "8px" : "0px",
  };
}

/* ─── Context ────────────────────────────────────────────────── */

const defaultTheme = resolve(PLATFORMS["walmart"]);

const ThemeContext = createContext<ResolvedTheme>(defaultTheme);

export function CheckoutThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");

  const theme = useMemo(() => {
    const platformKey = brand && brand in PLATFORMS ? brand : "walmart";
    return resolve(PLATFORMS[platformKey]);
  }, [brand]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

/** Hook — use inside any checkout component */
export function useCheckoutTheme(): ResolvedTheme {
  return useContext(ThemeContext);
}
