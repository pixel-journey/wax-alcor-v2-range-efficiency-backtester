# Education — a truncating fee product, not a backtest

> **Rung:** `npm test` passes. The numbers are arguments. No pool is read.  
> **The test is the rule.** Concentrated range share, which this file does not compute, lives in the public range labs.

Official context: [docs.wax.io](https://docs.wax.io/). This lab does **not** call Alcor, Hyperion, or any pool contract.

Formula and bounds: [docs/FEE-MATH.md](docs/FEE-MATH.md) · numbers: [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Compute the locked 7-token case by hand and say why 7.5 becomes 7 |
| Intermediate | Name the four bounds and which inputs throw |
| Masterclass | Separate this product from a live LP backtest |

---

## Beginner — one scene

```text
tokens = floor( principal * feeBps * inRangeSec / (10000 * windowSec) )
```

| Call | Locked result |
| --- | --- |
| principal 10000, fee 30 bps, 100 of 400 seconds | **7**. The exact product is 7.5. |
| 0 seconds in range | **0** |
| the full 400 of 400 | **30** |
| fee 10000 bps and the full window | **10000**, the principal |
| window of 0 | throws |
| 401 seconds in a window of 400 | throws |

A fee of 10000 basis points is the whole principal only when the window is fully in range.

### Words

| Word | Meaning here |
| --- | --- |
| principal | Teaching notional, integer 0 .. 1e12 |
| feeBps | 30 means 0.30% in this framing, not a live pool fee |
| inRangeSec | Seconds the caller **already** says were inside the range |
| windowSec | Denominator. Must be at least 1 |

```bash
npm test
```

---

## Intermediate — bounds and truncation

| Parameter | Valid |
| --- | --- |
| principal | integer 0 .. 1_000_000_000_000 |
| feeBps | integer 0 .. 10_000 |
| windowSec | integer 1 .. 31_536_000 |
| inRangeSec | integer 0 .. windowSec |

The multiply happens in `BigInt`. The divide truncates toward zero. Remainder is dropped, not rounded half-up.

100/400 of the window is **2500 bps of time**. That share is **not** the token result. Tokens also multiply by the fee rate.

Zero principal, zero fee, or zero seconds each return **0**. None of those is an error.

---

## Masterclass

### Common mistakes

1. Calling the 7 a historical Alcor backtest. No tick series was read.  
2. Using `Number` for the whole product near the principal cap. The lab multiplies in bigint, then converts the quotient.  
3. Treating 2500 bps of time-in-range as 2500 tokens.  
4. Rounding 7.5 up to 8. This lab floors.  
5. Passing a measured share from another tool and then claiming this repo discovered the share.

### What production still needs (not this repo)

| Need | Why |
| --- | --- |
| Pool read | Volume, fee tier, and active liquidity are chain state |
| Tick history | In-range seconds are an input here, not a measurement |
| Rounding policy | A DEX may round differently; retest before you copy the floor |
| Token precision | These "tokens" are teaching units, not PXJ@8 |

**PXJ precision is always 8** in Pixel Journey token labs. Do not silently reuse this function as a PXJ payout.

### Exercises

1. Why is the canonical case 7 and not 8?  
2. Full window, fee 30 bps, principal 10000 — tokens? (30.)  
3. Does `inRangeSec === windowSec` and `feeBps === 10000` return the principal? (Yes.)  
4. Name one fact still missing before anyone may say "backtested."

---

## What this course will not teach

- A live Alcor v2 pool read
- Historical price or tick ingestion
- Guaranteed LP income
