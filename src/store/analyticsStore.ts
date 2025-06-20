import { create } from "zustand";
import type { Status } from "../types/analytics";

interface AnalyticsState {
    uploadedFile: File | null;
    parsedData: any;
    status: Status;
    setUploadedFile: (file: File | null) => void;
    setParsedData: (data: any) => void;
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
