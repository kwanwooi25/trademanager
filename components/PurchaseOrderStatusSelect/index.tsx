import { PurchaseOrderStatus } from '@prisma/client';
import { PURCHASE_ORDER_STATUS_SELECT_OPTIONS } from '../forms/PurchaseOrderFormDialog/const';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function PurchaseOrderStatusSelect({ value, onChange, removeAllOption }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={<span className="opacity-50">주문 상태 선택</span>} />
      </SelectTrigger>
      <SelectContent>
        {!removeAllOption && <SelectItem value="ALL">전체</SelectItem>}
        {PURCHASE_ORDER_STATUS_SELECT_OPTIONS.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type Props = {
  value: PurchaseOrderStatus | 'ALL';
  onChange: (value: PurchaseOrderStatus | 'ALL') => void;
  removeAllOption?: boolean;
};
