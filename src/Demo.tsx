"use client";

import { feeTokens } from "./fee";

export function Demo() {
  const row = feeTokens(10_000, 30, 100, 400);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>A fee product, not a backtest</h1>
      <p className="lede">10000 principal, 30 bps, 100 of 400 seconds. The product truncates to 7. No swap history is read.</p>
      <p>{row.tokens} tokens.</p>
    </main>
  );
}
