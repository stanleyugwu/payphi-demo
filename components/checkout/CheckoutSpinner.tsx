/**
 * ============================================================
 * CheckoutSpinner
 * ============================================================
 *
 * Phase 1 — Indeterminate spin:
 *   • A <g> group rotates anti-clockwise (-360°) over 70% of
 *     each cycle, then holds for the remaining 30%.
 *   • The arc dasharray stays constant during the sweep, then
 *     shrinks to a dot while the rotation is held — creating
 *     a "collapse at a fixed point" effect.
 *
 * Phase 2 — Success morph:
 *   • Arc grows to a full closed circle (cspArcClose).
 *   • Circle scales/fades out (cspArcOut).
 *   • Checkmark <path> draws via stroke-dashoffset, ease-out.
 *
 * Both elements share identical stroke-width, stroke-linecap="round",
 * stroke colour, and fill="none".
 * ============================================================
 */

"use client";

/* ── Geometry ─────────────────────────────────────────── */
const R = 32;
const C = +(2 * Math.PI * R).toFixed(2); // ≈ 175.93 (circumference)

const ARC_LEN = +(0.15 * C).toFixed(2); // visible arc length
const ARC_GAP = +(C - ARC_LEN).toFixed(2);

// Checkmark path inside 100×100 viewBox.
const CHECK_PATH = "M34,52 L45,62 L66,39";
const CHECK_LEN = 46;

// Stroke styling.
const STROKE_WIDTH = 5;
const CHECK_STROKE_WIDTH = 6;

/* ── Timing (ms) ───────────────────────────────────────── */
const SPIN_DUR = 1200;
const SPIN_LOOPS = 3;
const SPIN_PHASE_MS = SPIN_DUR * SPIN_LOOPS;

const CLOSE_DUR = 300;
const FADE_DUR = 220;
const MORPH_DUR = Math.floor(SPIN_DUR * 0.7); // gentle fill over 70% of a loop
const CHECK_DELAY = Math.floor(MORPH_DUR * 0.55); // checkmark starts 55% into morph
const CHECK_DUR = Math.floor(MORPH_DUR * 0.6); // checkmark draws over remaining 60%
const ARC_SHRINK_DUR = Math.floor(MORPH_DUR * 0.5); // arc shrinks in first half of morph

// Morph starts at the beginning of the 3rd loop — gentle enough to be invisible
const MORPH_START = Math.floor(SPIN_DUR * 2);

/** Spin phase only — exported so CheckoutAnimation can sync. */
export const SPINNER_SPIN_MS = SPIN_PHASE_MS;

/** Full animation length, including the morph tail. */
export const SPINNER_TOTAL_MS = MORPH_START + MORPH_DUR + 100;

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
    /* ── Spin group: rotates anti-clockwise, holds at end ── */
    .csp-spin-group {
      transform-origin: 50% 50%;
      animation: cspSpin ${SPIN_DUR}ms linear 0ms ${SPIN_LOOPS} both;
    }

    @keyframes cspSpin {
      0%   { transform: rotate(-90deg); }
      70%  { transform: rotate(-450deg); }
      100% { transform: rotate(-450deg); }
    }

    /* ── Arc: constant length during sweep, collapses when held ── */
    .csp-arc {
      stroke-dasharray:  0.1 ${C};
      stroke-dashoffset: 0;
      transform-box:     view-box;
      transform-origin:  50% 50%;
      animation:
        cspWorm      ${SPIN_DUR}ms linear 0ms ${SPIN_LOOPS} both,
        cspArcShrink ${ARC_SHRINK_DUR}ms ease-out ${MORPH_START + CHECK_DELAY}ms forwards;
    }

    @keyframes cspWorm {
      0%   { stroke-dasharray: 0.1 ${C}; opacity: 0; }
      3%   { stroke-dasharray: ${+(0.2 * ARC_LEN).toFixed(2)} ${+(C - 0.2 * ARC_LEN).toFixed(2)}; opacity: 0.3; }
      7%   { stroke-dasharray: ${+(0.6 * ARC_LEN).toFixed(2)} ${+(C - 0.6 * ARC_LEN).toFixed(2)}; opacity: 0.7; }
      12%  { stroke-dasharray: ${ARC_LEN} ${ARC_GAP}; opacity: 1; }
      60%  { stroke-dasharray: ${ARC_LEN} ${ARC_GAP}; opacity: 1; }
      75%  { stroke-dasharray: ${+(0.6 * ARC_LEN).toFixed(2)} ${+(C - 0.6 * ARC_LEN).toFixed(2)}; opacity: 0.7; }
      85%  { stroke-dasharray: ${+(0.2 * ARC_LEN).toFixed(2)} ${+(C - 0.2 * ARC_LEN).toFixed(2)}; opacity: 0.3; }
      93%  { stroke-dasharray: 0.1 ${C}; opacity: 0; }
      100% { stroke-dasharray: 0.1 ${C}; opacity: 0; }
    }

    /* ── Arc shrink: quickly fades arc when morph begins ── */
    @keyframes cspArcShrink {
      from { stroke-dasharray: ${ARC_LEN} ${ARC_GAP}; opacity: 1; }
      to   { stroke-dasharray: 0.1 ${C}; opacity: 0; }
    }

    /* ── Track circle: faded ring that fills to white at morph ── */
    .csp-track {
      opacity: 0.15;
      animation: cspTrackFill ${MORPH_DUR}ms ease-out ${MORPH_START}ms forwards;
    }

    @keyframes cspTrackFill {
      from { opacity: 0.15; }
      to   { opacity: 1; }
    }

    /* ── Checkmark: draws after short delay into morph ── */
    .csp-check {
      stroke-dasharray:  ${CHECK_LEN};
      stroke-dashoffset: ${CHECK_LEN};
      opacity:           0;
      animation: cspCheckDraw ${CHECK_DUR}ms ease-out ${MORPH_START + CHECK_DELAY}ms forwards;
    }

    @keyframes cspCheckDraw {
      from { opacity: 1; stroke-dashoffset: ${CHECK_LEN}; }
      to   { opacity: 1; stroke-dashoffset: 0; }
    }
  `;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Processing"
    >
      <style>{css}</style>

      <g className="csp-spin-group">
        {/* Faded track circle */}
        <circle
          className="csp-track"
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={STROKE_WIDTH}
        />

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
      </g>

      <path
        className="csp-check"
        d={CHECK_PATH}
        fill="none"
        stroke={color}
        strokeWidth={CHECK_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
