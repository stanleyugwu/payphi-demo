/**
 * ============================================================
 * CHECKOUT ANIMATION OVERLAY
 * ============================================================
 *
 * Multi-phase animation that plays when the user presses
 * "Checkout". Renders as a full-size overlay inside the drawer.
 *
 * Phases:
 *   idle  → slide  (30ms tick so CSS transitions fire)
 *   slide → done   (slide: 900ms, then spinner plays for 4s via CSS delay)
 *
 * The spinner and checkmark are ALWAYS in the DOM. Their visibility
 * is driven entirely by CSS animation-delay — no React state change
 * at the spinner boundary, which eliminates flicker.
 * ============================================================
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { CHECKOUT_THEME } from "./constants";
import { WalmartLogo } from "./Icons";

/** ms — how long the slide/morph takes */
const SLIDE_MS = 1400;

/** ms — how long the spinner spins before becoming a checkmark */
const SPIN_MS = 4000;

/** ms — hold the checkmark before closing */
const POST_DONE_DELAY = 2000;

/** Spinner / checkmark shared dimensions */
const INDICATOR_SIZE = 44;
const STROKE_WIDTH = 2;
const CIRCUMFERENCE = Math.PI * (INDICATOR_SIZE - STROKE_WIDTH);

/** Spin cycle duration — must match the CSS coSpin animation duration */
const SPIN_CYCLE_MS = 1600;

/**
 * Total timeline (ms):
 *   0        → 30       idle (mount tick)
 *   30       → 930      slide + bg morph + logo color
 *   930      → 4930     spinner visible (CSS animation-delay)
 *   4930     → 5530     checkmark cross-fade (CSS animation-delay)
 *   5530     → 7530     hold, then onComplete
 */
const TOTAL_MS = 30 + SLIDE_MS + SPIN_MS + 600 + POST_DONE_DELAY;

export default function CheckoutAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  /* Only two React states: idle → sliding → done */
  const [sliding, setSliding] = useState(false);
  const [done, setDone] = useState(false);
  const arcRef = useRef<SVGCircleElement>(null);

  /* ── Animate arc stretch / contract via rAF ── */
  useEffect(() => {
    const minFrac = 0.08;
    const maxFrac = 0.38;
    let frame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      /* Wait for the slide to finish before animating the arc */
      if (elapsed < SLIDE_MS) {
        frame = requestAnimationFrame(animate);
        return;
      }

      const cycleTime = (elapsed - SLIDE_MS) % SPIN_CYCLE_MS;
      const progress = cycleTime / SPIN_CYCLE_MS;

      /* Sine wave that peaks at progress ≈ 0.4 (fast phase) */
      const fraction =
        minFrac +
        (maxFrac - minFrac) *
          (0.5 + 0.5 * Math.sin(2 * Math.PI * progress - 0.3 * Math.PI));

      const maxDash = CIRCUMFERENCE * maxFrac;
      const dash = CIRCUMFERENCE * fraction;
      const gap = CIRCUMFERENCE * (1 - fraction);

      /* Pin the leading edge: offset = dash - maxDash keeps the front
         at a fixed position while the trailing end stretches/contracts */
      const offset = dash - maxDash;

      if (arcRef.current) {
        arcRef.current.setAttribute("stroke-dasharray", `${dash} ${gap}`);
        arcRef.current.setAttribute("stroke-dashoffset", `${offset}`);
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    /* Kick off slide on next paint so initial CSS state is committed */
    const t0 = setTimeout(() => setSliding(true), 30);

    /* Mark done (for checkmark cross-fade) at slide + spin */
    const t1 = setTimeout(() => setDone(true), 30 + SLIDE_MS + SPIN_MS);

    /* Fire onComplete after everything */
    const t2 = setTimeout(() => onComplete(), TOTAL_MS);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  /* CSS animation-delay values (from mount) */
  const spinnerDelay = `${SLIDE_MS}ms`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        borderRadius: "16px",
        overflow: "hidden",
        background: sliding ? CHECKOUT_THEME.primaryColor : "#ffffff",
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
          <WalmartLogo color={sliding ? "#ffffff" : undefined} />
        </div>

        {/* ─── Spinner / Checkmark ─── */}
        {/* Both always in DOM. Visibility driven by CSS animation-delay. */}
        <div
          style={{
            width: INDICATOR_SIZE,
            height: INDICATOR_SIZE,
            position: "relative",
            /* Fade in via CSS animation with delay = slide duration */
            opacity: 0,
            animation: `coFadeIn 0.5s ease ${spinnerDelay} forwards`,
          }}
        >
          {/* Spinning ring — fades out when done via React state */}
          <svg
            width={INDICATOR_SIZE}
            height={INDICATOR_SIZE}
            viewBox={`0 0 ${INDICATOR_SIZE} ${INDICATOR_SIZE}`}
            style={{
              position: "absolute",
              inset: 0,
              animation: `coSpin 1.6s ease-in-out ${spinnerDelay} infinite`,
              opacity: done ? 0 : 1,
              transition: "opacity 0.35s ease",
            }}
          >
            <circle
              cx={INDICATOR_SIZE / 2}
              cy={INDICATOR_SIZE / 2}
              r={(INDICATOR_SIZE - STROKE_WIDTH) / 2}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={STROKE_WIDTH}
            />
            <circle
              ref={arcRef}
              cx={INDICATOR_SIZE / 2}
              cy={INDICATOR_SIZE / 2}
              r={(INDICATOR_SIZE - STROKE_WIDTH) / 2}
              fill="none"
              stroke="#ffffff"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={`${CIRCUMFERENCE * 0.08} ${CIRCUMFERENCE * 0.92}`}
            />
          </svg>

          {/* Checkmark circle — cross-fades in when done */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: done ? 1 : 0,
              transform: done ? "scale(1)" : "scale(0.6)",
              transition:
                "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              borderRadius: "50%",
              background: "transparent",
              border: `${STROKE_WIDTH}px solid #ffffff`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={INDICATOR_SIZE * 0.45}
              height={INDICATOR_SIZE * 0.45}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: done ? 1 : 0,
                transition: "opacity 0.3s ease 0.15s",
              }}
            >
              <path d="M4 12l6 6L20 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
