// ---------------------------------------------
// Rating.tsx — CHUNK 1
// ---------------------------------------------

import React, {
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
  ReactNode,
} from "react";

// ---------------------------------------------
// Variant Names (30+ variants)
// ---------------------------------------------
export type RatingVariantName =
  | "star"
  | "heart"
  | "emoji"
  | "mood"
  | "thumbs"
  | "circle"
  | "pill"
  | "bar"
  | "blocks"
  | "battery"
  | "thermometer"
  | "diamond"
  | "triangle"
  | "signal"
  | "lightning"
  | "dot"
  | "hourglass"
  | "planet"
  | "leaf"
  | "eco"
  | "segments"
  | "coin"
  | "food"
  | "music"
  | "game"
  | "target"
  | "palette"
  | "beaker"
  | "flag"
  | "medal"
  | "award"
  | "distribution"; // special layout

// ---------------------------------------------
// Rating Component Props
// ---------------------------------------------
export interface RatingProps {
  value?: number | null;
  defaultValue?: number | null;
  max?: number;
  precision?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  variant?: RatingVariantName;

  icon?: ReactNode; // overrides variant icon
  emptyIcon?: ReactNode; // overrides variant empty icon

  size?: number; // icon size
  gap?: number; // gap between icons in pixels
  className?: string;
  style?: React.CSSProperties;

  animation?: "scale" | "pulse" | "none";

  tooltipTexts?: string[]; // used via native title attribute

  showValue?: boolean;

  getLabelText?: (value: number, max: number) => string;

  onChange?: (event: React.SyntheticEvent | null, value: number | null) => void;
  onHoverChange?: (
    event: React.SyntheticEvent | null,
    value: number | null
  ) => void;

  name?: string;
  id?: string;

  highlightSelectedOnly?: boolean;

  // special variant required prop
  distribution?: number[];
}

// ---------------------------------------------
// Strict variant errors (you selected mode C)
// ---------------------------------------------
export class RatingError extends Error {
  constructor(message: string) {
    super(`[Rating Component Error]: ${message}`);
  }
}

export const assertVariantProp = (
  variant: RatingVariantName,
  props: RatingProps
) => {
  if (variant === "distribution" && !props.distribution) {
    throw new RatingError(
      `Variant "distribution" requires prop "distribution: number[]".`
    );
  }
};

// ---------------------------------------------
// Helper: Round to precision
// ---------------------------------------------
export const roundToPrecision = (val: number, precision: number) => {
  return Math.round(val / precision) * precision;
};

// ---------------------------------------------
// Helper: clamp
// ---------------------------------------------
export const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

// ---------------------------------------------
// CHUNK 1 END — next chunk will include all icons
// ---------------------------------------------

// ---------------------------------------------
// Rating.tsx — CHUNK 2 (ICONS)
// ---------------------------------------------

// All icons return ReactNode and accept "size" + "filled" when relevant.

// ---------------------------------------------
// ⭐ Default SVG Star
// ---------------------------------------------
export const IconStar = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-yellow-400" : "text-gray-300"}
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// ---------------------------------------------
// ❤️ Heart SVG
// ---------------------------------------------
export const IconHeart = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-red-500" : "text-gray-300"}
    fill="currentColor"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
    5.42 4.42 3 7.5 3c1.74 0 3.41.81 
    4.5 2.09C13.09 3.81 14.76 3 16.5 
    3 19.58 3 22 5.42 22 8.5c0 
    3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// ---------------------------------------------
// 💎 Diamond SVG
// ---------------------------------------------
export const IconDiamond = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-cyan-400" : "text-gray-300"}
    fill="currentColor"
  >
    <path d="M12 2l7 9-7 11L5 11l7-9z" />
  </svg>
);

// ---------------------------------------------
// 🔺 Triangle SVG
// ---------------------------------------------
export const IconTriangle = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-orange-400" : "text-gray-300"}
    fill="currentColor"
  >
    <path d="M12 2l10 20H2L12 2z" />
  </svg>
);

// ---------------------------------------------
// 🟢 Circle SVG
// ---------------------------------------------
export const IconCircle = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="10"
      className={filled ? "fill-green-500" : "fill-gray-300"}
    />
  </svg>
);

// ---------------------------------------------
// 📶 Signal Bars SVG
// ---------------------------------------------
export const IconSignal = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-blue-500" : "text-gray-300"}
    fill="currentColor"
  >
    <path d="M3 22h2V10H3v12zm4 0h2V6H7v16zm4 0h2V2h-2v20zm4 0h2V14h-2v8zm4 0h2V18h-2v4z" />
  </svg>
);

// ---------------------------------------------
// 🔋 Battery SVG
// ---------------------------------------------
export const IconBattery = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size + 6}
    height={size}
    viewBox="0 0 28 20"
    className={filled ? "text-green-500" : "text-gray-300"}
    fill="currentColor"
  >
    <rect x="2" y="4" width="22" height="12" rx="2" />
    <rect x="24" y="7" width="2" height="6" rx="1" />
  </svg>
);

// ---------------------------------------------
// 🌡 Thermometer SVG
// ---------------------------------------------
export const IconThermometer = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-red-600" : "text-gray-300"}
    fill="currentColor"
  >
    <path d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z" />
  </svg>
);

// ---------------------------------------------
// 🧊 Blocks SVG
// ---------------------------------------------
export const IconBlocks = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      className={filled ? "fill-indigo-500" : "fill-gray-300"}
    />
    <rect
      x="13"
      y="3"
      width="8"
      height="8"
      className={filled ? "fill-indigo-500" : "fill-gray-300"}
    />
    <rect
      x="3"
      y="13"
      width="8"
      height="8"
      className={filled ? "fill-indigo-500" : "fill-gray-300"}
    />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      className={filled ? "fill-indigo-500" : "fill-gray-300"}
    />
  </svg>
);

// ---------------------------------------------
// 🎨 Palette SVG
// ---------------------------------------------
export const IconPalette = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={filled ? "text-amber-500" : "text-gray-300"}
  >
    <path d="M12 2a10 10 0 100 20c1.66 0 3-1.34 3-3a2 2 0 00-2-2h-1a1 1 0 010-2 3 3 0 100-6 3 3 0 100-6z" />
  </svg>
);

// ---------------------------------------------
// 🪙 Coin SVG
// ---------------------------------------------
export const IconCoin = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-yellow-500" : "text-gray-300"}
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="10" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="10"
      fill="white"
      fontWeight="bold"
    >
      $
    </text>
  </svg>
);

// ---------------------------------------------
// 🧪 Beaker SVG
// ---------------------------------------------
export const IconBeaker = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={filled ? "text-green-400" : "text-gray-300"}
    fill="currentColor"
  >
    <path d="M6 2h12v2H6V2zm1 4h10l1 12a5 5 0 01-5 5h-2a5 5 0 01-5-5L7 6z" />
  </svg>
);

// ---------------------------------------------
// 🏅 Medal SVG
// ---------------------------------------------
export const IconMedal = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="6"
      className={filled ? "fill-yellow-400" : "fill-gray-300"}
    />
  </svg>
);

// ---------------------------------------------
// 🏆 Award SVG
// ---------------------------------------------
export const IconAward = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="8"
      r="4"
      className={filled ? "fill-yellow-500" : "fill-gray-300"}
    />
    <rect
      x="10"
      y="12"
      width="4"
      height="8"
      className={filled ? "fill-yellow-500" : "fill-gray-300"}
    />
  </svg>
);

// ---------------------------------------------
// 🌿 Leaf SVG
// ---------------------------------------------
export const IconLeaf = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 2C7 2 3 6 3 11s4 9 9 9 9-4 9-9S17 2 12 2z"
      className={filled ? "fill-green-600" : "fill-gray-300"}
    />
  </svg>
);

// ---------------------------------------------
// 🌍 Planet SVG
// ---------------------------------------------
export const IconPlanet = ({
  filled,
  size,
}: {
  filled: boolean;
  size: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="8"
      className={filled ? "fill-blue-500" : "fill-gray-300"}
    />
  </svg>
);

// ---------------------------------------------
// 🎮 Game Controller Emoji
// ---------------------------------------------
export const IconGame = ({ filled }: { filled: boolean }) =>
  filled ? "🎮" : "🎮";

// ---------------------------------------------
// 🎵 Music Emoji
// ---------------------------------------------
export const IconMusic = ({ filled }: { filled: boolean }) =>
  filled ? "🎵" : "🎵";

// ---------------------------------------------
// 🍔 Food Emoji
// ---------------------------------------------
export const IconFood = ({ filled }: { filled: boolean }) =>
  filled ? "🍔" : "🍔";

// ---------------------------------------------
// 😀 Mood Face Emoji
// ---------------------------------------------
export const IconMood = ({ filled }: { filled: boolean }) =>
  filled ? "😀" : "😐";

// ---------------------------------------------
// 👍 Thumbs Emoji
// ---------------------------------------------
export const IconThumb = ({ filled }: { filled: boolean }) =>
  filled ? "👍" : "👎";

// ---------------------------------------------
// 🎯 Target Emoji
// ---------------------------------------------
export const IconTarget = ({ filled }: { filled: boolean }) =>
  filled ? "🎯" : "⚪";

// ---------------------------------------------
// ⚡ Lightning Emoji
// ---------------------------------------------
export const IconLightning = ({ filled }: { filled: boolean }) =>
  filled ? "⚡" : "⚡";

// ---------------------------------------------
// ⭐ Emoji Star
// ---------------------------------------------
export const IconStarEmoji = ({ filled }: { filled: boolean }) =>
  filled ? "⭐" : "☆";

// ---------------------------------------------
// ✨ Sparkle SVG
// ---------------------------------------------
export const IconSparkle = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2z" fill={filled ? "#FFD166" : "#E5E7EB"} />
    <circle cx="20" cy="4" r="1" fill={filled ? "#FFD166" : "#E5E7EB"} />
  </svg>
);

// ---------------------------------------------
// 🔖 Bookmark SVG
// ---------------------------------------------
export const IconBookmark = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2h12v20l-6-4-6 4V2z" className={filled ? "text-indigo-500" : "text-gray-300"} />
  </svg>
);

// ---------------------------------------------
// 🔥 Flame SVG
// ---------------------------------------------
export const IconFlame = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2s4 3 4 7c0 4-4 6-4 6s-4-2-4-6c0-4 4-7 4-7z" className={filled ? "text-red-500" : "text-gray-300"} />
  </svg>
);

// ---------------------------------------------
// 🎗 Ribbon SVG
// ---------------------------------------------
export const IconRibbon = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3 6 6 1-4.5 4L18 22l-6-4-6 4 1.5-9L2 9l6-1 3-6z" fill={filled ? "#F97316" : "#E5E7EB"} />
  </svg>
);

// ---------------------------------------------
// 🏆 Cup SVG
// ---------------------------------------------
export const IconCup = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 3h16v2a6 6 0 01-6 6H10A6 6 0 014 5V3zM7 17a5 5 0 0010 0H7z" className={filled ? "text-amber-400" : "text-gray-300"} />
  </svg>
);

// ---------------------------------------------
// CHUNK 2 END — next chunk will include VARIANT REGISTRY
// ---------------------------------------------

// ---------------------------------------------
// Rating.tsx — CHUNK 3 (VARIANT REGISTRY)
// ---------------------------------------------

// All variants map to:
// {
//   defaultIcon?: ReactNode,
//   defaultEmptyIcon?: ReactNode,
//   max?: number,
//   size?: number,
//   allowHalf?: boolean
// }

export interface VariantConfig {
  defaultIcon?: (args: { filled: boolean; size: number }) => ReactNode;
  defaultEmptyIcon?: (args: { filled: boolean; size: number }) => ReactNode;
  max?: number;
  size?: number;
  allowHalf?: boolean;
}

export const VARIANT_REGISTRY: Record<RatingVariantName, VariantConfig> = {
  // ---------------------------------------------
  // ⭐ CLASSIC STAR RATING
  // ---------------------------------------------
  star: {
    defaultIcon: IconStar,
    defaultEmptyIcon: IconStar,
    allowHalf: true,
    size: 28,
  },

  // ---------------------------------------------
  // ❤️ HEARTS
  // ---------------------------------------------
  heart: {
    defaultIcon: IconHeart,
    defaultEmptyIcon: IconHeart,
    allowHalf: true,
    size: 30,
  },

  // ---------------------------------------------
  // 😀 EMOJI STARS
  // ---------------------------------------------
  emoji: {
    defaultIcon: ({ filled }) => IconStarEmoji({ filled }),
    defaultEmptyIcon: ({ filled }) => IconStarEmoji({ filled }),
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 😀😐😖 MOOD FACES
  // ---------------------------------------------
  mood: {
    defaultIcon: ({ filled }) => IconMood({ filled }),
    defaultEmptyIcon: ({ filled }) => IconMood({ filled }),
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 👍 THUMBS
  // ---------------------------------------------
  thumbs: {
    defaultIcon: ({ filled }) => IconThumb({ filled }),
    defaultEmptyIcon: ({ filled }) => IconThumb({ filled }),
    max: 2,
    allowHalf: false,
    size: 32,
  },

  // ---------------------------------------------
  // 🟢 CIRCLE
  // ---------------------------------------------
  circle: {
    defaultIcon: IconCircle,
    defaultEmptyIcon: IconCircle,
    allowHalf: false,
    size: 26,
  },

  // ---------------------------------------------
  // ➖ PILL SHAPE
  // ---------------------------------------------
  pill: {
    defaultIcon: ({ filled, size }) => (
      <div
        style={{ width: size * 2, height: size / 1.3 }}
        className={`rounded-full ${
          filled ? "bg-blue-500" : "bg-gray-300"
        } transition-all`}
      ></div>
    ),
    defaultEmptyIcon: ({ filled, size }) => (
      <div
        style={{ width: size * 2, height: size / 1.3 }}
        className={`rounded-full ${
          filled ? "bg-blue-500" : "bg-gray-300"
        } transition-all`}
      ></div>
    ),
    allowHalf: false,
    size: 18,
  },

  // ---------------------------------------------
  // 📶 BAR (SEGMENTS)
  // ---------------------------------------------
  bar: {
    defaultIcon: ({ filled, size }) => (
      <div
        style={{ width: size * 1.8, height: size / 2.5 }}
        className={`${
          filled ? "bg-green-500" : "bg-gray-300"
        } rounded-sm`}
      ></div>
    ),
    defaultEmptyIcon: ({ filled, size }) => (
      <div
        style={{ width: size * 1.8, height: size / 2.5 }}
        className={`${
          filled ? "bg-green-500" : "bg-gray-300"
        } rounded-sm`}
      ></div>
    ),
    allowHalf: false,
    size: 20,
  },

  // ---------------------------------------------
  // 🧊 BLOCKS
  // ---------------------------------------------
  blocks: {
    defaultIcon: IconBlocks,
    defaultEmptyIcon: IconBlocks,
    allowHalf: false,
    size: 28,
  },

  // ---------------------------------------------
  // 🔋 BATTERY LEVEL
  // ---------------------------------------------
  battery: {
    defaultIcon: IconBattery,
    defaultEmptyIcon: IconBattery,
    allowHalf: false,
    size: 24,
  },

  // ---------------------------------------------
  // 🌡 THERMOMETER
  // ---------------------------------------------
  thermometer: {
    defaultIcon: IconThermometer,
    defaultEmptyIcon: IconThermometer,
    allowHalf: false,
    size: 26,
  },

  // ---------------------------------------------
  // 💎 DIAMOND
  // ---------------------------------------------
  diamond: {
    defaultIcon: IconDiamond,
    defaultEmptyIcon: IconDiamond,
    allowHalf: true,
    size: 26,
  },

  // ---------------------------------------------
  // 🔺 TRIANGLE
  // ---------------------------------------------
  triangle: {
    defaultIcon: IconTriangle,
    defaultEmptyIcon: IconTriangle,
    allowHalf: false,
    size: 26,
  },

  // ---------------------------------------------
  // 📶 SIGNAL BARS
  // ---------------------------------------------
  signal: {
    defaultIcon: IconSignal,
    defaultEmptyIcon: IconSignal,
    allowHalf: false,
    size: 28,
  },

  // ---------------------------------------------
  // ⚡ LIGHTNING
  // ---------------------------------------------
  lightning: {
    defaultIcon: ({ filled }) => IconLightning({ filled }),
    defaultEmptyIcon: ({ filled }) => IconLightning({ filled }),
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // • DOT
  // ---------------------------------------------
  dot: {
    defaultIcon: ({ filled, size }) => (
      <div
        style={{ width: size / 2, height: size / 2 }}
        className={`rounded-full ${
          filled ? "bg-black" : "bg-gray-300"
        }`}
      ></div>
    ),
    defaultEmptyIcon: ({ filled, size }) => (
      <div
        style={{ width: size / 2, height: size / 2 }}
        className={`rounded-full ${
          filled ? "bg-black" : "bg-gray-300"
        }`}
      ></div>
    ),
    allowHalf: false,
    size: 14,
  },

  // ---------------------------------------------
  // ⏳ HOURGLASS
  // ---------------------------------------------
  hourglass: {
    defaultIcon: ({ filled }) => (filled ? "⏳" : "⌛"),
    defaultEmptyIcon: ({ filled }) => (filled ? "⏳" : "⌛"),
    allowHalf: false,
    size: 28,
  },

  // ---------------------------------------------
  // 🌍 PLANET ICON
  // ---------------------------------------------
  planet: {
    defaultIcon: IconPlanet,
    defaultEmptyIcon: IconPlanet,
    allowHalf: false,
    size: 28,
  },

  // ---------------------------------------------
  // 🍃 LEAF
  // ---------------------------------------------
  leaf: {
    defaultIcon: IconLeaf,
    defaultEmptyIcon: IconLeaf,
    allowHalf: false,
    size: 26,
  },

  // ---------------------------------------------
  // 🌱 ECO (alias of leaf)
  // ---------------------------------------------
  eco: {
    defaultIcon: IconLeaf,
    defaultEmptyIcon: IconLeaf,
    allowHalf: false,
    size: 28,
  },

  // ---------------------------------------------
  // 🎨 Palette
  // ---------------------------------------------
  palette: {
    defaultIcon: IconPalette,
    defaultEmptyIcon: IconPalette,
    allowHalf: false,
    size: 28,
  },

  // ---------------------------------------------
  // 🎮 Game Controller
  // ---------------------------------------------
  game: {
    defaultIcon: ({ filled }) => IconGame({ filled }),
    defaultEmptyIcon: ({ filled }) => IconGame({ filled }),
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 🎵 Music Notes
  // ---------------------------------------------
  music: {
    defaultIcon: ({ filled }) => IconMusic({ filled }),
    defaultEmptyIcon: ({ filled }) => IconMusic({ filled }),
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 🍔 Food
  // ---------------------------------------------
  food: {
    defaultIcon: ({ filled }) => IconFood({ filled }),
    defaultEmptyIcon: ({filled}) => IconFood({filled}),
    allowHalf: false,
    size: 32,
  },

  // ---------------------------------------------
  // 🎯 Target
  // ---------------------------------------------
  target: {
    defaultIcon: ({ filled }) => IconTarget({ filled }),
    defaultEmptyIcon: ({ filled }) => IconTarget({ filled }),
    allowHalf: true,
    size: 30,
  },

  // ---------------------------------------------
  // 🪙 Coin
  // ---------------------------------------------
  coin: {
    defaultIcon: IconCoin,
    defaultEmptyIcon: IconCoin,
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 🧪 Beaker
  // ---------------------------------------------
  beaker: {
    defaultIcon: IconBeaker,
    defaultEmptyIcon: IconBeaker,
    allowHalf: false,
    size: 28,
  },

  // ---------------------------------------------
  // 🎖 Medal
  // ---------------------------------------------
  medal: {
    defaultIcon: IconMedal,
    defaultEmptyIcon: IconMedal,
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 🏆 Award
  // ---------------------------------------------
  award: {
    defaultIcon: IconAward,
    defaultEmptyIcon: IconAward,
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 📊 SEGMENTS
  // ---------------------------------------------
  segments: {
    defaultIcon: ({ filled, size }) => (
      <div
        style={{ width: size, height: size / 2.5 }}
        className={`${
          filled ? "bg-purple-500" : "bg-gray-300"
        } rounded-sm`}
      ></div>
    ),
    defaultEmptyIcon: ({ filled, size }) => (
      <div
        style={{ width: size, height: size / 2.5 }}
        className={`${
          filled ? "bg-purple-500" : "bg-gray-300"
        } rounded-sm`}
      ></div>
    ),
    allowHalf: false,
    size: 20,
  },

  // ---------------------------------------------
  // 🚩 FLAG
  // ---------------------------------------------
  flag: {
    defaultIcon: ({ filled }) => (filled ? "🚩" : "🏳️"),
    defaultEmptyIcon: ({ filled }) => (filled ? "🚩" : "🏳️"),
    allowHalf: false,
    size: 30,
  },

  // ---------------------------------------------
  // 📊 DISTRIBUTION (special layout)
  // ---------------------------------------------
  distribution: {
    defaultIcon: IconStar,
    defaultEmptyIcon: IconStar,
    allowHalf: false,
    size: 28,
  },
};

// ---------------------------------------------
// CHUNK 3 END — Next chunk: MAIN RATING LOGIC + RENDERING
// ---------------------------------------------

// ---------------------------------------------
// Rating.tsx — CHUNK 4 (MAIN COMPONENT)
// ---------------------------------------------

const Rating: React.FC<RatingProps> = ({
  value,
  defaultValue = null,
  max,
  precision = 1,
  allowHalf,
  allowClear = true,
  readOnly = false,
  disabled = false,

  variant = "star",

  icon,
  emptyIcon,

  size,
  gap,
  className = "",
  style,
  animation = "scale",

  tooltipTexts = [],
  showValue = false,

  getLabelText = (v, m) => `${v} of ${m}`,

  onChange,
  onHoverChange,

  name,
  id,

  highlightSelectedOnly,

  distribution,
}) => {
  // ---------------------------------------------
  // Validate special variant
  // ---------------------------------------------
  assertVariantProp(variant, { distribution });

  // ---------------------------------------------
  // Load variant defaults
  // ---------------------------------------------
  const variantConfig = VARIANT_REGISTRY[variant];

  const finalMax = max ?? distribution?.length ?? variantConfig.max ?? 5;
  const finalSize = size ?? variantConfig.size ?? 28;
  const finalAllowHalf = allowHalf ?? variantConfig.allowHalf ?? false;
  // Use the precision as provided. If allowHalf is true and precision > 0.5,
  // default to 0.5 to enable half-star selection. Otherwise use the provided precision.
  const finalPrecision = finalAllowHalf 
    ? (precision <= 0.5 ? precision : 0.5) 
    : precision;

  // ---------------------------------------------
  // Internal states
  // ---------------------------------------------
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const [internalValue, setInternalValue] = useState<number | null>(
    value ?? defaultValue
  );

  // Controlled behavior
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  // ---------------------------------------------
  // Compute display value
  // ---------------------------------------------
  const displayValue = hoverValue ?? internalValue ?? 0;

  // ---------------------------------------------
  // Fraction detector - supports fine precision
  // ---------------------------------------------
  const detectFraction = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Calculate the fraction of the icon that was clicked (0 to 1)
    const fraction = x / width;
    
    // Round to the nearest precision step
    // For precision=0.5: returns 0.5 or 1
    // For precision=0.25: returns 0.25, 0.5, 0.75, or 1
    const steps = 1 / finalPrecision;
    const roundedFraction = Math.ceil(fraction * steps) / steps;
    
    return Math.max(finalPrecision, Math.min(1, roundedFraction));
  };

  // ---------------------------------------------
  // Hover Handler
  // ---------------------------------------------
  const handleHover = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    if (readOnly || disabled) return;

    let val = index + 1;

    if (finalAllowHalf) {
      const part = detectFraction(e, index);
      val = index + part;
    }

    val = roundToPrecision(val, finalPrecision);
    setHoverValue(val);
    onHoverChange?.(e, val);
  };

  // ---------------------------------------------
  // Clear hover
  // ---------------------------------------------
  const clearHover = () => {
    if (!readOnly && !disabled) setHoverValue(null);
  };

  // ---------------------------------------------
  // Click Handler
  // ---------------------------------------------
  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    val: number,
    index: number
  ) => {
    if (readOnly || disabled) return;

    // allowClear: clicking same value unselects
    if (allowClear && internalValue === val) {
      setInternalValue(null);
      onChange?.(e, null);
      return;
    }

    setInternalValue(val);
    onChange?.(e, val);
  };

  // ---------------------------------------------
  // Keyboard Handler
  // ---------------------------------------------
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || disabled) return;

    const step = finalPrecision;

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      const newVal = clamp((internalValue ?? 0) + step, 0, finalMax);
      setInternalValue(newVal);
      onChange?.(null, newVal);
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      const newVal = clamp((internalValue ?? 0) - step, 0, finalMax);
      setInternalValue(newVal);
      onChange?.(null, newVal);
    }
  };

  // ---------------------------------------------
  // Render Icon Generator
  // ---------------------------------------------
  const makeIcon = (filled: boolean) => {
    // User overrides everything
    if (filled && icon) return icon;
    if (!filled && emptyIcon) return emptyIcon;

    // Variant defaults
    const def = filled
      ? variantConfig.defaultIcon
      : variantConfig.defaultEmptyIcon;

    if (def) {
      const result = def({ filled, size: finalSize });
      // If the variant returns a simple emoji/string, wrap it so it respects `finalSize`
      if (typeof result === "string" || typeof result === "number") {
        return (
          <span style={{ fontSize: finalSize, lineHeight: 1 }}>
            {result}
          </span>
        );
      }

      return result;
    }

    // fallback (should never happen)
    return <span>?</span>;
  };

  // ---------------------------------------------
  // DISTRIBUTION MODE (special layout)
  // ---------------------------------------------
  if (variant === "distribution" && distribution) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {distribution.map((count, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="text-sm font-medium text-white">Level {i + 1}</div>
            <div className="h-3 w-48 bg-gray-200 rounded overflow-hidden">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${count}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ---------------------------------------------
  // MAIN RENDER (normal mode)
  // ---------------------------------------------
  return (
    <div
      id={id}
      tabIndex={readOnly || disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-readonly={readOnly}
      aria-disabled={disabled}
      aria-label={name}
      style={style}
      className={`flex items-center gap-2 select-none ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >  
      {/* Rating Icons */}
      <div 
        className="flex items-center"
        style={{ gap: gap !== undefined ? `${gap}px` : '4px' }}
      >
        {Array.from({ length: finalMax }).map((_, index) => {
          // Filled vs Empty logic
          const fullVal = index + 1;
          const halfVal = index + 0.5;

          let filled = fullVal <= displayValue;

          if (finalAllowHalf) {
            filled = displayValue >= fullVal
              ? true
              : displayValue >= halfVal;
          }

          if (highlightSelectedOnly) {
            // Only highlight the exact selected star, not all stars up to it
            filled = internalValue !== null && fullVal === Math.ceil(internalValue);
          }

          const tooltip =
            tooltipTexts[index] ??
            getLabelText(index + 1, finalMax);

          return (
            <span
              key={index}
              role="radio"
              aria-checked={filled}
              aria-label={tooltip}
              title={tooltip} // native tooltip
              className={`
                cursor-pointer inline-flex transition-all
                ${animation === "scale" ? "hover:scale-125" : ""}
                ${animation === "pulse" ? "hover:animate-pulse" : ""}
              `}
              onMouseMove={(e) => handleHover(e, index)}
              onMouseLeave={clearHover}
              onClick={(e) => {
                let val = index + 1;
                if (finalAllowHalf) val = index + detectFraction(e, index);
                val = roundToPrecision(val, finalPrecision);
                handleClick(e, val, index);
              }}
            >
              {
                // Determine visual state using an effective value so highlightSelectedOnly
                // can lock the visual to the selected value while hover still uses hoverValue.
                (() => {
                  let effectiveValue = displayValue;
                  if (highlightSelectedOnly && internalValue !== null) {
                    effectiveValue = internalValue;
                  }

                  const fullValLocal = index + 1;

                  // For highlightSelectedOnly, only the exact selected star should be filled
                  let isFullVisual = effectiveValue >= fullValLocal;
                  if (highlightSelectedOnly && internalValue !== null) {
                    isFullVisual = fullValLocal === Math.ceil(internalValue);
                  }
                  
                  // Calculate partial fill: how much of this icon should be filled
                  // e.g., if effectiveValue=2.25 and index=1 (2nd star), partialFill = 0.25
                  let partialFill = finalAllowHalf 
                    ? Math.max(0, Math.min(1, effectiveValue - index))
                    : (effectiveValue >= fullValLocal ? 1 : 0);
                  
                  // For highlightSelectedOnly, only allow partial on the exact selected star
                  if (highlightSelectedOnly && internalValue !== null) {
                    if (fullValLocal !== Math.ceil(internalValue)) {
                      partialFill = 0;
                    }
                  }
                  
                  const isPartialVisual = finalAllowHalf && partialFill > 0 && partialFill < 1;

                  if (isPartialVisual) {
                    // Render empty icon in-flow and overlay a clipped filled icon above.
                    // The clip width is based on the actual partial fill percentage.
                    const clipPercent = `${partialFill * 100}%`;
                    return (
                      <span style={{ position: "relative", display: "inline-block", lineHeight: 0 }}>
                        <span style={{ display: "inline-block" }}>{makeIcon(false)}</span>
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            overflow: "hidden",
                            width: clipPercent,
                          }}
                        >
                          <span style={{ display: "inline-block", width: "100%", height: "100%" }}>{makeIcon(true)}</span>
                        </span>
                      </span>
                    );
                  }

                  // Full or empty
                  return makeIcon(isFullVisual);
                })()
              }
            </span>
          );
        })}
      </div>

      {/* Optional value label */}
      {showValue && (
        <span className="text-sm font-medium text-white">
          {internalValue ?? 0}/{finalMax}
        </span>
      )}
    </div>
  );
};

// ---------------------------------------------
// CHUNK 4 END — Next chunks will include:
// CHUNK 5: Type Exports + Default Props + Final Export
// ---------------------------------------------

export default Rating;

// ---------------------------------------------
// Rating.tsx — CHUNK 5 (EXPORTS + USAGE)
// ---------------------------------------------

// ---------------------------------------------
// Default props
// ---------------------------------------------
Rating.defaultProps = {
  value: null,
  defaultValue: null,
  max: 5,
  precision: 1,
  readOnly: false,
  disabled: false,
  allowHalf: false,
  allowClear: true,
  size: 28,
  animation: "scale",
  showValue: false,
  highlightSelectedOnly: false,
  getLabelText: (v: number, m: number) => `${v} of ${m}`,
};

// ---------------------------------------------
// Example usage snippets
// ---------------------------------------------

/* 
import Rating from "./Rating";
*/

export const RatingExamples = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 1. Basic Star */}
      <div>
        <div>⭐ Basic Star</div>
        <Rating />
      </div>

      {/* 2. Heart */}
      <div>
        <div>❤️ Heart</div>
        <Rating variant="heart" />
      </div>

      {/* 3. Emoji */}
      <div>
        <div>😀 Emoji</div>
        <Rating variant="emoji" />
      </div>

      {/* 4. Mood */}
      <div>
        <div>😀😐😖 Mood</div>
        <Rating variant="mood" />
      </div>

      {/* 5. Thumbs */}
      <div>
        <div>👍 Thumbs</div>
        <Rating variant="thumbs" />
      </div>

      {/* 6. Circle */}
      <div>
        <div>🟢 Circle</div>
        <Rating variant="circle" />
      </div>

      {/* 7. Pill */}
      <div>
        <div>➖ Pill</div>
        <Rating variant="pill" />
      </div>

      {/* 8. Bar */}
      <div>
        <div>📶 Bar</div>
        <Rating variant="bar" />
      </div>

      {/* 9. Blocks */}
      <div>
        <div>🧊 Blocks</div>
        <Rating variant="blocks" />
      </div>

      {/* 10. Battery */}
      <div>
        <div>🔋 Battery</div>
        <Rating variant="battery" />
      </div>

      {/* 11. Thermometer */}
      <div>
        <div>🌡 Thermometer</div>
        <Rating variant="thermometer" />
      </div>

      {/* 12. Diamond */}
      <div>
        <div>💎 Diamond</div>
        <Rating variant="diamond" allowHalf />
      </div>

      {/* 13. Triangle */}
      <div>
        <div>🔺 Triangle</div>
        <Rating variant="triangle" />
      </div>

      {/* 14. Signal */}
      <div>
        <div>📶 Signal</div>
        <Rating variant="signal" />
      </div>

      {/* 15. Lightning */}
      <div>
        <div>⚡ Lightning</div>
        <Rating variant="lightning" />
      </div>

      {/* 16. Dot */}
      <div>
        <div>• Dot</div>
        <Rating variant="dot" />
      </div>

      {/* 17. Hourglass */}
      <div>
        <div>⏳ Hourglass</div>
        <Rating variant="hourglass" />
      </div>

      {/* 18. Planet */}
      <div>
        <div>🌍 Planet</div>
        <Rating variant="planet" />
      </div>

      {/* 19. Leaf */}
      <div>
        <div>🍃 Leaf</div>
        <Rating variant="leaf" />
      </div>

      {/* 20. Eco */}
      <div>
        <div>🌱 Eco</div>
        <Rating variant="eco" />
      </div>

      {/* 21. Palette */}
      <div>
        <div>🎨 Palette</div>
        <Rating variant="palette" />
      </div>

      {/* 22. Game */}
      <div>
        <div>🎮 Game</div>
        <Rating variant="game" />
      </div>

      {/* 23. Music */}
      <div>
        <div>🎵 Music</div>
        <Rating variant="music" />
      </div>

      {/* 24. Food */}
      <div>
        <div>🍔 Food</div>
        <Rating variant="food" />
      </div>

      {/* 25. Target */}
      <div>
        <div>🎯 Target</div>
        <Rating variant="target" allowHalf />
      </div>

      {/* 26. Coin */}
      <div>
        <div>🪙 Coin</div>
        <Rating variant="coin" />
      </div>

      {/* 27. Beaker */}
      <div>
        <div>🧪 Beaker</div>
        <Rating variant="beaker" />
      </div>

      {/* 28. Medal */}
      <div>
        <div>🎖 Medal</div>
        <Rating variant="medal" />
      </div>

      {/* 29. Award */}
      <div>
        <div>🏆 Award</div>
        <Rating variant="award" />
      </div>

      {/* 30. Distribution */}
      <div>
        <div>📊 Distribution</div>
        <Rating
          variant="distribution"
          distribution={[10, 25, 50, 70, 100]}
        />
      </div>
    </div>
  );
};
