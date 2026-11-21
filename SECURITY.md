# Security — truncating fee product (Alcor range sketch)

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-integer or out-of-range principal / fee / window / in-range | throws; no token result |
| `inRangeSec` above `windowSec` | throws |
| `windowSec` 0 | throws |
| Canonical 10000 × 30 bps × 100/400 | **7**, not 7.5 or 8 (floor) |
| BigInt multiply before divide | preserves low bits vs JS number |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Pool state | This function never reads Alcor, a pair, or a tick |
| Rounding mode | Floor is the lab rule; a live AMM may differ |
| Unit meaning | "tokens" are not PXJ minor units |
| Request builders | Unsent bodies are not queries that ran |
| IL / range width | Not this product — see IL heat map sibling |

## Attack angles

1. Publishing "backtested 7 tokens" from arguments the user typed.  
2. Rounding half-up in a port and still citing this test.  
3. Using JavaScript `number` multiplication near large principals and losing low bits.  
4. Treating time-in-range basis points as the fee itself.  
5. Claiming a live Alcor pool was simulated when only pure math ran.

## Honesty limits

No network. No wasm. No live pool. Official: [docs.wax.io](https://docs.wax.io/). Math: [docs/FEE-MATH.md](docs/FEE-MATH.md). Related: [IL heat map](https://github.com/pixel-journey/wax-lp-impermanent-loss-heat-map) · [DeFi health](https://github.com/pixel-journey/wax-defi-protocol-health-dashboard).
