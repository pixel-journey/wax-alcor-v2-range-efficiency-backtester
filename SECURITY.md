# Security — truncating fee product

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-integer or out-of-range principal / fee / window / in-range | throws; no token result |
| `inRangeSec` above `windowSec` | throws |
| `windowSec` 0 | throws |
| Canonical 10000 × 30 bps × 100/400 | **7**, not 7.5 or 8 |

The multiply uses `BigInt` before the divide.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Pool state | This function never reads Alcor, a pair, or a tick |
| Rounding mode | Floor is the lab rule; a live AMM may differ |
| Unit meaning | "tokens" are not PXJ minor units |
| Request builders | Unsent bodies are not queries that ran |

## Attack angles

1. Publishing "backtested 7 tokens" from arguments the user typed.  
2. Rounding half-up in a port and still citing this test.  
3. Using JavaScript `number` multiplication near `1e12 * 10000 * window` and losing the low bits before the divide.  
4. Treating time-in-range basis points as the fee itself.

## Honesty limits

No network. No wasm. Official network docs: [docs.wax.io](https://docs.wax.io/). Math: [docs/FEE-MATH.md](docs/FEE-MATH.md).
