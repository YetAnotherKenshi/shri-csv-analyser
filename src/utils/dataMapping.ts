import type { DataMappingItem } from '../types/data';

export const dataMapping: Record<string, DataMappingItem> = {
  total_spend_galactic: {
    label: 'общие расходы в галактических кредитах',
    type: 'number',
  },
  less_spent_civ: {
    label: 'цивилизация с минимальными расходами',
    type: 'string',
  },
  rows_affected: {
    label: 'количество обработанных записей',
    type: 'number',
  },
  big_spent_at: {
    label: 'день года с максимальными расходами',
    type: 'date',
  },
  less_spent_at: {
    label: 'день года с минимальными расходами',
    type: 'date',
  },
  big_spent_value: {
    label: 'максимальная сумма расходов за день',
    type: 'number',
  },
  big_spent_civ: {
    label: 'цивилизация с максимальными расходами',
    type: 'string',
  },
  average_spend_galactic: {
    label: 'средние расходы в галактических кредитах',
    type: 'number',
  },
};
