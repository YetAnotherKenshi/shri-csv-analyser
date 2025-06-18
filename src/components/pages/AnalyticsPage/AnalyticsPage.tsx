import { useEffect, useState, useRef } from "react";
import UploadForm from "../../UploadForm/UploadForm";
import styles from "./analyticsPage.module.css";
import DataGrid from "../../DataGrid/DataGrid";

interface DataMappingItem {
    label: string;
    type: "string" | "number" | "date";
}

const AnalyticsPage = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [parsedData, setParsedData] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const dataMapping: Record<string, DataMappingItem> = {
        total_spend_galactic: {
            label: "общие расходы в галактических кредитах",
            type: "number",
        },
        less_spent_civ: {
            label: "цивилизация с минимальными расходами",
            type: "string",
        },
        rows_affected: {
            label: "количество обработанных записей",
            type: "number",
        },
        big_spent_at: {
            label: "день года с максимальными расходами",
            type: "date",
        },
        less_spent_at: {
            label: "день года с минимальными расходами",
            type: "date",
        },
        big_spent_value: {
            label: "максимальная сумма расходов за день",
            type: "number",
        },
        big_spent_civ: {
            label: "цивилизация с максимальными расходами",
            type: "string",
        },
        average_spend_galactic: {
            label: "средние расходы в галактических кредитах",
            type: "number",
        },
    };

    useEffect(() => {
        if (parsedData) {
            console.log("Parsed data:", parsedData);
        }
    }, [parsedData]);

    const handleSend = async () => {
        if (!uploadedFile) return;

        setIsLoading(true);
        abortControllerRef.current = new AbortController();

        try {
            const formData = new FormData();
            formData.append("file", uploadedFile);

            const response = await fetch(
                "http://127.0.0.1:3000/aggregate?rows=100000",
                {
                    method: "POST",
                    body: formData,
                    signal: abortControllerRef.current.signal,
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

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });

                try {
                    const result = JSON.parse(chunk);
                    setParsedData(result);
                } catch (parseError) {}
            }
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                console.log("Request was aborted");
            } else {
                console.error("Error uploading file:", error);
            }
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    };

    const handleFileSelect = (file: File | null) => {
        if (!file && abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        setUploadedFile(file);
        if (file) {
            setIsCorrect(file.type === "text/csv");
        } else {
            setIsCorrect(false);
            setParsedData(null);
        }
    };

    return (
        <div className={styles.page}>
            <p className={styles.title}>
                Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о
                нём за сверхнизкое время
            </p>
            <UploadForm
                uploadedFile={uploadedFile}
                isCorrect={isCorrect}
                onFileSelect={handleFileSelect}
            />
            {!isLoading && !parsedData && (
                <button
                    className={styles.sendButton}
                    disabled={!isCorrect}
                    onClick={handleSend}
                >
                    Отправить
                </button>
            )}
            <DataGrid data={parsedData} dataMapping={dataMapping} />
        </div>
    );
};

export default AnalyticsPage;
