export async function generateReport(
    size: number,
    maxSpend?: number
): Promise<void> {
    const params = new URLSearchParams({
        size: size.toString(),
        withErrors: "on",
    });

    if (maxSpend) {
        params.append("maxSpend", maxSpend.toString());
    }

    const url = `http://127.0.0.1:3000/report?${params.toString()}`;
    const filename = "report.csv";

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(objectUrl);
    document.body.removeChild(a);
}
