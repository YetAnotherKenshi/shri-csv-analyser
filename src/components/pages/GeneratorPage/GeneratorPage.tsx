import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import UploadButton from "../../ui/UploadButton/UploadButton";
import StatusMessage from "../../ui/StatusMessage/StatusMessage";
import styles from "./generatorPage.module.css";
import type { Status } from "../../../types/analytics";

const GeneratorPage = () => {
    const [status, setStatus] = useState<Status>("idle");

    const handleGenerate = async () => {
        setStatus("loading");

        try {
            const response = await fetch(
                "http://127.0.0.1:3000/report?size=0.01&withError=on",
                { method: "GET" }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "generated_report.csv";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
            console.error(error);
        }
    };

    const handleDelete = () => {
        setStatus("idle");
    };

    const getUploadButtonVariant = () => {
        switch (status) {
            case "success":
                return "green";
            case "error":
                return "orange";
            case "loading":
                return "purple";
            default:
                return "purple";
        }
    };

    const getUploadButtonText = () => {
        switch (status) {
            case "success":
                return "Done!";
            case "error":
                return "Ошибка";
            case "loading":
                return "";
            default:
                return "";
        }
    };

    const getUploadButtonSubText = () => {
        switch (status) {
            case "success":
                return "файл сгенерирован!";
            case "error":
                return "упс, не то...";
            case "loading":
                return "идёт процесс генерации";
            default:
                return "";
        }
    };

    const getStatusMessageVariant = () => {
        switch (status) {
            case "success":
                return "default";
            case "error":
                return "error";
            case "loading":
                return "default";
            default:
                return "default";
        }
    };

    useEffect(() => {
        document.title = "CSV Генератор";
    }, []);

    const getUploadButtonClassName = () => {
        if (status === "success" || status === "error") {
            return styles.label;
        }
        return undefined;
    };

    return (
        <div className={styles.page}>
            <p className={styles.title}>
                Сгенерируйте готовый csv-файл нажатием одной кнопки
            </p>
            {status !== "idle" ? (
                <>
                    <UploadButton
                        variant={getUploadButtonVariant()}
                        loading={status === "loading"}
                        onDelete={handleDelete}
                        className={getUploadButtonClassName()}
                    >
                        {getUploadButtonText()}
                    </UploadButton>
                    <StatusMessage
                        className={styles.status}
                        variant={getStatusMessageVariant()}
                    >
                        {getUploadButtonSubText()}
                    </StatusMessage>
                </>
            ) : (
                <Button onClick={handleGenerate}>Начать генерацию</Button>
            )}
        </div>
    );
};

export default GeneratorPage;
