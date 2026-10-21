import { ATOMIC_ORIGIN, HISTORY_ORIGIN, historyActions } from "./api";
import { feeTokens } from "./fee";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const row = feeTokens(10_000, 30, 100, 400);

export const USE_CASES: UseCase[] = [
  {
    title: "A transfer history is not this product",
    detail: `The fixture truncates to ${row.tokens}. The history request is not sent.`,
    request: historyActions(HISTORY_ORIGIN, "alice", "eosio.token:transfer", 20),
    transaction: null,
  },
  {
    title: "A template is not a pool",
    detail: "No liquidity action is built. The Alcor contract name is not guessed here.",
    request: { method: "GET", url: `${ATOMIC_ORIGIN}/atomicassets/v1/templates/pixeljourney/1`, executed: false },
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (row.tokens !== 7) throw new Error("fee");
}
