/**
 * Format a number as Thai Baht currency.
 * e.g. formatPrice(1500) => "฿1,500.00"
 */
export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(
    amount,
  );

/**
 * Format an ISO date string to English locale.
 * e.g. formatDate("2024-01-15") => "Jan 15, 2024"
 */
export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));

/**
 * Truncate a string to a max length with ellipsis.
 */
export const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

/**
 * Build a full image URL from a relative path.
 */
export const getImageUrl = (path: string): string => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"}${path}`;
};

/**
 * Clamp a number between min and max.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
