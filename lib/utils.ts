export const formatJPY = (value: number) =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(value);

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
