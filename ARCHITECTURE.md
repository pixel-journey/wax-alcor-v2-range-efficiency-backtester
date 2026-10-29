# Architecture

**Trust label:** `educational-reference`  
**Repo:** `wax-alcor-v2-range-efficiency-backtester`

---

## Purpose

Integer division after multiplying principal, fee bps, and seconds in range. Inputs are arguments, so this is **not** a historical backtest and **not** a live pool reader.

---

## System overview

```
┌──────────────────────────────────────────────┐
│              Offline demo UI                  │
│              Demo.tsx · Cases.tsx             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              Pure fee product                 │
│     fee.ts → feeTokens(...) → { tokens }      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│         Unsent request builders               │
│         api.ts · usecases.ts                  │
└──────────────────────────────────────────────┘
         │
         └── no pool read · no fetch in fee path
```

---

## Layers

1. **Fee core** — `feeTokens` with BigInt math and strict bounds
2. **Builders** — Educational unsent WAX/Antelope request shapes
3. **Demo** — Calls the same pure functions as tests

---

## Honesty boundaries

| Boundary | Enforcement |
|----------|-------------|
| No historical backtest | No time series ingested |
| No live pool | Fee path is argument-only |
| Truncating product only | Unit test on 7.5 → 7 |

---

## Deep docs

- [docs/FEE-MATH.md](docs/FEE-MATH.md)
- [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md)
- [VERIFICATION-LOG.md](VERIFICATION-LOG.md)
- [README.md](README.md)

---

## Extension rules

Do not rename this into a full Alcor backtester without a new scope and trust discussion. Range-share plots belong in neighboring repos.

---

*Pixel Journey — Architecture that multiplies only what it is given.*
