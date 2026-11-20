import { describe, expect, it } from "vitest";
import { feeTokens } from "./fee";

describe("fee product", () => {
  it("truncates 7.5 to 7", () => {
    expect(feeTokens(10_000, 30, 100, 400)).toEqual({ tokens: 7 });
  });

  it("is zero when the window is missed, and exact when the window is full", () => {
    expect(feeTokens(10_000, 30, 0, 400)).toEqual({ tokens: 0 });
    expect(feeTokens(10_000, 30, 400, 400)).toEqual({ tokens: 30 });
    expect(feeTokens(10_000, 10_000, 400, 400)).toEqual({ tokens: 10_000 });
  });

  it("refuses a window of 0 and an in-range that exceeds the window", () => {
    expect(() => feeTokens(10_000, 30, 100, 0)).toThrow(/window/);
    expect(() => feeTokens(10_000, 30, 401, 400)).toThrow(/inRange/);
  });
});
