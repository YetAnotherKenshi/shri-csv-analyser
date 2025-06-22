import { useState } from "react";
import styles from "./historyPage.module.css";
import DataGrid from "../../layout/DataGrid/DataGrid";
import Modal from "../../ui/Modal/Modal";
import { useHistoryStore } from "../../../store/historyStore";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { dataMapping } from "../../../utils/dataMapping";
import HistoryItem from "../../layout/HistoryItem/HistoryItem";
import type { HistoryRecord } from "../../../types/history";

const HistoryPage = () => {
    const { records, deleteRecord, clear } = useHistoryStore();

    const [selectedResult, setSelectedResult] = useState<HistoryRecord | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleItemClick = (result: HistoryRecord) => {
        setSelectedResult(result);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.page}>
            {records.length === 0 ? (
                <p className={styles.title}>Нет истории анализа</p>
            ) : (
                records.map((result, idx) => (
                    <HistoryItem
                        key={idx}
                        result={result}
                        onClick={() => handleItemClick(result)}
                        onDelete={() => deleteRecord(idx)}
                    />
                ))
            )}
            <div className={styles.buttonBlock}>
                <Button onClick={() => navigate("/generator")}>
                    Сгенерировать больше
                </Button>
                {records.length > 0 && (
                    <Button onClick={() => clear()} variant="black">
                        Очистить всё
                    </Button>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedResult && (
                    <DataGrid
                        data={selectedResult}
                        dataMapping={dataMapping}
                        cols={1}
                        variant="pink"
                    />
                )}
            </Modal>
        </div>
    );
};

export default HistoryPage;
