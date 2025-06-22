export type Status = 'idle' | 'loading' | 'error' | 'uploaded' | 'success';

export type AnalyticsResult = {
  average_spend_galactic?: number;
  big_spent_at?: number;
  big_spent_civ?: string;
  big_spent_value?: number;
  less_spent_at?: number;
  less_spent_civ?: string;
  less_spent_value?: number;
  rows_affected?: number;
  total_spend_galactic?: number;
};
