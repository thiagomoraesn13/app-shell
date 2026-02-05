import { cva } from "class-variance-authority";
import { colorTokens } from "@thiagomoraesn13/design-tokens/tokens/colors.js";

// src/styles/colorVariants.ts
export const textColorClass = {
  success: "text-success",
  error: "text-error",
  brand: "text-brand",
} as const;

export const text2 = cva("", {
  variants: { color: textColorClass },
});

export const text = cva("", {
  variants: {
    color: Object.fromEntries(
      Object.keys(colorTokens).map((k) => [k, `text-${k}`]),
    ) as Record<keyof typeof colorTokens, string>,
  },
});

export const bg = cva("", {
  variants: {
    color: Object.fromEntries(
      Object.keys(colorTokens).map((k) => [k, `bg-${k}`]),
    ) as Record<keyof typeof colorTokens, string>,
  },
});
