/**
 * ============================================================
 * CHECKOUT ANIMATION OVERLAY
 * ============================================================
 *
 * Multi-phase animation that plays when the user presses "Checkout".
 *
 * Phases:
 *   idle  → slide  (30 ms tick so CSS transitions fire)
 *   slide → spinner visible (CheckoutSpinner handles its own phases)
 *   spinner done → onComplete
 * ============================================================
 */

"use client";

import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState } from "react";
import checkAnimation from "../../public/lottie/checkmark.json";
import { SPINNER_TOTAL_MS } from "./CheckoutSpinner";
import { BrandLogo } from "./Icons";
import { useCheckoutTheme } from "./ThemeContext";

/** ms — how long the slide/bg-morph takes */
const SLIDE_MS = 1400;

/** ms — hold after spinner finishes before closing */
const POST_DONE_DELAY = 1200;

/**
 * Total timeline (ms):
 *   0          → 30              idle (mount tick)
 *   30         → 30 + SLIDE_MS   slide + bg morph + logo drop
 *   SLIDE_MS   → +SPINNER_TOTAL  spinner plays (fade-in over 0.5s, then full animation)
 *   after       → close
 */
const TOTAL_MS = 30 + SLIDE_MS + SPINNER_TOTAL_MS + POST_DONE_DELAY;

export default function CheckoutAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const lottieRef = useRef<DotLottie>(null);
  const theme = useCheckoutTheme();
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setSliding(true), 30);
    // const t1 = setTimeout(() => onComplete(), TOTAL_MS);
    const t2 = setTimeout(() => {
      lottieRef.current?.play();
    }, SLIDE_MS);

    return () => {
      clearTimeout(t0);
      // clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        borderRadius: theme.drawerRadius,
        overflow: "hidden",
        background: sliding ? theme.primaryColor : "#ffffff",
        transition: `background ${SLIDE_MS}ms ease`,
      }}
    >
      {/* ─── Centered content column ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          paddingBottom: "6%",
        }}
      >
        {/* ─── Logo ─── */}
        <div
          style={{
            transform: sliding
              ? "translateY(0) scale(1.1)"
              : "translateY(-40vh) scale(1.4)",
            transition: `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <BrandLogo color={sliding ? "#ffffff" : undefined} />
        </div>

        {/* ─── Spinner / Checkmark ─── */}
        {/* Fades in after the slide completes */}
        <div
          style={{
            opacity: 0,
            animation: sliding
              ? `coFadeIn 0.5s ease ${SLIDE_MS}ms forwards`
              : "none",
          }}
        >
          <DotLottieReact
            data={checkAnimation}
            dotLottieRefCallback={(ref) => {
              lottieRef.current = ref;
            }}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </div>
      </div>
    </div>
  );
}
