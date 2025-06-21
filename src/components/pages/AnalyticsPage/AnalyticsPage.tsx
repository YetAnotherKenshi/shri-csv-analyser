import UploadForm from "../../layout/UploadForm/UploadForm";
import styles from "./analyticsPage.module.css";
import DataGrid from "../../layout/DataGrid/DataGrid";
import Button from "../../ui/Button/Button";
import { useAnalyticsStore } from "../../../store/analyticsStore";
import { useHistoryStore } from "../../../store/historyStore";
import { dataMapping } from "../../../utils/dataMapping";
import { processFile } from "../../../services/analyticsService";

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

    const handleSend = async () => {
        if (!uploadedFile) return;
        setStatus("loading");
        let lastResult: object = {};
        let finalStatus: "success" | "error" = "success";
        try {
            lastResult = await processFile(uploadedFile, (result) => {
                setParsedData(result);
            });
            setStatus("success");
        } catch {
            setParsedData(null);
            setStatus("error");
            finalStatus = "error";
        } finally {
            addResult({
                ...lastResult,
                timestamp: new Date().toISOString(),
                fileName: uploadedFile.name,
                status: finalStatus,
            });
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
