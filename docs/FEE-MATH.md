# Fee Math

**Trust label:** `educational-reference`  
**Repo:** `wax-alcor-v2-range-efficiency-backtester`

---

## The product

$$
\text{tokens} = \left\lfloor \frac{\text{principal} \times \text{feeBps} \times \text{inRangeSec}}{10\,000 \times \text{windowSec}} \right\rfloor
$$

Implemented with `BigInt` intermediate multiplication, then truncating division.

**Inputs are arguments.** This function does not read an Alcor pool, tick history, or oracle.

---

## Parameter bounds (enforced)

| Parameter | Valid range | Notes |
|-----------|-------------|-------|
| `principal` | integer 0 … 1e12 | Notional units for teaching |
| `feeBps` | integer 0 … 10_000 | 30 = 0.30% in this educational framing |
| `windowSec` | integer 1 … 31_536_000 | Up to ~1 year of seconds |
| `inRangeSec` | integer 0 … windowSec | Cannot exceed the window |

Out of range → throw.

---

## Canonical example

```
principal = 10_000
feeBps    = 30
inRangeSec = 100
windowSec  = 400
```

Real-valued intermediate:

$$
\frac{10000 \times 30 \times 100}{10000 \times 400} = \frac{30\,000\,000}{4\,000\,000} = 7.5
$$

Truncating integer division → **7**.

Unit test locks `{ tokens: 7 }`.

---

## Time-in-range share vs fee tokens

- **Share alone:** `inRangeSec / windowSec` (e.g. 100/400 = 0.25 → 2500 bps of the window).
- **This repo:** multiplies principal × fee rate × that share (via the product above).

Neighbor visualization of share without the fee product: `wax-v2-concentrated-range-efficiency-plot` (and similar). **2500 bps of window is not the token result.**

---

## Why truncate?

Educational clarity and deterministic integer tests. Production systems may use fixed-point libraries with different rounding modes; this package teaches one explicit, testable rule.

---

## What this is not

| Non-claim | Why |
|-----------|-----|
| Historical backtest | No series of prices or ticks is ingested |
| Live pool read | No network in the fee function |
| Guaranteed LP income | Real fees depend on volume, competition, and protocol rules |
| Alcor SDK integration | Not required for the pure product |

---

## Edge cases

| Case | Result |
|------|--------|
| `inRangeSec = 0` | 0 tokens |
| `feeBps = 0` | 0 tokens |
| `principal = 0` | 0 tokens |
| Full window in range | floor(principal × feeBps / 10000) |

---

## Classroom prompts

1. Why does 7.5 become 7, and when might a different rounding policy matter?
2. If someone reports “backtested 7 tokens,” what evidence is still missing?
3. How would you compose this product with a *separately measured* in-range fraction from another tool?

---

*Pixel Journey — Multiply the arguments you have; do not invent the pool.*
