import { useContext } from 'react';
import { SelectOptionsContext } from './context';

export function useSelectOptions() {
  const context = useContext(SelectOptionsContext);

  if (!context) {
    throw new Error('useSelectOptions must be used within SelectOptionsProvider');
  }

  return context;
}
