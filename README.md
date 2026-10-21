# A fee product, not a backtest

**Trust label:** `educational-reference`  
**Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

10000 principal, 30 bps, and 100 of 400 seconds truncates to 7. The in-range share alone is a different repo. No pool is read.

This repo was empty. It now contains one rule and two unsent queries.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `src/fee.ts` | The pure rules |
| `src/fee.test.ts` | The claims in the verification log |
| `src/usecases.ts` | HTTP requests, built and not sent |
| `src/api.ts` | The same unsent WAX query builders as the other educational repos |
| `src/Demo.tsx` | Offline page |

`npm test` runs the rules. `npm run dev` opens the page.

## Where the neighboring idea lives

The share of the window by itself is `wax-v2-concentrated-range-efficiency-plot` (100 of 400 seconds is 2500 bps). This repo multiplies that kind of share by a fee rate. 2500 bps is not the token result.

## Queries

`executed` is false. This repo did not call any host. No transaction is invented.
