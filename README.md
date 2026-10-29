# wax-alcor-v2-range-efficiency-backtester

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** Educational pure-function reference + Deep documentation pass  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** Teach a pure, truncating product of principal × fee rate × time-in-range share, and keep it clearly separate from any live Alcor v2 pool read or historical backtest claim.

**Core rule (do not weaken):**  
This repository multiplies arguments. It does **not** read a pool. The example “10000 principal, 30 bps, 100 of 400 seconds → 7 tokens” is a pure calculation verified by unit test. Neighboring range-share ideas live in other repos.

---

## Deep educational documentation

| Guide | What it teaches |
|-------|-----------------|
| [docs/FEE-MATH.md](docs/FEE-MATH.md) | Formula, bounds, truncation, share vs tokens, non-claims |
| [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md) | Canonical, zero, full-window, and invalid-input scenarios |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Layers, honesty boundaries, extension rules |

---

## 1. Overview & Goal

Concentrated-liquidity style positions earn fees only while price stays inside a chosen range. This blueprint isolates the **fee product** so learners can see the arithmetic without conflating it with live pool state, historical tick data, or full backtesting infrastructure.

**Why it matters for WAX / Antelope (Alcor v2 context):**
- Fee math is easy to misstate when mixed with range-efficiency plots or live queries.
- Separating the pure product from data fetching keeps educational claims honest and testable.

**Success metrics:**
- Unit test locks 10000 @ 30 bps for 100/400 s → 7
- Request builders stay pure (`executed: false`)
- Documentation never claims a live pool was read or a full backtest was run

---

## 2. Concepts & Inspiration

- **Truncating product** — Integer/BigInt arithmetic with explicit bounds
- **Time-in-range share as input** — Not discovered from a pool here
- **Unsent query builders** — Educational composition only
- **Neighbor separation** — Range-share plots: `wax-v2-concentrated-range-efficiency-plot`

---

## 3. Design Specifications

Offline educational page; pure `feeTokens`; unsent builders; plain-language formulas.

| Piece | Role |
|-------|------|
| `src/fee.ts` | Pure product |
| `src/fee.test.ts` | Locks 7 and zero cases |
| `src/api.ts` / `usecases.ts` | Unsent builders |
| `docs/*` | Deep teaching guides |

---

## 4. Technical Architecture

See **[ARCHITECTURE.md](ARCHITECTURE.md)**.

```
feeTokens(principal, feeBps, inRangeSec, windowSec)
  → tokens = floor( principal * feeBps * inRangeSec / (10000 * windowSec) )
```

---

## 5. Implementation Examples

```ts
import { feeTokens } from "./src/fee";

feeTokens(10_000, 30, 100, 400); // { tokens: 7 }
feeTokens(10_000, 30, 0, 400);   // { tokens: 0 }
```

More: [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md) · [docs/FEE-MATH.md](docs/FEE-MATH.md).

---

## 6. Demo & Testing

```bash
npm install && npm test && npm run dev
```

See [VERIFICATION-LOG.md](VERIFICATION-LOG.md).

---

## 7. Roadmap

**Current (intentional):** pure fee product, unsent builders, deep docs.  
**Non-goals:** live pool reads, historical Alcor backtests, claiming mainnet performance.

---

## 8–10. Experience, related blueprints, license

Offline page with the pure product and verified example. Related: range-share neighbor repos. MIT. Pixel Journey standards.

**This blueprint multiplies the numbers it is given and stops there.**

*Pixel Journey — Honest interfaces and honest documentation for public blockchain data.*

---

*Last updated: 2026-10-29 — Deep educational pass: FEE-MATH, WORKED-EXAMPLES, expanded architecture, verification log.*
