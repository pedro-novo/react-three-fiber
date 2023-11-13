import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Phase = "ready" | "playing" | "ended";

interface GameState {
  blocksCount: number;
  blocksSeed: number;
  phase: Phase;
  startTime: number;
  endTime: number;
  setBlocksCount: (blocksCount: number) => void;
  start: () => void;
  restart: () => void;
  end: () => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set) => ({
    blocksCount: 10,
    blocksSeed: 0,
    phase: "ready",
    startTime: 0,
    endTime: 0,
    setBlocksCount: (blocksCount) => set(() => ({ blocksCount })),
    start: () =>
      set(({ phase }) => {
        if (phase === "ready") {
          return { phase: "playing", startTime: Date.now() };
        }
        return {};
      }),
    restart: () =>
      set(({ phase }) => {
        if (phase === "playing" || phase === "ended") {
          return { phase: "ready", blocksSeed: Math.random() };
        }
        return {};
      }),
    end: () =>
      set(({ phase }) => {
        if (phase === "playing") {
          return { phase: "ended", endTime: Date.now() };
        }
        return {};
      }),
  }))
);
