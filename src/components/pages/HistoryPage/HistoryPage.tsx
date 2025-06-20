import { useState } from "react";
import styles from "./historyPage.module.css";
import DataGrid from "../../layout/DataGrid/DataGrid";
import Modal from "../../ui/Modal/Modal";
import { useHistoryStore } from "../../../store/historyStore";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import Icon from "../../ui/Icon/Icon";
import type { AnalyticsResult } from "../../../types/analytics";
import { formatDate } from "../../../utils/format";
import { dataMapping } from "../../../utils/dataMapping";
import classNames from "classnames";

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
                    <div className={styles.historyRow} key={idx}>
                        <div
                            className={classNames(styles.historyItem, {
                                [styles.disabled]: result.status === "error",
                            })}
                            onClick={() => handleItemClick(result)}
                        >
                            <div>
                                <Icon name="file" />
                                {result.fileName}
                            </div>
                            <div>{formatDate(new Date(result.timestamp))}</div>
                            <div
                                className={classNames({
                                    [styles.dim]: result.status === "error",
                                })}
                            >
                                Обработан успешно
                                <Icon name="smile" />
                            </div>
                            <div
                                className={classNames({
                                    [styles.dim]: result.status === "success",
                                })}
                            >
                                Не удалось обработать
                                <Icon name="sad" />
                            </div>
                        </div>
                        <button
                            onClick={() => deleteResult(idx)}
                            className={styles.deleteButton}
                        >
                            <Icon name="bin" />
                        </button>
                    </div>
                ))
            )}
            <div className={styles.buttonBlock}>
                <Button onClick={() => navigate("/generator")}>
                    Сгенерировать больше
                </Button>
                <Button onClick={() => clear()} variant="black">
                    Очистить всё
                </Button>
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
