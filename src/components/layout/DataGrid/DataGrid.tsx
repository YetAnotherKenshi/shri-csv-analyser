import styles from './dataGrid.module.css';
import classNames from 'classnames';
import type { DataMappingItem } from '../../../types/data';
import { formatValue } from '../../../utils/format';
import type { AnalyticsResult } from '../../../types/analytics';

interface DataGridProps {
  data?: AnalyticsResult | null;
  dataMapping: Record<string, DataMappingItem>;
  cols?: number;
  variant?: 'default' | 'pink';
  className?: string;
}

const DataGrid = ({
  data,
  dataMapping,
  cols = Object.keys(dataMapping).length,
  variant = 'default',
  className,
}: DataGridProps) => {
  return (
    <div
      className={classNames(styles.dataGrid, className)}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {data &&
        Object.entries(dataMapping).map(([key, mapping]) => (
          <div
            key={key}
            className={classNames(styles.gridItem, styles[variant])}
          >
            <h3>{formatValue(data[key as keyof typeof data], mapping.type)}</h3>
            <p>{mapping.label}</p>
          </div>
        ))}
    </div>
  );
};

export default DataGrid;
