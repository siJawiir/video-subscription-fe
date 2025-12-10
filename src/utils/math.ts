import Decimal from "decimal.js";

export function calculateTotal(scores: number[]) {
  return scores.reduce((acc, cur) => acc.plus(cur), new Decimal(0)).toNumber();
}

export function calculateAverage(scores: number[]) {
  if (scores.length === 0) return 0;

  const total = calculateTotal(scores);
  return new Decimal(total).div(scores.length).toNumber();
}

export function calculatePercentage(score: number, total: number) {
  return new Decimal(score).div(total).mul(100).toNumber();
}
