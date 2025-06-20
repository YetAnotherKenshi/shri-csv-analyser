import React from "react";
import styles from "./UploadButton.module.css";
import classNames from "classnames";
import Icon from "../Icon/Icon";

interface UploadButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "purple" | "green" | "orange";
    onDelete?: () => void;
    children?: React.ReactNode;
    loading?: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({
    children,
    variant = "default",
    className = "",
    onDelete,
    loading = false,
    ...props
}) => {
    const labelClasses = classNames(styles.label, styles[variant], className);

    return (
        <div className={styles.buttonBlock}>
            {variant === "default" ? (
                <button className={styles.uploadButton} {...props}>
                    {children}
                </button>
            ) : (
                <div className={labelClasses}>
                    {loading ? (
                        <Icon name="loader" className={styles.spinner} />
                    ) : (
                        children
                    )}
                </div>
            )}

            {onDelete && !loading && (
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={onDelete}
                >
                    <Icon name="delete" />
                </button>
            )}
        </div>
    );
};

export default UploadButton;
