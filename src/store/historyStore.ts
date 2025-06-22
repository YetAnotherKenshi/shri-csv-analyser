import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HistoryRecord } from "../types/history";

interface HistoryState {
    records: HistoryRecord[];
    addRecord: (record: HistoryRecord) => void;
    deleteRecord: (idx: number) => void;
    clear: () => void;
}

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set) => ({
            records: [],
            addRecord: (record) =>
                set((state) => ({ records: [record, ...state.records] })),
            deleteRecord: (idx) =>
                set((state) => ({
                    records: state.records.filter((_, i) => i !== idx),
                })),
            clear: () =>
                set(() => ({
                    records: [],
                })),
        }),
        {
            name: "HistoryRecords",
        }
    )
);
