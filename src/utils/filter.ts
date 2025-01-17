import { SavedState, SupaTable } from '../types';

export function getInitialFilters(table: SupaTable, savedState?: SavedState) {
  if (savedState?.filters) {
    // verify column still exists
    const filters = savedState.filters.filter(x => {
      const found = table.columns.find(y => y.name === x.columnName);
      return found ? true : false;
    });
    if (filters?.length > 0) return filters;
  }
  return [];
}
