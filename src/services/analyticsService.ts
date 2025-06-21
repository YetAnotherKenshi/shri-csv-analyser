export async function processFile(
    file: File,
    onResult: (result: object) => void
): Promise<object> {
    if (file.type !== "text/csv") {
        throw new Error("Invalid file type");
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
        "http://127.0.0.1:3000/aggregate?rows=100000",
        {
            method: "POST",
            body: formData,
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!response.body) {
        throw new Error("Response body is not readable");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let lastResult: object = {};
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

        const hasNull = Object.values(result).some((v) => v === null);
        if (hasNull) {
            throw new Error("Invalid data");
        }

        onResult(result);
        lastResult = result;
    }
    return lastResult;
}
