/**
 * ============================================================
 * CHECKOUT ICONS
 * ============================================================
 *
 * Reusable SVG icon components used throughout the checkout drawer.
 * Each is a lightweight functional component — no external deps.
 *
 * Why a shared file?
 * → The close (×), chevron (>), plus (+), minus (−), and trash
 *   icons were previously duplicated 2-8× across the monolith.
 *   Now there's a single source of truth for each.
 * ============================================================
 */

/* ─── Shared prop type ──────────────────────────────────────── */

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/* ─── Close "×" icon ────────────────────────────────────────── */

export function CloseIcon({
  size = 14,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Chevron ">" icon (rotatable via CSS) ──────────────────── */

export function ChevronIcon({
  size = 16,
  color = "var(--color-taupe)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ─── Chevron Down "∨" icon ─────────────────────────────────── */

export function ChevronDownIcon({
  size = 10,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ─── Plus "+" icon ─────────────────────────────────────────── */

export function PlusIcon({
  size = 10,
  color = "var(--color-charcoal)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─── Minus "−" icon ────────────────────────────────────────── */

export function MinusIcon({
  size = 10,
  color = "var(--color-charcoal)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─── Trash (filled) icon — shown when qty is 1 ────────────── */

export function TrashIcon({
  size = 10,
  color = "var(--color-charcoal)",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M3 6h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" fill={color} />
      <line
        x1="10"
        y1="10"
        x2="10"
        y2="18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="10"
        x2="14"
        y2="18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Shopping Bag icon (empty-state) ───────────────────────── */

export function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="36"
      viewBox="0 0 22 24"
      fill="none"
      stroke="var(--color-taupe)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 8h16l-1.4 12H4.4L3 8Z" />
      <path d="M7 8V7a4 4 0 1 1 8 0v1" />
    </svg>
  );
}

/* ─── Walmart Logo ──────────────────────────────────────────── */

export function WalmartLogo({ color }: { color?: string } = {}) {
  const sparkFill = color ?? "#FFC220";
  const textFill = color ?? "#0053E2";

  return (
    <svg
      width="152"
      height="36"
      viewBox="0 0 152 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "28px", width: "auto", transition: "filter 0.8s ease" }}
    >
      <mask
        id="mask0_0_871"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="120"
        y="0"
        width="32"
        height="36"
      >
        <rect x="120.158" width="31.8421" height="36" fill="white" />
      </mask>
      <g mask="url(#mask0_0_871)">
        <path
          d="M142.632 16.3674C143.38 16.2132 149.999 13.1778 150.59 12.8364C151.939 12.057 152.401 10.3308 151.622 8.98137C150.843 7.63137 149.118 7.16877 147.77 7.94817C147.179 8.28957 141.243 12.5088 140.736 13.08C140.154 13.7352 140.054 14.6718 140.484 15.417C140.914 16.1628 141.774 16.5438 142.632 16.3674Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M150.59 23.088C149.999 22.7472 143.38 19.7112 142.632 19.5576C141.774 19.3806 140.914 19.7616 140.484 20.5074C140.054 21.2532 140.154 22.1904 140.736 22.8444C141.243 23.4156 147.179 27.6354 147.77 27.9762C149.119 28.7562 150.843 28.293 151.622 26.9436C152.401 25.5936 151.938 23.8674 150.59 23.088Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M136.08 23.0526C135.219 23.0526 134.459 23.6082 134.183 24.4392C133.943 25.1652 133.26 32.4192 133.26 33.102C133.26 34.6602 134.522 35.9244 136.08 35.9244C137.638 35.9244 138.9 34.6608 138.9 33.102C138.9 32.4192 138.217 25.1646 137.976 24.4392C137.7 23.6076 136.94 23.0526 136.08 23.0526V23.0526Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M129.526 19.5576C128.779 19.7112 122.159 22.7466 121.569 23.088C120.219 23.868 119.758 25.5942 120.537 26.9436C121.315 28.2936 123.04 28.7562 124.389 27.9762C124.979 27.6348 130.915 23.4156 131.423 22.8444C132.005 22.1892 132.105 21.2532 131.675 20.5074C131.245 19.7622 130.384 19.3806 129.526 19.5576V19.5576Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M124.388 7.94817C123.039 7.16877 121.315 7.63137 120.536 8.98137C119.757 10.3314 120.22 12.0576 121.568 12.8364C122.159 13.1778 128.778 16.2132 129.526 16.3674C130.384 16.5438 131.244 16.1634 131.675 15.417C132.105 14.6718 132.004 13.7346 131.423 13.08C130.915 12.5088 124.979 8.28957 124.388 7.94817Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M136.08 0C134.522 0 133.26 1.26336 133.26 2.82246C133.26 3.50508 133.943 10.7598 134.183 11.4858C134.459 12.3174 135.219 12.8724 136.08 12.8724C136.94 12.8724 137.7 12.3168 137.976 11.4858C138.217 10.7598 138.9 3.50568 138.9 2.82246C138.9 1.26396 137.638 0 136.08 0V0Z"
          fill={sparkFill}
          style={{ transition: "fill 0.8s ease" }}
        />
      </g>
      <mask
        id="mask1_0_871"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="7"
        width="110"
        height="22"
      >
        <rect y="7.80005" width="109.345" height="20.4" fill="white" />
      </mask>
      <g mask="url(#mask1_0_871)">
        <path
          d="M21.5111 7.80005L18.8819 20.859L15.9319 7.80005H10.8085L7.85846 20.859L5.23082 7.80005H0L4.26541 27.7482H10.3526L13.3303 14.5032L16.3079 27.7482H22.2616L26.4994 7.80005H21.5111Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.5397 13.3326C27.3715 12.5628 29.651 11.4714 32.8971 11.4714H32.8953C37.2943 11.4714 39.6548 13.4664 39.6548 17.961V27.7494H34.667V25.707C33.91 27.1374 32.5276 28.2018 30.2139 28.2018C27.4515 28.2018 25.5466 26.526 25.5466 23.6538C25.5466 20.5428 27.6389 19.2384 31.2593 18.4938C33.6475 17.9886 34.5054 17.6688 34.5054 16.8714C34.5054 15.9402 33.8884 15.4878 32.2266 15.4878C29.5434 15.4878 27.5049 16.7376 26.5397 17.5884V13.3326ZM30.3755 23.2806C30.3755 24.264 31.0184 24.9822 32.1989 24.9822H32.2001C33.594 24.9822 34.4796 24.0252 34.4796 22.3494V20.1426C34.0254 20.5362 33.3531 20.796 32.682 21.0462C31.3945 21.4986 30.3755 22.0038 30.3755 23.2806Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M46.6998 7.80005H41.5227V27.7482H46.6998V7.80005Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M67.4753 11.5249C64.9634 11.5249 63.3401 13.0213 62.4918 15.0151C62.0363 12.8791 60.5235 11.5249 58.4087 11.5249C56.014 11.5249 54.4531 12.9097 53.6619 14.8549V11.9767H48.5659V27.7495H53.743V18.9997C53.743 16.8457 54.4675 15.6223 56.0224 15.6223C57.2823 15.6223 57.7124 16.4731 57.7124 17.8033V27.7513H62.8895V19.0009C62.8895 16.8475 63.6134 15.6235 65.1683 15.6235C66.4288 15.6235 66.8583 16.4743 66.8583 17.8045V27.7531H72.0354V17.0833C72.0354 13.7587 70.4529 11.5249 67.4753 11.5249V11.5249Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M74.1525 13.3326C74.9846 12.5628 77.2641 11.4714 80.5102 11.4714H80.5084C84.9074 11.4714 87.2679 13.4664 87.2679 17.961V27.7494H82.2801V25.707C81.5231 27.1374 80.1407 28.2018 77.827 28.2018C75.0645 28.2018 73.1594 26.526 73.1594 23.6538C73.1594 20.5428 75.252 19.2384 78.8724 18.4938C81.2605 17.9886 82.1185 17.6688 82.1185 16.8714C82.1185 15.9402 81.5015 15.4878 79.8397 15.4878C77.1565 15.4878 75.118 16.7376 74.1525 17.5884V13.3326ZM77.9898 23.2806C77.9898 24.264 78.6333 24.9822 79.8132 24.9822C81.2089 24.9822 82.0945 24.0252 82.0945 22.3494V20.1426C81.6402 20.5362 80.968 20.796 80.2969 21.0462C79.0094 21.4986 77.9898 22.0038 77.9898 23.2806Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M94.1091 16.4323V11.9767H89.0396V27.7495H94.2166V21.0463C94.2166 17.9611 96.1476 17.1361 97.9986 17.1361C98.6156 17.1361 99.205 17.2153 99.4736 17.2963V11.8699C96.5609 11.7313 94.7916 13.5751 94.1091 16.4323Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
        <path
          d="M109.345 15.966V11.9766H106.046V8.91724H100.869V22.4814C100.869 26.2854 103.041 28.0674 106.502 28.0674C108.112 28.0674 108.97 27.7476 109.345 27.5088V23.5452C109.05 23.7588 108.566 23.9184 107.949 23.9184C106.797 23.9442 106.045 23.439 106.045 21.765V15.966H109.343H109.345Z"
          fill={textFill}
          style={{ transition: "fill 0.8s ease" }}
        />
      </g>
    </svg>
  );
}

/* ─── Target Logo ───────────────────────────────────────────── */

export function TargetLogo({ color }: { color?: string } = {}) {
  const bullseyeFill = color ?? "#CC0000";
  const textFill = color ?? "#CC0000";

  return (
    <svg
      width="140"
      height="36"
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "28px", width: "auto", transition: "filter 0.8s ease" }}
    >
      {/* Bullseye */}
      <circle
        cx="18"
        cy="18"
        r="17"
        fill={bullseyeFill}
        style={{ transition: "fill 0.8s ease" }}
      />
      <circle
        cx="18"
        cy="18"
        r="11"
        fill={color ? "transparent" : "white"}
        style={{ transition: "fill 0.8s ease" }}
      />
      <circle
        cx="18"
        cy="18"
        r="6"
        fill={bullseyeFill}
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* Wordmark */}
      <text
        x="42"
        y="24"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="1"
        fill={textFill}
        style={{ transition: "fill 0.8s ease" }}
      >
        TARGET
      </text>
    </svg>
  );
}

/* ─── Wayfair Logo ──────────────────────────────────────────── */

export function WayfairLogo({ color }: { color?: string } = {}) {
  const fill = color ?? "#7B189F";

  return (
    <svg
      viewBox="0 0 629.52 150"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      style={{ height: "28px", width: "auto", transition: "filter 0.8s ease" }}
    >
      <title>Wayfair</title>
      {/* Registration marks */}
      <path
        fill={fill}
        strokeWidth="0px"
        d="M624.09,42.29c0-0.77-0.42-1.54-1.47-1.54h-1.89v4.96h0.7V43.9h0.63l1.26,1.81h0.84l-1.33-1.89 C623.74,43.76,624.09,42.99,624.09,42.29L624.09,42.29z M621.44,43.2v-1.81h1.26c0.56,0,0.77,0.49,0.77,0.91 c0,0.42-0.21,0.91-0.84,0.91L621.44,43.2L621.44,43.2z"
        style={{ transition: "fill 0.8s ease" }}
      />
      <path
        fill={fill}
        strokeWidth="0px"
        d="M622.27,38.94c-2.38,0-4.26,1.89-4.26,4.26c0,2.38,1.89,4.26,4.26,4.26s4.26-1.89,4.26-4.26 C626.54,40.82,624.58,38.94,622.27,38.94z M622.27,46.83c-2.03,0-3.63-1.61-3.63-3.63c-0.07-2.03,1.61-3.63,3.63-3.63 s3.63,1.61,3.63,3.63C625.91,45.23,624.3,46.83,622.27,46.83z"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* Dot on the i */}
      <ellipse
        fill={fill}
        strokeWidth="0px"
        cx="541.78"
        cy="15.8"
        rx="11.49"
        ry="11.2"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* Wayfair icon (four-petal star) */}
      <path
        fill={fill}
        strokeWidth="0px"
        d="M53.15,111.51L19.41,77.76L7.77,89.4c-1.17,1.17-1.31,2.04-0.87,3.49l5.53,21.53 c0.58,2.33,1.74,3.49,4.07,4.07l21.53,5.53c1.45,0.44,2.33,0.29,3.49-0.87L53.15,111.51L53.15,111.51z M58.68,111.51l11.64,11.64 c1.17,1.17,2.04,1.31,3.49,0.87l21.53-5.53c2.33-0.58,3.49-1.74,4.07-4.07l5.53-21.53c0.44-1.45,0.29-2.33-0.87-3.49L92.43,77.76 L58.68,111.51L58.68,111.51z M58.68,38.49l33.75,33.75l11.64-11.64c1.17-1.17,1.31-2.04,0.87-3.49l-5.53-21.53 c-0.58-2.33-1.74-3.49-4.07-4.07l-21.53-5.53c-1.45-0.44-2.33-0.29-3.49,0.87L58.68,38.49L58.68,38.49z M53.15,38.49L41.52,26.85 c-1.17-1.17-2.04-1.31-3.49-0.87L16.5,31.51c-2.33,0.58-3.49,1.74-4.07,4.07L6.9,57.1c-0.44,1.45-0.29,2.33,0.87,3.49l11.64,11.64 L53.15,38.49L53.15,38.49z"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* "ayfair" text + f ligature */}
      <path
        fill={fill}
        strokeWidth="0px"
        d="M437.35,53.47h-17.9v52.64c0,2.74-2.22,4.96-4.96,4.96h-13.95v-57.6h-16.28l-21.6,61.24 c-8.73,24.58-17.31,30.98-32.58,30.98c-2.91,0-7.56-0.58-12.22-1.45l4.12-13.53h6.65c7.34,0,11.21-2.28,13.75-8.68 c2.53-6.41,2.59-7.4,2.62-7.46L319.1,38.93h16.41c2.18,0,4.1,1.42,4.74,3.5l14.63,47.55L370.3,43c1.02-2.91,2.33-4.07,5.24-4.07 h25.01v-2.04c0-21.38,9.89-32.58,28.66-32.58c2.91,0,9.49,0.52,13.42,1.4l-4.15,13.58h-5.49c-7.47,0-13.53,6.06-13.53,13.53v6.11 h22.31L437.35,53.47L437.35,53.47z"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* "W" */}
      <path
        fill={fill}
        strokeWidth="0px"
        d="M200.36,89.4l-14.54-47.27c-0.73-2.47-1.74-3.2-4.22-3.2h-13.82c-2.47,0-3.49,0.73-4.22,3.2L148.87,89.4 l-13.09-50.47h-20.8l20.95,68.95c0.73,2.47,1.74,3.2,4.22,3.2h14.4c2.47,0,3.49-0.73,4.22-3.2l15.27-48.58l15.42,48.58 c0.73,2.47,1.74,3.2,4.22,3.2h12.95c2.47,0,3.49-0.73,4.22-3.2l20.95-68.95H213.6L200.36,89.4L200.36,89.4z"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* "i" stem */}
      <rect
        x="532.32"
        y="38.93"
        fill={fill}
        strokeWidth="0px"
        width="18.91"
        height="72.15"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* First "a" */}
      <path
        fill={fill}
        strokeWidth="0px"
        d="M291.9,43l-0.44,8.3c-4.51-10.77-13.67-13.82-24.44-13.82c-19.78,0-32.15,17.89-32.15,37.53 s12.36,37.53,32.15,37.53c10.77,0,19.93-3.06,24.44-13.82l0.44,8.3c0,2.76,1.31,4.07,3.64,4.07h15.13V38.93h-15.13 C293.21,38.93,291.9,40.23,291.9,43L291.9,43z M272.39,97.44c-11.93,0-18.75-9.94-18.75-22.44s6.81-22.44,18.75-22.44 S291.14,62.5,291.14,75S284.32,97.44,272.39,97.44L272.39,97.44z"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* Second "a" */}
      <path
        fill={fill}
        strokeWidth="0px"
        d="M497.64,43l-0.44,8.3c-4.51-10.77-13.67-13.82-24.44-13.82c-19.78,0-32.15,17.89-32.15,37.53 s12.36,37.53,32.15,37.53c10.77,0,19.93-3.06,24.44-13.82l0.44,8.3c0,2.76,1.31,4.07,3.64,4.07h15.13V38.93h-15.13 C498.96,38.93,497.64,40.23,497.64,43L497.64,43z M478.14,97.44c-11.93,0-18.75-9.94-18.75-22.44s6.81-22.44,18.75-22.44 S496.89,62.5,496.89,75S490.07,97.44,478.14,97.44z"
        style={{ transition: "fill 0.8s ease" }}
      />
      {/* "r" */}
      <path
        fill={fill}
        strokeWidth="0px"
        d="M608.98,38.2c-11.2,0-19.2,3.44-22.69,16.82L586,43c0-2.76-1.31-4.07-3.64-4.07h-15.13v72.15h18.91V75 c0-12.65,7.27-20.8,19.78-20.8h3.41l4.59-15.09C612.16,38.36,610.29,38.2,608.98,38.2L608.98,38.2z"
        style={{ transition: "fill 0.8s ease" }}
      />
    </svg>
  );
}

export function ReformationLogo({ color }: { color?: string } = {}) {
  return (
    <img
      src="/reformation_logo.svg"
      alt="Reformation Logo"
      style={{
        width: 200,
        height: 50,
        color: "red",
        filter: color ? "invert(1)" : "none",
      }}
    />
  );
}

/* ─── Brand Logo Dispatcher ─────────────────────────────────── */

import { useCheckoutTheme } from "./ThemeContext";

/** Renders the logo for the active platform */
export function BrandLogo({ color }: { color?: string } = {}) {
  const theme = useCheckoutTheme();
  switch (theme.logo) {
    case "target":
      return <TargetLogo color={color} />;
    case "wayfair":
      return <WayfairLogo color={color} />;
    case "walmart":
      return <WalmartLogo color={color} />;
    case "reformation":
      return <ReformationLogo color={color} />;
    default:
      return <WalmartLogo color={color} />;
  }
}

/* ─── Delivery Method Icons ─────────────────────────────────── */

import type { DeliveryTab } from "./types";

/** Delivery method badge — Door / Pickup (uses theme icon paths) */
export function DeliveryMethodIcon({ type }: { type: DeliveryTab }) {
  const theme = useCheckoutTheme();
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: 42, height: 42 }}
    >
      <img
        src={type === "door" ? theme.doorstepIcon : theme.pickupIcon}
        alt={type === "door" ? "Doorstep" : "Pickup"}
        style={{ width: 42, height: 42 }}
      />
    </div>
  );
}

/* ─── Card Brand Icons ──────────────────────────────────────── */

import type { CardBrand } from "./utils";

/** Card brand badge — Visa / Mastercard / generic fallback */
export function CardBrandIcon({ brand }: { brand: CardBrand }) {
  const theme = useCheckoutTheme();
  if (brand === "visa") {
    return (
      <div
        className="w-8 h-5 rounded-md flex items-center justify-center"
        style={{
          background: "rgba(0,83,226,0.08)",
          border: "1px solid rgba(0,83,226,0.2)",
        }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M3 9 7 1h2.1L5.1 9H3Z" fill={theme.primaryColor} />
          <path
            d="M8.2 9 12.2 1h2.1l-4 8H8.2Z"
            fill={theme.primaryColor}
            opacity="0.65"
          />
        </svg>
      </div>
    );
  }

  if (brand === "mastercard") {
    return (
      <div
        className="w-8 h-5 rounded-md flex items-center justify-center"
        style={{
          background: "rgba(0,0,0,0.03)",
          border: "1px solid var(--color-sand)",
        }}
      >
        <div className="relative w-4.5 h-3">
          <span
            className="absolute left-0 top-0 w-3 h-3 rounded-full"
            style={{ background: "#EA001B" }}
          />
          <span
            className="absolute left-1.5 top-0 w-3 h-3 rounded-full"
            style={{ background: "#FF9900", opacity: 0.95 }}
          />
        </div>
      </div>
    );
  }

  // Generic card fallback
  return (
    <div
      className="w-8 h-5 rounded-md flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.03)",
        border: "1px solid var(--color-sand)",
      }}
    >
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <rect
          x="1"
          y="1"
          width="12"
          height="8"
          rx="2"
          stroke="var(--color-muted)"
          strokeWidth="1"
        />
        <path d="M1 4h12" stroke="var(--color-muted)" strokeWidth="1" />
      </svg>
    </div>
  );
}
