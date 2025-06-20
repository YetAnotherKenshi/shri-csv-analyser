export function formatValue(
    value: number | string,
    type: "number" | "date" | "string"
): string {
    switch (type) {
        case "number":
            return Math.round(value as number).toString();
        case "date": {
            const date = new Date(2025, 0, 1);
            date.setDate(date.getDate() + (value as number));
            return date.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
            });
        }
        case "string":
        default:
            return String(value);
    }
}

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}
