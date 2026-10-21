/**
 * Truncating product of principal, a fee rate, and time in range.
 * The numbers are arguments. No pool is read.
 */

export function feeTokens(principal: number, feeBps: number, inRangeSec: number, windowSec: number): { tokens: number } {
  if (!Number.isInteger(principal) || principal < 0 || principal > 1_000_000_000_000) throw new Error("principal must be an integer from 0 to 1000000000000");
  if (!Number.isInteger(feeBps) || feeBps < 0 || feeBps > 10_000) throw new Error("feeBps must be an integer from 0 to 10000");
  if (!Number.isInteger(windowSec) || windowSec < 1 || windowSec > 31_536_000) throw new Error("windowSec must be an integer from 1 to 31536000");
  if (!Number.isInteger(inRangeSec) || inRangeSec < 0 || inRangeSec > windowSec) throw new Error("inRangeSec must be an integer from 0 to the window");
  const tokens = (BigInt(principal) * BigInt(feeBps) * BigInt(inRangeSec)) / (10_000n * BigInt(windowSec));
  return { tokens: Number(tokens) };
}
