"use client";

import { useCheckoutTheme } from "./checkout/ThemeContext";

export default function Body({ children }: { children: React.ReactNode }) {
  const theme = useCheckoutTheme();
  return (
    <body className="antialiased" style={{ fontFamily: theme.fontFamily }}>
      {children}
    </body>
  );
}
