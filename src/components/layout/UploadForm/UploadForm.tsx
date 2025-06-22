import { useRef, useState } from "react";
import styles from "./uploadForm.module.css";
import classNames from "classnames";
import UploadButton from "../../ui/UploadButton/UploadButton";
import StatusMessage from "../../ui/StatusMessage/StatusMessage";
import {
    getStatusMessageVariant,
    getUploadButtonVariant,
    getUploadStatusMessageText,
} from "../../../utils/uiMappings";

interface UploadFormProps {
    uploadedFile: File | null;
    status: "idle" | "loading" | "error" | "uploaded" | "success";
    onFileSelect: (file: File | null) => void;
    className?: string;
}

const UploadForm = ({
    uploadedFile,
    status,
    onFileSelect,
    className = "",
}: UploadFormProps) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFileSelect(files[0]);
        }
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            onFileSelect(files[0]);
        }
    };

    return uploadedFile ? (
        <div
            className={classNames(
                styles.uploadForm,
                styles.uploaded,
                {
                    [styles.wrongBorder]: status === "error",
                },
                className
            )}
        >
            <div className={styles.uploadCenter}>
                <UploadButton
                    variant={getUploadButtonVariant(status)}
                    onDelete={() => onFileSelect(null)}
                    loading={status === "loading"}
                >
                    {uploadedFile.name}
                </UploadButton>
                <StatusMessage variant={getStatusMessageVariant(status)}>
                    {getUploadStatusMessageText(status)}
                </StatusMessage>
            </div>
        </div>
    ) : (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={classNames(
                styles.uploadForm,
                {
                    [styles.active]: isDragActive,
                },
                className
            )}
        >
            <div className={styles.uploadCenter}>
                <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                />
                <UploadButton onClick={handleButtonClick}>
                    Загрузить файл
                </UploadButton>
                <p className={styles.statusMessage}>или перетащите сюда</p>
            </div>
        </div>
    );
};

export default UploadForm;
