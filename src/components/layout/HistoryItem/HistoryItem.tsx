import styles from './historyPage.module.css';
import classNames from 'classnames';
import Icon from '../../ui/Icon/Icon';
import { formatDate } from '../../../utils/format';
import type { HistoryRecord } from '../../../types/history';

interface HistoryItemProps {
  result: HistoryRecord;
  onClick: () => void;
  onDelete: () => void;
}

const HistoryItem = ({ result, onClick, onDelete }: HistoryItemProps) => {
  return (
    <div className={styles.historyRow}>
      <div
        className={classNames(styles.historyItem, {
          [styles.disabled]: result.status === 'error',
        })}
        onClick={onClick}
      >
        <div>
          <Icon name="file" />
          {result.fileName}
        </div>
        <div>{formatDate(new Date(result.timestamp))}</div>
        <div
          className={classNames({
            [styles.dim]: result.status === 'error',
          })}
        >
          Обработан успешно
          <Icon name="smile" />
        </div>
        <div
          className={classNames({
            [styles.dim]: result.status === 'success',
          })}
        >
          Не удалось обработать
          <Icon name="sad" />
        </div>
      </div>
      <button onClick={onDelete} className={styles.deleteButton}>
        <Icon name="bin" />
      </button>
    </div>
  );
};

export default HistoryItem;
