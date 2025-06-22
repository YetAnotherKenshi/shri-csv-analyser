import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";
import type { ButtonVariant } from "../../../types/ui";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "default",
    className = "",
    ...props
}) => {
    const buttonClasses = classNames(styles.button, styles[variant], className);

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;
