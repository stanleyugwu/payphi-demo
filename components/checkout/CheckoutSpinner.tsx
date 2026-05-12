/**
 * ============================================================
 * CheckoutSpinner — implements public/spinner_specification.md
 * ============================================================
 *
 * Phase 1 — Indeterminate "elastic spin":
 *   • Animation A: <svg> container rotates 0° → 360°, LINEAR,
 *     ~2000 ms per loop. Iterates twice in this deterministic flow
 *     (the spec calls for `infinite`; here the success trigger is a
 *     fixed timeout that lands at the end of cycle 2 → 0° top center).
 *   • Animation B: <circle> stroke-dasharray + stroke-dashoffset
 *     follow the Material worm pattern:
 *         0%   small dash, offset 0
 *         50%  dash = 75% of circumference, offset shifted forward
 *         100% small dash, offset shifted one full revolution
 *
 * Phase 2 — Determinate "success morph":
 *   • Worm smoothly grows to a fully closed circle (cspArcClose).
 *   • Circle scales/fades out (cspArcOut).
 *   • Checkmark <path> draws via stroke-dashoffset, ease-out.
 *
 * Both elements share identical stroke-width, stroke-linecap="round",
 * stroke colour, and fill="none" as the spec requires.
 * ============================================================
 */

"use client";

/* ── Geometry ─────────────────────────────────────────── */
const R = 28;
const C = +(2 * Math.PI * R).toFixed(2); // ≈ 238.76 (circumference)

// Worm parameters per spec: small dash at extremes, ~75% of C at peak.
const DASH_SMALL = 12;
const DASH_MAX = +(0.75 * C).toFixed(2); // ≈ 179.07
const GAP_SMALL = +(C - DASH_SMALL).toFixed(2);
const GAP_MAX = +(C - DASH_MAX).toFixed(2);
const OFFSET_MID = +(0.25 * C).toFixed(2); // dashoffset shift at 50 % keyframe

// Checkmark path inside 100×100 viewBox.
const CHECK_PATH = "M30,52 L43,65 L68,38";
const CHECK_LEN = 56;

// Shared stroke styling — identical on circle + path per spec.
const STROKE_WIDTH = 3.5;

/* ── Timing (ms) ───────────────────────────────────────── */
const SPIN_DUR = 1200; // ~2 s per loop (Animation A)
const SPIN_LOOPS = 3; // 2 loops → ends precisely at 0° top center
const SPIN_PHASE_MS = SPIN_DUR * SPIN_LOOPS;

const CLOSE_DUR = 300; // worm → full closed circle
const FADE_DUR = 220; // circle scales/fades after it closes
const CHECK_DELAY = CLOSE_DUR - 80; // check starts drawing ~80 ms before circle is gone
const CHECK_DUR = 420; // ease-out check draw (300–500 ms range per spec)

/** Spin phase only — exported so CheckoutAnimation can sync. */
export const SPINNER_SPIN_MS = SPIN_PHASE_MS;

/** Full animation length, including the morph tail. */
export const SPINNER_TOTAL_MS =
  SPIN_PHASE_MS + Math.max(CLOSE_DUR + FADE_DUR, CHECK_DELAY + CHECK_DUR) + 100;

/* ── Component ─────────────────────────────────────────── */
export interface CheckoutSpinnerProps {
  /** Diameter in px */
  size?: number;
  /** Shared stroke colour for circle + check */
  color?: string;
}

export function CheckoutSpinner({
  size = 72,
  color = "#ffffff",
}: CheckoutSpinnerProps) {
  const css = `
    /* ── Animation A: linear container spin ──────────── */
    .csp-svg {
      animation: cspSpin ${SPIN_DUR}ms linear 0ms ${SPIN_LOOPS} both;
      transform-origin: 50% 50%;
    }

    @keyframes cspSpin {
      from { transform: rotate(0deg);   }
      to   { transform: rotate(360deg); }
    }

    /* ── Animation B: the worm (stroke dasharray + offset) ── */
    .csp-arc {
      stroke-dasharray:  ${DASH_SMALL} ${GAP_SMALL};
      stroke-dashoffset: 0;
      transform-box:     view-box;
      transform-origin:  50% 50%;
      animation:
        cspWorm     ${SPIN_DUR}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms ${SPIN_LOOPS} both,
        cspArcClose ${CLOSE_DUR}ms cubic-bezier(0.4, 0, 0.2, 1) ${SPIN_PHASE_MS}ms forwards,
        cspArcOut   ${FADE_DUR}ms ease ${SPIN_PHASE_MS + CLOSE_DUR}ms forwards;
    }

    @keyframes cspWorm {
      0% {
        stroke-dasharray:  ${DASH_SMALL} ${GAP_SMALL};
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray:  ${DASH_MAX} ${GAP_MAX};
        stroke-dashoffset: -${OFFSET_MID};
      }
      100% {
        stroke-dasharray:  ${DASH_SMALL} ${GAP_SMALL};
        stroke-dashoffset: -${C};
      }
    }

    /* ── Phase 2 step 1: worm closes into a full ring ── */
    @keyframes cspArcClose {
      from {
        stroke-dasharray:  ${DASH_SMALL} ${GAP_SMALL};
        stroke-dashoffset: 0;
      }
      to {
        stroke-dasharray:  ${C} 0;
        stroke-dashoffset: 0;
      }
    }

    /* ── Phase 2 step 1b: circle scales + fades out ── */
    @keyframes cspArcOut {
      from { opacity: 1; transform: scale(1);   }
      to   { opacity: 0; transform: scale(0.7); }
    }

    /* ── Phase 2 step 2: check draws (ease-out) ── */
    .csp-check {
      stroke-dasharray:  ${CHECK_LEN};
      stroke-dashoffset: ${CHECK_LEN};
      opacity:           0;
      animation: cspCheckDraw ${CHECK_DUR}ms ease-out ${SPIN_PHASE_MS + CHECK_DELAY}ms forwards;
    }

    @keyframes cspCheckDraw {
      from { opacity: 1; stroke-dashoffset: ${CHECK_LEN}; }
      to   { opacity: 1; stroke-dashoffset: 0; }
    }
  `;

  return (
    <svg
      className="csp-svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Processing"
    >
      <style>{css}</style>

      <circle
        className="csp-arc"
        cx="50"
        cy="50"
        r={R}
        fill="none"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />

      <path
        className="csp-check"
        d={CHECK_PATH}
        fill="none"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
