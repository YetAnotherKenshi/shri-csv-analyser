import { useRef, useState } from "react";
import styles from "./uploadForm.module.css";
import Delete from "/src/assets/delete.svg";
import classNames from "classnames";

interface UploadFormProps {
    uploadedFile: File | null;
    isCorrect: boolean;
    onFileSelect: (file: File | null) => void;
}

const UploadForm = ({
    uploadedFile,
    isCorrect,
    onFileSelect,
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
        console.log(1);
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
            className={classNames(styles.uploadForm, styles.uploaded, {
                [styles.wrongBorder]: !isCorrect,
            })}
        >
            <div className={styles.uploadCenter}>
                <div className={styles.buttonBlock}>
                    <div
                        className={classNames(styles.uploadFile, {
                            [styles.wrong]: !isCorrect,
                        })}
                    >
                        {uploadedFile.name}
                    </div>
                    <button
                        className={styles.deleteButton}
                        onClick={() => onFileSelect(null)}
                    >
                        <img src={Delete} alt="Delete file" />
                    </button>
                </div>
                <p
                    className={classNames(styles.statusMessage, {
                        [styles.statusMessageError]: !isCorrect,
                    })}
                >
                    {!isCorrect ? "упс, не то..." : "файл загружен!"}
                </p>
            </div>
        </div>
    ) : (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={classNames(styles.uploadForm, {
                [styles.active]: isDragActive,
            })}
        >
            <div className={styles.uploadCenter}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                />
                <button
                    className={styles.uploadButton}
                    onClick={handleButtonClick}
                >
                    Загрузить файл
                </button>
                <p className={styles.statusMessage}>или перетащите сюда</p>
            </div>
        </div>
    );
};

export default UploadForm;
