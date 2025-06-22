import { create } from "zustand";
import type { AnalyticsResult, Status } from "../types/analytics";

interface AnalyticsState {
    uploadedFile: File | null;
    parsedData: AnalyticsResult | null;
    status: Status;
    setUploadedFile: (file: File | null) => void;
    setParsedData: (data: AnalyticsResult | null) => void;
    setStatus: (status: Status) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
    uploadedFile: null,
    parsedData: null,
    status: "idle",
    setUploadedFile: (file) => set({ uploadedFile: file }),
    setParsedData: (data) => set({ parsedData: data }),
    setStatus: (status) => set({ status }),
}));
