import type { AnalyticsResult } from './analytics';

export type HistoryRecordStatus = 'success' | 'error';

export type HistoryRecord = AnalyticsResult & {
  fileName: string;
  timestamp: string;
  status: HistoryRecordStatus;
};
