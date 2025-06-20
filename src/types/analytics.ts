export type AnalyticsResult = {
    fileName: string;
    timestamp: string;
    status: string;
    error?: string;
};

export type Status = "idle" | "loading" | "error" | "uploaded" | "success";
