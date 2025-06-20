import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "yellow" | "black";
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
