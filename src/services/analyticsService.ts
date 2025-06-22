import type { AnalyticsResult } from "../types/analytics";

export async function processFile(
    file: File,
    onResult: (result: AnalyticsResult) => void,
    rows: number
): Promise<AnalyticsResult> {
    const formData = new FormData();
    formData.append("file", file);

    const params = new URLSearchParams({
        rows: rows.toString(),
    });

    const url = `http://127.0.0.1:3000/aggregate?${params.toString()}`;
    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
        throw new Error("Response body is not readable");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let lastResult: AnalyticsResult = {};
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        let result;
        try {
            result = JSON.parse(chunk);
        } catch {
            continue;
        }

        onResult(result);
        lastResult = result;
    }
    return lastResult;
}
