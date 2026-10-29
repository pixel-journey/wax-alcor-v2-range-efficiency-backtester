# wax-alcor-v2-range-efficiency-backtester

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** Educational pure-function + unsent-query reference  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** Teach a pure, truncating product of principal × fee rate × time-in-range share, and keep it clearly separate from any live Alcor v2 pool read or historical backtest claim.

**Core rule (do not weaken):**  
This repository multiplies arguments. It does **not** read a pool. The example “10000 principal, 30 bps, 100 of 400 seconds → 7 tokens” is a pure calculation verified by unit test. Neighboring range-share ideas live in other repos.

---

## 1. Overview & Goal

Concentrated-liquidity style positions earn fees only while price stays inside a chosen range. This blueprint isolates the **fee product** so learners can see the arithmetic without conflating it with:
- Live pool state
- Historical tick data
- Full backtesting infrastructure

**Why it matters for WAX / Antelope (Alcor v2 context):**
- Fee math is easy to misstate when mixed with range-efficiency plots or live queries.
- Separating the pure product from data fetching keeps educational claims honest and testable.
- Unsent request builders remain available for composition in other layers.

**Target users:**
- Developers learning concentrated-range fee arithmetic
- Catalog authors who need a clean, non-overclaiming fee primitive
- Anyone comparing this product with pure range-share visualizations elsewhere in the catalog

**Success metrics for this educational repo:**
- Unit test locks the example: 10000 @ 30 bps for 100/400 s → 7
- Request builders stay pure (`executed: false`)
- Documentation never claims a live pool was read or a full backtest was run

---

## 2. Concepts & Inspiration

### Core Concepts
- **Truncating product** — Integer arithmetic with explicit bounds on principal, feeBps, inRangeSec, and windowSec.
- **Time-in-range share** — `inRangeSec / windowSec` is an input, not something this package discovers from a pool.
- **Unsent query builders** — Same educational pattern used across several catalog repos: construct valid public API shapes, never execute them here.
- **Neighbor separation** — Pure range-share visualization lives in `wax-v2-concentrated-range-efficiency-plot` (and similar). This repo multiplies a share by a fee rate.

### User Pain Points Addressed
- “How do I compute a simple fee product without accidentally claiming I backtested a pool?”
- “Where is the pure arithmetic separated from Hyperion / Alcor data access?”

### Inspirations
- Educational finance primitives that stay argument-only
- Catalog discipline that prefers small correct claims over large incomplete ones

**Related Blueprints:**
- `wax-v2-concentrated-range-efficiency-plot` (range share itself)
- Other Alcor / DeFi educational blueprints in the catalog

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- Offline educational page (`src/Demo.tsx`)
- Clear presentation of the pure fee product and the example numbers
- Cases that reinforce the educational scenarios without implying live data

### 3.2 Key Pieces
| Piece | Role |
|-------|------|
| `src/fee.ts` | Pure `feeTokens(principal, feeBps, inRangeSec, windowSec)` |
| `src/fee.test.ts` | Locks the verified example (10000, 30, 100, 400 → 7) |
| `src/api.ts` | Validated, unsent WAX/Antelope request builders |
| `src/usecases.ts` | Example compositions |
| `src/api.test.ts` / `src/usecases.test.ts` | Prove requests are built and not sent |
| `src/Demo.tsx` / `src/Cases.tsx` | Offline educational surface |

### 3.3 Accessibility & Inclusive Design
- Plain language preferred; numbers and formulas shown explicitly

### 3.4 Performance & Optimization Targets
- Pure integer/BigInt arithmetic for the fee product
- No network dependency for the educational truth of the package

---

## 4. Technical Architecture

### 4.1 Core Tech Stack
- TypeScript (strict) + Vitest
- Next.js App Router for the offline demo shell
- No Alcor SDK dependency required for the pure fee rule

### 4.2 Fee Product
```
feeTokens(principal, feeBps, inRangeSec, windowSec)
  → tokens = floor( principal * feeBps * inRangeSec / (10000 * windowSec) )
```
Bounds are enforced; invalid inputs throw.

### 4.3 Request Builder Pattern (unsent)
Identical educational pattern to sibling repos: every builder returns `{ method, url, body?, executed: false }`.

### 4.4 Folder Structure (current)
```
app/
  layout.tsx
  page.tsx
  globals.css
src/
  fee.ts
  fee.test.ts
  api.ts
  api.test.ts
  usecases.ts
  usecases.test.ts
  Demo.tsx
  Cases.tsx
.github/workflows/ci.yml
VERIFICATION-LOG.md
ARCHITECTURE.md
PUBLIC-READINESS.md
spec.yaml
LICENSE
```

### 4.5 Security & Privacy Notes
- No private keys, no signing, no pool reads from this package
- Request builders only construct URLs and bodies

---

## 5. Implementation Examples & Code Snippets

### The verified pure product
```ts
import { feeTokens } from "./src/fee";

const { tokens } = feeTokens(10_000, 30, 100, 400);
// tokens === 7
```

### Build an unsent request (same pattern as sibling educational repos)
```ts
import { historyActions, HISTORY_ORIGIN } from "./src/api";

const req = historyActions(HISTORY_ORIGIN, "someaccount", "eosio.token:transfer", 20);
// req.executed === false
```

---

## 6. Demo & Testing Strategy

```bash
npm install
npm test          # fee, api, usecases
npm run dev       # offline educational page
```

- `src/fee.test.ts` verifies the canonical example
- API / usecases tests verify unsent builders
- No test claims a live Alcor pool match or a historical backtest

See [VERIFICATION-LOG.md](VERIFICATION-LOG.md).

---

## 7. Roadmap & Development Phases

**Current state (intentional):**
- Pure fee product with strict bounds and unit test
- Unsent request builders
- Offline demo and verification log

**Explicit non-goals:**
- Reading live or historical pool state inside this package
- Claiming a full Alcor v2 backtester
- Treating the pure product as measured mainnet performance

Range-share visualization and richer backtest tooling belong in differently scoped repositories.

---

## 8. Visual References & Expected Experience

**Key screen:**  
Offline page showing the pure fee product, the verified numeric example, and educational cases that do not execute network calls.

---

## 9. Related Blueprints & Ecosystem Fit

- Pure range-share neighbor: `wax-v2-concentrated-range-efficiency-plot`
- Shares unsent-request-builder pattern with other catalog educational repos
- Reinforces honest separation of arithmetic from data access

---

## 10. License, Contributing & Credits

- MIT License
- Built to keep fee arithmetic honest and separable
- Pixel Journey Design System & Standards alignment
- See [VERIFICATION-LOG.md](VERIFICATION-LOG.md) and [PUBLIC-READINESS.md](PUBLIC-READINESS.md)

**This blueprint multiplies the numbers it is given and stops there.**

*Pixel Journey — Honest interfaces and honest documentation for public blockchain data.*

---

*Last updated: 2026-10-29 — README elevated to full educational blueprint standard while preserving the pure-function and non-backtest claims.*
