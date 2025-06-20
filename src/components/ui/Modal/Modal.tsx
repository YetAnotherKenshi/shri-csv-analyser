import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import Icon from "../Icon/Icon";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <Icon name="delete" />
                </button>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
