import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export function getCurrentDate(): Date {
  return new Date();
}

/**
 * Mengonversi tanggal lokal ke format UTC (ISO 8601)
 * @param date - Tanggal dalam bentuk string atau Date object
 * @returns string UTC ISO (contoh: 2025-11-05T08:21:16.000Z)
 */
export function toUTC(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    throw new Error("Invalid date input");
  }

  return d.toISOString();
}

export function dateFormat(date: string | Date, format = "DD/MM/YYYY"): string {
  if (!date) return "-";

  const d = dayjs(date);

  if (!d.isValid()) return "-";

  return d.format(format);
}

/**
 * Convert tahun (number) ke Date di 1 Januari tahun tersebut.
 * @param year - Tahun dalam bentuk number (misal 2025)
 * @returns Date instance (misal 2025-01-01)
 */
export function yearToDate(year?: number | null): Date | undefined {
  if (!year) return undefined;
  return new Date(year, 0, 1);
}

/**
 * Convert Date ke tahun (number).
 * @param date - Date instance
 * @returns Tahun dalam bentuk number (misal 2025)
 */
export function dateToYear(date?: Date | null): number | undefined {
  if (!date) return undefined;
  return date.getFullYear();
}

/**
 * Mengembalikan tanggal pada bulan berikutnya dari tanggal tertentu.
 */
export function getNextMonthDate(date = new Date()): Date {
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth;
}

/**
 * Mengembalikan tanggal pada bulan sebelumnya dari tanggal tertentu.
 */
export function getPreviousMonthDate(date = new Date()): Date {
  const prevMonth = new Date(date);
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  return prevMonth;
}

/**
 * Mengembalikan tanggal yang sama tapi di tahun berikutnya.
 */
export function getNextYearDate(date = new Date()): Date {
  const nextYear = new Date(date);
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  return nextYear;
}

/**
 * Mengembalikan tanggal yang sama tapi di tahun sebelumnya.
 */
export function getPreviousYearDate(date = new Date()): Date {
  const prevYear = new Date(date);
  prevYear.setFullYear(prevYear.getFullYear() - 1);
  return prevYear;
}

/**
 * Mengembalikan hanya bulan berikutnya (1–12).
 */
export function getNextMonthNumber(date = new Date()): number {
  const nextMonth = (date.getMonth() + 1) % 12;
  return nextMonth === 0 ? 12 : nextMonth;
}

/**
 * Mengembalikan hanya bulan sebelumnya (1–12).
 */
export function getPreviousMonthNumber(date = new Date()): number {
  const prevMonth = (date.getMonth() - 1 + 12) % 12;
  return prevMonth === 0 ? 12 : prevMonth;
}

/**
 * Mengembalikan tahun berikutnya (misal 2025 → 2026)
 */
export function getNextYearNumber(date = new Date()): number {
  return date.getFullYear() + 1;
}

/**
 * Mengembalikan tahun sebelumnya (misal 2025 → 2024)
 */
export function getPreviousYearNumber(date = new Date()): number {
  return date.getFullYear() - 1;
}
