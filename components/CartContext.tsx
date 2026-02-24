"use client";

import type { Product } from "@/lib/products";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ─── Cart Item Shape ─── */
export interface CartItem {
  /** composite key: productId-colorIdx-size */
  key: string;
  product: Product;
  colorIdx: number;
  selectedSize: string;
  quantity: number;
}

/* ─── Context Shape ─── */
interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;

  /** Add (or increment) an item. Pass originRect for the fly-to-bag dot. */
  addItem: (
    product: Product,
    colorIdx: number,
    selectedSize: string,
    originRect?: DOMRect,
  ) => void;
  /** Decrease quantity of a specific item; removes at 0. */
  decrementItem: (key: string) => void;
  /** Increment quantity of a specific item. */
  incrementItem: (key: string) => void;
  /** Remove an item entirely. */
  removeCartItem: (key: string) => void;

  /** Legacy — decrement total (used by product-card inline stepper) */
  removeItem: () => void;

  /** Bag icon ref for fly-to animation target */
  bagRef: React.RefObject<HTMLButtonElement | null>;
  /** Trigger wiggle externally */
  triggerWiggle: () => void;
  wiggling: boolean;
  /** Flying dot state */
  flyingDot: { x: number; y: number; active: boolean };

  /** Drawer state */
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  subtotal: 0,
  addItem: () => {},
  decrementItem: () => {},
  incrementItem: () => {},
  removeCartItem: () => {},
  removeItem: () => {},
  bagRef: { current: null },
  triggerWiggle: () => {},
  wiggling: false,
  flyingDot: { x: 0, y: 0, active: false },
  isCheckoutOpen: false,
  openCheckout: () => {},
  closeCheckout: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

/* ─── Helper: make a stable key ─── */
function itemKey(productId: string, colorIdx: number, size: string) {
  return `${productId}-${colorIdx}-${size}`;
}

/* ─── Provider ─── */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wiggling, setWiggling] = useState(false);
  const [flyingDot] = useState({ x: 0, y: 0, active: false });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const bagRef = useRef<HTMLButtonElement | null>(null);

  /* derived */
  const totalItems = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [items],
  );

  /* body scroll lock */
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCheckoutOpen]);

  const triggerWiggle = useCallback(() => {
    setWiggling(true);
    setTimeout(() => setWiggling(false), 600);
  }, []);

  /* ── fly-to-bag helper (unchanged from original) ── */
  const flyToBag = useCallback(
    (originRect?: DOMRect) => {
      if (originRect && bagRef.current) {
        const bagRect = bagRef.current.getBoundingClientRect();
        const startX = originRect.left + originRect.width / 2;
        const startY = originRect.top + originRect.height / 2;

        const dot = document.createElement("div");
        dot.style.cssText = `
          position: fixed;
          z-index: 9999;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-gold);
          box-shadow: 0 0 8px rgba(201, 169, 110, 0.6);
          left: ${startX - 6}px;
          top: ${startY - 6}px;
          pointer-events: none;
          transition: all 0.65s cubic-bezier(0.22, 0.61, 0.36, 1);
        `;
        document.body.appendChild(dot);

        dot.getBoundingClientRect();
        requestAnimationFrame(() => {
          dot.style.left = `${bagRect.left + bagRect.width / 2 - 6}px`;
          dot.style.top = `${bagRect.top + bagRect.height / 2 - 6}px`;
          dot.style.width = "6px";
          dot.style.height = "6px";
          dot.style.opacity = "0.6";
        });

        setTimeout(() => {
          dot.remove();
          triggerWiggle();
        }, 650);
      } else {
        triggerWiggle();
      }
    },
    [triggerWiggle],
  );

  /* ── core cart actions ── */
  const addItem = useCallback(
    (
      product: Product,
      colorIdx: number,
      selectedSize: string,
      originRect?: DOMRect,
    ) => {
      const key = itemKey(product.id, colorIdx, selectedSize);
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) =>
            i.key === key
              ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
              : i,
          );
        }
        return [...prev, { key, product, colorIdx, selectedSize, quantity: 1 }];
      });
      flyToBag(originRect);
    },
    [flyToBag],
  );

  const incrementItem = useCallback(
    (key: string) => {
      setItems((prev) =>
        prev.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(i.quantity + 1, 10) } : i,
        ),
      );
      triggerWiggle();
    },
    [triggerWiggle],
  );

  const decrementItem = useCallback((key: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.key === key);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter((i) => i.key !== key);
      return prev.map((i) =>
        i.key === key ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  }, []);

  const removeCartItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  /** legacy removeItem — just reduces total by 1 (last item) */
  const removeItem = useCallback(() => {
    setItems((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      if (last.quantity <= 1) return prev.slice(0, -1);
      return prev.map((item, idx) =>
        idx === prev.length - 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  }, []);

  /* drawer */
  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        addItem,
        decrementItem,
        incrementItem,
        removeCartItem,
        removeItem,
        bagRef,
        triggerWiggle,
        wiggling,
        flyingDot,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
