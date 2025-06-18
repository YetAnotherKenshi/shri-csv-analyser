import styles from "./dataGrid.module.css";

interface DataMappingItem {
    label: string;
    type: "string" | "number" | "date";
}

interface DataGridProps {
    data?: object | null;
    dataMapping: Record<string, DataMappingItem>;
}

const DataGrid = ({ data, dataMapping }: DataGridProps) => {
    const formatValue = (value: any, type: string) => {
        if (value === null || value === undefined) return "N/A";

        switch (type) {
            case "number":
                return Math.round(value);
            case "date":
                const date = new Date(2025, 0, 1);
                date.setDate(date.getDate() + value);

                return date.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                });
            case "string":
            default:
                return String(value);
        }
    };

    return (
        <div className={styles.dataGrid}>
            {data &&
                Object.entries(dataMapping).map(([key, mapping]) => (
                    <div key={key} className={styles.gridItem}>
                        <h3>
                            {formatValue(
                                data[key as keyof typeof data],
                                mapping.type
                            )}
                        </h3>
                        <p>{mapping.label}</p>
                    </div>
                ))}
        </div>
    );
};

export default DataGrid;
