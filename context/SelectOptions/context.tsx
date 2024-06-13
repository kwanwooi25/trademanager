import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { ProductOptionWithProduct } from '@/types/productOption';
import { SalesChannel } from '@prisma/client';
import axios from 'axios';
import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { SelectOptionsContextState } from './types';

export const SelectOptionsContext = createContext<SelectOptionsContextState | null>(null);

export function SelectOptionsProvider({ children }: PropsWithChildren) {
  const [productOptions, setProductOptions] = useState<ProductOptionWithProduct[]>([]);
  const [salesChannels, setSalesChannels] = useState<SalesChannel[]>([]);

  const fetchProductOptions = useCallback(async () => {
    const { data } = await axios.get<SuccessResponse<ProductOptionWithProduct[]>>(
      API_ROUTE.PRODUCT_OPTION,
    );
    setProductOptions(data.data);
  }, []);

  const fetchSalesChannels = useCallback(async () => {
    const { data } = await axios.get<SuccessResponse<SalesChannel[]>>(API_ROUTE.SALES_CHANNEL);
    setSalesChannels(data.data);
  }, []);

  useEffect(() => {
    fetchProductOptions();
    fetchSalesChannels();
  }, [fetchProductOptions, fetchSalesChannels]);

  return (
    <SelectOptionsContext.Provider value={{ productOptions, salesChannels }}>
      {children}
    </SelectOptionsContext.Provider>
  );
}
