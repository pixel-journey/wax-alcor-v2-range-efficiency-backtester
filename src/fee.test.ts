import { describe, expect, it } from "vitest";
import { feeTokens } from "./fee";

describe("fee product", () => {
  it("truncates 7.5 to 7", () => {
    expect(feeTokens(10_000, 30, 100, 400)).toEqual({ tokens: 7 });
  });

  it("is zero when the window is missed", () => {
    expect(feeTokens(10_000, 30, 0, 400)).toEqual({ tokens: 0 });
  });
});
