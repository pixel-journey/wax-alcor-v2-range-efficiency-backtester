# Worked Examples

**Trust label:** `educational-reference`  
**Repo:** `wax-alcor-v2-range-efficiency-backtester`

---

## Example A — Canonical (verified by unit test)

```ts
feeTokens(10_000, 30, 100, 400) // → { tokens: 7 }
```

| Quantity | Value |
|----------|-------|
| Principal | 10_000 |
| Fee | 30 bps |
| In range | 100 s of 400 s (25% of window) |
| Intermediate | 7.5 |
| Truncated tokens | **7** |

---

## Example B — Missed the window

```ts
feeTokens(10_000, 30, 0, 400) // → { tokens: 0 }
```

No time in range → no fee product, regardless of principal or fee rate.

---

## Example C — Full window

```ts
feeTokens(10_000, 30, 400, 400)
// floor(10000 * 30 * 400 / (10000 * 400)) = floor(30) = 30
```

---

## Example D — Higher fee, shorter in-range

```ts
feeTokens(10_000, 100, 50, 400)
// floor(10000 * 100 * 50 / (10000 * 400)) = floor(12.5) = 12
```

---

## Example E — Invalid inputs (throw)

```ts
feeTokens(10_000, 30, 500, 400) // inRangeSec > windowSec → Error
feeTokens(-1, 30, 100, 400)     // principal out of range → Error
feeTokens(10_000, 30.5, 100, 400) // non-integer feeBps → Error
```

---

## Reproduce

```ts
import { feeTokens } from "../src/fee";

console.log(feeTokens(10_000, 30, 100, 400));
console.log(feeTokens(10_000, 30, 0, 400));
```

```bash
npm test
```

---

## Review prompts

1. Holding principal and fee fixed, how does doubling `inRangeSec` (without exceeding the window) change tokens under truncation?
2. Why is Example A’s 7 not evidence that a specific Alcor position earned 7 tokens historically?

---

*Pixel Journey — Show the arithmetic, then keep the claim small.*
