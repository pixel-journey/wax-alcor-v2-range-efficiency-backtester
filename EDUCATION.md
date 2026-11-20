# Education — a truncating product, not a backtest

> **Rung:** `npm test` passes. The numbers are arguments. No pool is read.  
> **The test is the rule.** Concentrated range share, which this file does not compute, lives in the public range labs.

## Predict, then run

Tokens are `floor(principal * feeBps * inRangeSec / (10000 * windowSec))`. The division is integer. The remainder is dropped.

| Call | Locked result |
| --- | --- |
| principal 10000, fee 30 bps, 100 of 400 seconds | `7`. The exact product is 7.5. |
| 0 seconds in range | `0` |
| the full 400 of 400 | `30` |
| fee 10000 bps and the full window | `10000`, the principal |
| window of 0 | throws |
| 401 seconds in a window of 400 | throws |

A fee of 10000 basis points is the whole principal only when the window is fully in range. This is not an Alcor v2 pool read and not a historical backtest.
