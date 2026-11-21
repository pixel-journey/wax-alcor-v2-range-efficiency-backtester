# AI prompts

Non-negotiables. The tests win.

- Formula: `floor(principal * feeBps * inRangeSec / (10000 * windowSec))`.
- Locked case: principal 10000, fee 30 bps, 100 seconds inside a 400 second window → **7**. Do not round 7.5 up.
- Do not fetch Alcor. Do not add a pool id, a tick, or a candle series to make the name "v3".
- v2 market data (`/api/v2/pairs`, `/api/v2/tickers`, `/api/v2/amm/...`) is still hosted. A **new** client uses `/api/v3/market`, `/api/v3/analytics`, or `https://api.alcor.exchange/v3/feed`. This repository calls none of them.
- Call `https://wax.alcor.exchange/api/` for WAX. `alcor.exchange/api` redirects there and hides EOS, Telos, and XPR.
- Token id shape: `symbol-contract` lowercase. Contract field `base_token` is the API **target**, not the base.
- Result units are teaching integers, not PXJ. PXJ precision is 8 in the token labs, not here.
- No wasm, no wallet, no private key, no broadcast.
- Width from `wax-alcor-v2-range-optimizer` is not this fee product.

## If asked to upgrade the lab to Alcor v3

Leave the formula and the number 7. Add a sentence that points at [docs.alcor.exchange/api](https://docs.alcor.exchange/api). A live backtest is a different product and is not this repo.

## Seeds

1. Show the division that makes 7.5, then the floor, without opening a socket.
2. The user pasted `GET /api/v2/tickers`. Say that route is still documented, name the v3 route a new price client should use, and refuse to mix that JSON into the floor.
3. Explain why `1_000_000` as "0.01 WAX" must not be pasted in as the principal unless the caller says the units are WAX minor units. This function does not know the symbol.
