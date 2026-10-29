# Verification log

**Trust label:** educational-reference  
**Updated:** 2026-10-29 (Deep educational pass)

| Claim | Evidence | State |
| --- | --- | --- |
| 10000 at 30 bps for 100 of 400 seconds is 7 | `src/fee.test.ts` | verified (unit) |
| Zero tokens when in-range is zero | `src/fee.test.ts` | verified (unit) |
| Requests are built and not sent | `src/usecases.test.ts` and `src/api.test.ts` | verified (unit) |
| Demo renders the same functions | `src/Demo.tsx` | partial (inspection) |
| Fee math documented | `docs/FEE-MATH.md` | verified (docs) |
| Worked examples documented | `docs/WORKED-EXAMPLES.md` | verified (docs) |
| Architecture documented | `ARCHITECTURE.md` | verified (docs) |
| A live endpoint matches this repo | none | untested |
| Historical Alcor backtest | **not claimed** | permanent non-goal |
| Live pool read in fee path | **not claimed** | permanent non-goal |

```bash
npm test
```

## Deep-pass notes (2026-10-29)

- Added `docs/FEE-MATH.md` and `docs/WORKED-EXAMPLES.md`
- Expanded `ARCHITECTURE.md`
- Pure product semantics unchanged
