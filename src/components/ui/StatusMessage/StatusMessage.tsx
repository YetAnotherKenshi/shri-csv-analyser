import React from "react";
import styles from "./StatusMessage.module.css";
import classNames from "classnames";

interface StatusMessageProps
    extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: "default" | "error";
}

const StatusMessage: React.FC<StatusMessageProps> = ({
    children,
    variant = "default",
    className = "",
    ...props
}) => {
    const statusMessageClasses = classNames(
        styles.statusMessage,
        styles[variant],
        className
    );

    return (
        <p className={statusMessageClasses} {...props}>
            {children}
        </p>
    );
};

export default StatusMessage;
