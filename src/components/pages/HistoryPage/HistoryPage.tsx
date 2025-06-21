import { useState } from "react";
import styles from "./historyPage.module.css";
import DataGrid from "../../layout/DataGrid/DataGrid";
import Modal from "../../ui/Modal/Modal";
import { useHistoryStore } from "../../../store/historyStore";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import type { AnalyticsResult } from "../../../types/analytics";
import { dataMapping } from "../../../utils/dataMapping";
import HistoryItem from "../../layout/HistoryItem/HistoryItem";

const HistoryPage = () => {
    const { results, deleteResult, clear } = useHistoryStore();

    const [selectedResult, setSelectedResult] =
        useState<AnalyticsResult | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleItemClick = (result: AnalyticsResult) => {
        setSelectedResult(result);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.page}>
            {results.length === 0 ? (
                <p className={styles.title}>Нет истории анализа</p>
            ) : (
                results.map((result, idx) => (
                    <HistoryItem
                        key={idx}
                        result={result}
                        onClick={() => handleItemClick(result)}
                        onDelete={() => deleteResult(idx)}
                    />
                ))
            )}
            <div className={styles.buttonBlock}>
                <Button onClick={() => navigate("/generator")}>
                    Сгенерировать больше
                </Button>
                {results.length > 0 && (
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
