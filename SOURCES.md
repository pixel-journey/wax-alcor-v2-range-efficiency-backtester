# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX development context |
| [docs/FEE-MATH.md](docs/FEE-MATH.md) | The product this lab actually locks |
| [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md) | 7, 0, 30, and the refusals |

## Product facts locked by tests

```text
tokens = floor( principal * feeBps * inRangeSec / (10000 * windowSec) )
```

- 10000 principal, 30 bps, 100 of 400 seconds → **7** (exact 7.5, floored).
- Full window at 30 bps → **30**. Full window at 10000 bps → the principal.
- Zero seconds, zero fee, or zero principal → **0**.
- Window must be 1 .. 31_536_000. In-range seconds cannot exceed the window.
- Inputs are arguments. **No pool is read.** This is not a historical backtest.
- 2500 bps of the window is not 2500 tokens.
- Teaching units are **not** PXJ. Pixel Journey token labs keep **PXJ precision at 8**.

Neighbor that plots range share without this product: `wax-v2-concentrated-range-efficiency-plot`.
