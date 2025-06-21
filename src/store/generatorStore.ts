import { create } from "zustand";
import type { Status } from "../types/analytics";

interface GeneratorStore {
    status: Status;
    setStatus: (status: Status) => void;
}

export const useGeneratorStore = create<GeneratorStore>((set) => ({
    status: "idle",
    setStatus: (status) => set({ status }),
}));
