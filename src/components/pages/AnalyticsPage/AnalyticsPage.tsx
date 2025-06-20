import { useEffect } from "react";
import UploadForm from "../../layout/UploadForm/UploadForm";
import styles from "./analyticsPage.module.css";
import DataGrid from "../../layout/DataGrid/DataGrid";
import Button from "../../ui/Button/Button";
import { useAnalyticsStore } from "../../../store/analyticsStore";
import { useHistoryStore } from "../../../store/historyStore";
import { dataMapping } from "../../../utils/dataMapping";

const AnalyticsPage = () => {
    const {
        uploadedFile,
        parsedData,
        status,
        setUploadedFile,
        setParsedData,
        setStatus,
    } = useAnalyticsStore();
    const { addResult } = useHistoryStore();

    useEffect(() => {
        document.title = "CSV Аналитик";
    }, []);

    useEffect(() => {
        if (parsedData) {
            console.log("Parsed data:", parsedData);
        }
    }, [parsedData]);

    useEffect(() => {
        if (uploadedFile && status === "idle") {
            setStatus("uploaded");
        }
        if (!uploadedFile) {
            setStatus("idle");
        }
    }, [uploadedFile]);

    const handleSend = async () => {
        if (!uploadedFile) return;
        setStatus("loading");
        let lastResult: object = {};
        let finalStatus: "success" | "error" = "success";
        try {
            if (uploadedFile.type !== "text/csv") {
                throw new Error("Invalid file type");
            }
            const formData = new FormData();
            formData.append("file", uploadedFile);
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
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                try {
                    const result = JSON.parse(chunk);
                    const hasNull = Object.values(result).some(
                        (v) => v === null
                    );
                    if (hasNull) {
                        throw new Error("Invalid data");
                    }
                    setParsedData(result);
                    lastResult = result;
                } catch (error) {
                    throw new Error("Data process error.");
                }
            }
            setStatus("success");
        } catch (error: any) {
            setParsedData(null);
            setStatus("error");
            finalStatus = "error";
        } finally {
            if (uploadedFile) {
                addResult({
                    ...lastResult,
                    timestamp: new Date().toISOString(),
                    fileName: uploadedFile.name,
                    status: finalStatus,
                });
            }
        }
    };

    const handleFileSelect = (file: File | null) => {
        setUploadedFile(file);
        if (!file) {
            setParsedData(null);
            setStatus("idle");
        } else {
            setStatus("uploaded");
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
                status={status}
                onFileSelect={handleFileSelect}
                className={styles.uploadForm}
            />
            {status === "uploaded" && (
                <Button disabled={!uploadedFile} onClick={handleSend}>
                    Отправить
                </Button>
            )}
            <DataGrid cols={2} data={parsedData} dataMapping={dataMapping} />
        </div>
    );
};

export default AnalyticsPage;
