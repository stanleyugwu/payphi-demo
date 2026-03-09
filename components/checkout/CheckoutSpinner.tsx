/**
 * ============================================================
 * CheckoutSpinner — Apple-Pay-style spinner + checkmark
 * ============================================================
 *
 * The arc rhythm:
 *   Fast phase (0–35 %): group rotates ~260°, dashoffset only −40
 *     → tail lags behind the speeding head → arc GROWS
 *
 *   Slow phase (35–100 %): group finishes last ~100°, dashoffset
 *     covers the remaining −199 units to reach −C
 *     → tail races forward, head barely moves → arc CONTRACTS FROM TAIL
 *
 *   At 100 %: group = 360° (seamless), dashoffset = −C (pattern
 *     completes exactly one virtual revolution → seamless loop)
 *
 * After SPINNER_SPIN_MS the arc fades, a full ring springs in,
 * and the checkmark draws itself.
 *
 * Customise: size, color. Tweak timing constants at the top.
 * ============================================================
 */

"use client";

/* ── Geometry ─────────────────────────────────────────── */
const R = 38;
const C = +(2 * Math.PI * R).toFixed(2); // ≈ 238.76

// Arc sizes (circumference units)
const ARC_MIN = 12; //  ~5 % of C — tiny trailing dot
const ARC_MAX = 100; // ~42 % of C — full stretch

const GAP_MIN = +(C - ARC_MAX).toFixed(2); // ≈ 138.76
const GAP_MAX = +(C - ARC_MIN).toFixed(2); // ≈ 226.76

// dashoffset at peak arc (35 % of cycle): tail lags by 40 units
const D_PEAK = 40;

// Checkmark (scaled from original SVGator source, 100×100 viewBox)
const CHECK_PATH = "M31,53 L42,64 L66,39";
const CHECK_LEN = 51;

/* ── Timing (ms) ───────────────────────────────────────── */
const SPIN_CYCLE = 1400; // duration of one arc + rotation cycle
const SPIN_ITERS = 3; // number of spin cycles before checkmark

/** Total spin phase duration */
export const SPINNER_SPIN_MS = SPIN_CYCLE * SPIN_ITERS; // 4200 ms

const ARC_FADE_START = SPINNER_SPIN_MS - 200;
const ARC_FADE_DUR = 300;
const RING_DELAY = SPINNER_SPIN_MS;
const RING_DUR = 500;
const CHECK_DELAY = SPINNER_SPIN_MS + 200;
const CHECK_DUR = 500;

/** Total animation duration — use this in CheckoutAnimation for onComplete */
export const SPINNER_TOTAL_MS = SPINNER_SPIN_MS + RING_DUR + CHECK_DUR + 200;

/* ── Component ─────────────────────────────────────────── */
export interface CheckoutSpinnerProps {
  /** Diameter in px */
  size?: number;
  /** Stroke colour */
  color?: string;
}

export function CheckoutSpinner({
  size = 72,
  color = "#ffffff",
}: CheckoutSpinnerProps) {
  const css = `
    /* ── Rotation: fast burst then decelerate ── */
    .csp-rot-g {
      transform-box:    view-box;
      transform-origin: 50% 50%;
      animation: cspRot ${SPIN_CYCLE}ms linear 0ms ${SPIN_ITERS} both;
    }

    /* ── Arc: grows on acceleration, tail contracts on decel ── */
    .csp-arc {
      fill: none;
      stroke-dasharray:  ${ARC_MIN} ${GAP_MAX};
      stroke-dashoffset: 0;
      animation:
        cspArc     ${SPIN_CYCLE}ms linear 0ms ${SPIN_ITERS} both,
        cspArcFade ${ARC_FADE_DUR}ms ease   ${ARC_FADE_START}ms forwards;
    }

    /* ── Ring springs in after spin ── */
    .csp-ring {
      fill:    none;
      opacity: 0;
      animation: cspRingIn ${RING_DUR}ms cubic-bezier(0.22, 1, 0.36, 1) ${RING_DELAY}ms forwards;
    }

    /* ── Checkmark draws itself ── */
    .csp-check {
      fill:              none;
      stroke-linecap:    round;
      stroke-linejoin:   round;
      stroke-dasharray:  ${CHECK_LEN};
      stroke-dashoffset: ${CHECK_LEN};
      animation: cspCheckDraw ${CHECK_DUR}ms cubic-bezier(0.22, 1, 0.36, 1) ${CHECK_DELAY}ms forwards;
    }

    /* ──────────────────────────────────────────────────── */

    /*
     * Group rotation: non-linear speed achieved by splitting into two
     * segments — the easing functions create the burst + decelerate feel.
     *
     *  0 % →  45 %: rotate  0° → 260°  // fast phase  (cubic ease-in  start)
     * 45 % → 100 %: rotate 260° → 360° // slow phase  (cubic ease-out finish)
     */
    @keyframes cspRot {
      0%  {
        transform: rotate(0deg);
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }
      45% {
        transform: rotate(260deg);
        animation-timing-function: cubic-bezier(0.6, 0, 1, 1);
      }
      100% { transform: rotate(360deg); }
    }

    /*
     * Arc dasharray + dashoffset:
     *
     *  0 % : tiny arc (12), offset 0        — start of cycle
     * 35 % : big  arc (100), offset −40     — head raced ahead, tail lagging
     *                                          arc at maximum size
     * 100%: tiny arc (12), offset −C        — tail caught up, loop closure
     *
     * Between 35 % and 100 % the tail travels ~199 circumference-units
     * while the head moves only ~40, so the arc collapses FROM THE TAIL.
     */
    @keyframes cspArc {
      0% {
        stroke-dasharray:  ${ARC_MIN} ${GAP_MAX};
        stroke-dashoffset: 0;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }
      35% {
        stroke-dasharray:  ${ARC_MAX} ${GAP_MIN};
        stroke-dashoffset: -${D_PEAK};
        animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      }
      100% {
        stroke-dasharray:  ${ARC_MIN} ${GAP_MAX};
        stroke-dashoffset: -${C};
      }
    }

    @keyframes cspArcFade { to { opacity: 0; } }

    @keyframes cspRingIn {
      from { opacity: 0; transform: scale(0.9); }
      to   { opacity: 1; transform: scale(1);   }
    }

    @keyframes cspCheckDraw { to { stroke-dashoffset: 0; } }
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

      {/* Phase 1: spinning arc */}
      <g className="csp-rot-g">
        <circle
          className="csp-arc"
          cx="50"
          cy="50"
          r={R}
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Phase 2: full ring */}
      <circle
        className="csp-ring"
        cx="50"
        cy="50"
        r={R}
        stroke={color}
        strokeWidth="3"
      />

      {/* Phase 2: checkmark */}
      <path
        className="csp-check"
        d={CHECK_PATH}
        stroke={color}
        strokeWidth="4.5"
      />
    </svg>
  );
}
