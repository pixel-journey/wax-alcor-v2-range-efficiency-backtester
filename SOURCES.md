# Sources

| Source | Use |
| --- | --- |
| [docs.alcor.exchange/api](https://docs.alcor.exchange/api) | v3 for a new client; v2 market data still documented |
| [docs.wax.io](https://docs.wax.io/) | WAX development context, not a pool read |
| [docs/FEE-MATH.md](docs/FEE-MATH.md) | The product this lab actually locks |
| [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md) | 7, 0, 30, and the refusals |
| [AI_PROMPTS.md](AI_PROMPTS.md) | What an agent must not "upgrade" |

## Product facts locked by tests

```text
tokens = floor( principal * feeBps * inRangeSec / (10000 * windowSec) )
```

- 10000 principal, 30 bps, 100 of 400 seconds → **7** (exact 7.5, floored).
- Full window at 30 bps → **30**. Full window at 10000 bps → the principal.
- Zero seconds, zero fee, or zero principal → **0**.
- Window must be 1 .. 31_536_000. In-range seconds cannot exceed the window.
- Inputs are arguments. **No pool is read.** This is not a historical backtest of v2 or of v3.
- 2500 bps of the window is not 2500 tokens.
- Teaching units are **not** PXJ. Pixel Journey token labs keep **PXJ precision at 8**.
- The same floor is chain-portable. Swap symbol and precision before calling the result WAX, EOS, or PXJ.

Neighbor that plots range share without this product: `wax-v2-concentrated-range-efficiency-plot`.

## Alcor HTTP (this lab does not call it)

The `v2` in the repository name is historical. It is not the HTTP version, and it is not an instruction to keep a new client on `/api/v2`.

[docs.alcor.exchange/api](https://docs.alcor.exchange/api) is the reference. Checked against that index:

| Job | Call | Status |
| --- | --- | --- |
| New token, pool, price, depth | `https://<chain>.alcor.exchange/api/v3/market/...` | Preferred |
| Live updates | `wss://<chain>.alcor.exchange/api/v3/market/stream` | Preferred over polling |
| TVL, volume, scores | `/api/v3/analytics/...` on the same chain host | Preferred |
| Cross-chain feed | `https://api.alcor.exchange/v3/feed/...` | Ids include `wax`, `eos`, `telos`, or `xpr` |
| Spot pairs, tickers, candles, AMM lists | `/api/v2/pairs`, `/api/v2/tickers`, `/api/v2/amm/...` | **Still hosted.** Not what this lab uses |

`<chain>` is `wax`, `eos`, `telos`, or `proton`. `https://alcor.exchange/api/` redirects to WAX. The XPR feed prefix is `xpr`, not `proton`.

Token id is `<symbol>-<contract>` lowercase (`wax-eosio.token`, `tlm-alien.worlds`). On-chain, the market row's `base_token` is the **API target** (the quote). `quote_token` is the API base.

v2 errors are plain text. v3 errors are `{"error":"..."}`.

| Chain | Spot contract | AMM contract |
| --- | --- | --- |
| WAX | `alcordexmain` | `swap.alcor` |
| EOS | `eostokensdex` | `swap.alcor` |
| Telos | `eostokensdex` | `swap.alcor` |
| XPR | `alcor` | `swap.alcor` |

The same AMM account name is not the same table. Integer rules in this lab do port. Those account names do not.

WharfKit, if a later host signs: [wharfkit/skill](https://github.com/wharfkit/skill) (`git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit`). There is no Alcor MCP to install. Do not invent one.

