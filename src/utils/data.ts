/**
 * Cek apakah sebuah value dianggap "kosong"
 * @param value - nilai yang ingin dicek
 * @returns true jika value null, undefined, "", NaN, atau array/object kosong
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;

  if (typeof value === "string" && value.trim() === "") return true;

  if (typeof value === "number" && isNaN(value)) return true;

  if (Array.isArray(value) && value.length === 0) return true;

  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value as object).length === 0
  ) {
    return true;
  }

  return false;
}
