export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  gallery: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  category: string;
  sizes: string[];
  colors: ProductColor[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: "oversized-crew-sweater",
    name: "Oversized Crew Sweater",
    price: 485,
    description:
      "Crafted from the finest cashmere-blend yarn, this oversized crew sweater embodies effortless luxury. The relaxed silhouette drapes beautifully, while ribbed trims at the neck, cuffs, and hem add subtle structure.",
    details: [
      "70% Cashmere, 30% Silk",
      "Relaxed oversized fit",
      "Ribbed crew neckline",
      "Side seam detailing",
      "Dry clean only",
      "Made in Italy",
    ],
    category: "Knitwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New Arrival",
    colors: [
      {
        name: "Mid Grey",
        hex: "#9E9E9E",
        image: "/products/p1-MidGrey-1.webp",
        gallery: [
          "/products/p1-MidGrey-1.webp",
          "/products/p1-MidGrey-2.webp",
          "/products/p1-MidGrey-3.webp",
          "/products/p1-MidGrey-4.webp",
        ],
      },
      {
        name: "Brushed Black",
        hex: "#2C2C2C",
        image: "/products/p1-BrushedBlack-1.webp",
        gallery: [
          "/products/p1-BrushedBlack-1.webp",
          "/products/p1-BrushedBlack-2.webp",
          "/products/p1-BrushedBlack-3.webp",
          "/products/p1-BrushedBlack-4.webp",
        ],
      },
      {
        name: "Arctic Cable",
        hex: "#E8E0D8",
        image: "/products/p1-ArcticCable-1.webp",
        gallery: [
          "/products/p1-ArcticCable-1.webp",
          "/products/p1-ArcticCable-2.webp",
          "/products/p1-ArcticCable-3.webp",
          "/products/p1-ArcticCable-4.webp",
        ],
      },
      {
        name: "Chanterelle",
        hex: "#C9A96E",
        image: "/products/p1-Chanterelle-1.webp",
        gallery: [
          "/products/p1-Chanterelle-1.webp",
          "/products/p1-Chanterelle-2.webp",
          "/products/p1-Chanterelle-3.webp",
          "/products/p1-Chanterelle-4.webp",
        ],
      },
    ],
  },
  {
    id: "ribbed-polo-top",
    name: "Ribbed Polo Top",
    price: 365,
    description:
      "A refined take on the classic polo, this ribbed top is knitted from a luxurious merino-silk blend. The slim silhouette and delicate rib texture create an understated elegance, perfect for layering or worn alone.",
    details: [
      "65% Merino Wool, 35% Silk",
      "Slim tailored fit",
      "Polo collar with button placket",
      "Fine rib-knit texture",
      "Hand wash cold",
      "Made in Scotland",
    ],
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      {
        name: "Chianti",
        hex: "#722F37",
        image: "/products/p2-1.webp",
        gallery: [
          "/products/p2-1.webp",
          "/products/p2-2.webp",
          "/products/p2-3.webp",
          "/products/p2-4.webp",
        ],
      },
      {
        name: "Cerulean Sheer Rib",
        hex: "#6B8FAD",
        image: "/products/p2-CeruleanSheerRib-1.webp",
        gallery: [
          "/products/p2-CeruleanSheerRib-1.webp",
          "/products/p2-CeruleanSheerRib-2.webp",
          "/products/p2-CeruleanSheerRib-3.webp",
          "/products/p2-CeruleanSheerRib-4.webp",
        ],
      },
      {
        name: "Mole Ice Water",
        hex: "#6B5B4F",
        image: "/products/p2-MoleIceWater-1.webp",
        gallery: [
          "/products/p2-MoleIceWater-1.webp",
          "/products/p2-MoleIceWater-2.webp",
          "/products/p2-MoleIceWater-3.webp",
          "/products/p2-MoleIceWater-4.webp",
        ],
      },
      {
        name: "Parmesan Navy Stripe",
        hex: "#3B4252",
        image: "/products/p2-ParmesanNavyStripe-1.webp",
        gallery: [
          "/products/p2-ParmesanNavyStripe-1.webp",
          "/products/p2-ParmesanNavyStripe-2.webp",
          "/products/p2-ParmesanNavyStripe-3.webp",
          "/products/p2-ParmesanNavyStripe-4.webp",
        ],
      },
    ],
  },
  {
    id: "brushed-noir-pullover",
    name: "Brushed Noir Pullover",
    price: 520,
    description:
      "A statement in textural luxury. This brushed pullover features an ultra-soft alpaca-blend construction with a subtly textured surface. The deep noir colour lends itself to effortless styling day or night.",
    details: [
      "60% Alpaca, 25% Wool, 15% Nylon",
      "Relaxed contemporary fit",
      "Crew neckline",
      "Brushed finish texture",
      "Dry clean recommended",
      "Made in Italy",
    ],
    category: "Knitwear",
    sizes: ["S", "M", "L", "XL"],
    badge: "Bestseller",
    colors: [
      {
        name: "Brushed Black",
        hex: "#2C2C2C",
        image: "/products/p1-BrushedBlack-1.webp",
        gallery: [
          "/products/p1-BrushedBlack-1.webp",
          "/products/p1-BrushedBlack-2.webp",
          "/products/p1-BrushedBlack-3.webp",
          "/products/p1-BrushedBlack-4.webp",
        ],
      },
      {
        name: "Mid Grey",
        hex: "#9E9E9E",
        image: "/products/p1-MidGrey-1.webp",
        gallery: [
          "/products/p1-MidGrey-1.webp",
          "/products/p1-MidGrey-2.webp",
          "/products/p1-MidGrey-3.webp",
          "/products/p1-MidGrey-4.webp",
        ],
      },
    ],
  },
  {
    id: "cerulean-rib-henley",
    name: "Cerulean Rib Henley",
    price: 395,
    description:
      "Our signature rib-knit construction meets a modern henley collar. This top is dyed in a stunning cerulean blue with a sheer finish that catches the light beautifully. A piece that bridges casual and elevated.",
    details: [
      "80% Merino Wool, 20% Cashmere",
      "Regular fit",
      "Henley collar with mother-of-pearl buttons",
      "Sheer rib-knit construction",
      "Hand wash cold",
      "Made in Scotland",
    ],
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      {
        name: "Cerulean Sheer Rib",
        hex: "#6B8FAD",
        image: "/products/p2-CeruleanSheerRib-1.webp",
        gallery: [
          "/products/p2-CeruleanSheerRib-1.webp",
          "/products/p2-CeruleanSheerRib-2.webp",
          "/products/p2-CeruleanSheerRib-3.webp",
          "/products/p2-CeruleanSheerRib-4.webp",
        ],
      },
      {
        name: "Chianti",
        hex: "#722F37",
        image: "/products/p2-1.webp",
        gallery: [
          "/products/p2-1.webp",
          "/products/p2-2.webp",
          "/products/p2-3.webp",
          "/products/p2-4.webp",
        ],
      },
    ],
  },
  {
    id: "arctic-cable-knit",
    name: "Arctic Cable Knit",
    price: 550,
    description:
      "Inspired by Nordic craftsmanship, this cable-knit sweater features a heritage pattern reinterpreted through a contemporary lens. The arctic-toned yarn and chunky texture create a piece that is both cozy and refined.",
    details: [
      "100% Cashmere",
      "Oversized relaxed fit",
      "Cable-knit pattern",
      "Rolled edge finishing",
      "Dry clean only",
      "Made in Scotland",
    ],
    category: "Knitwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {
        name: "Arctic Cable",
        hex: "#E8E0D8",
        image: "/products/p1-ArcticCable-1.webp",
        gallery: [
          "/products/p1-ArcticCable-1.webp",
          "/products/p1-ArcticCable-2.webp",
          "/products/p1-ArcticCable-3.webp",
          "/products/p1-ArcticCable-4.webp",
        ],
      },
      {
        name: "Chanterelle",
        hex: "#C9A96E",
        image: "/products/p1-Chanterelle-1.webp",
        gallery: [
          "/products/p1-Chanterelle-1.webp",
          "/products/p1-Chanterelle-2.webp",
          "/products/p1-Chanterelle-3.webp",
          "/products/p1-Chanterelle-4.webp",
        ],
      },
    ],
  },
  {
    id: "mole-stripe-knit-polo",
    name: "Mole Stripe Knit Polo",
    price: 415,
    description:
      "A study in tonal sophistication. This knit polo combines earthy mole tones with icy water-inspired accents. The subtle stripe detailing adds visual depth without compromising the clean, minimalist silhouette.",
    details: [
      "70% Merino Wool, 30% Silk",
      "Relaxed fit",
      "Polo collar with two-button placket",
      "Tonal stripe pattern",
      "Hand wash cold",
      "Made in Italy",
    ],
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    badge: "Limited Edition",
    colors: [
      {
        name: "Mole Ice Water",
        hex: "#6B5B4F",
        image: "/products/p2-MoleIceWater-1.webp",
        gallery: [
          "/products/p2-MoleIceWater-1.webp",
          "/products/p2-MoleIceWater-2.webp",
          "/products/p2-MoleIceWater-3.webp",
          "/products/p2-MoleIceWater-4.webp",
        ],
      },
      {
        name: "Parmesan Navy Stripe",
        hex: "#3B4252",
        image: "/products/p2-ParmesanNavyStripe-1.webp",
        gallery: [
          "/products/p2-ParmesanNavyStripe-1.webp",
          "/products/p2-ParmesanNavyStripe-2.webp",
          "/products/p2-ParmesanNavyStripe-3.webp",
          "/products/p2-ParmesanNavyStripe-4.webp",
        ],
      },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
