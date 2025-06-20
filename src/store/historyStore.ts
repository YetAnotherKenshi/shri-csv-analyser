import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AnalyticsResult {
    fileName: string;
    timestamp: string;
    status: "error" | "success";
    error?: string;
}

interface HistoryState {
    results: AnalyticsResult[];
    addResult: (result: AnalyticsResult) => void;
    deleteResult: (idx: number) => void;
    clear: () => void;
}

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set) => ({
            results: [],
            addResult: (result) =>
                set((state) => ({ results: [...state.results, result] })),
            deleteResult: (idx) =>
                set((state) => ({
                    results: state.results.filter((_, i) => i !== idx),
                })),
            clear: () =>
                set(() => ({
                    results: [],
                })),
        }),
        {
            name: "analyticsResults",
        }
    )
);
