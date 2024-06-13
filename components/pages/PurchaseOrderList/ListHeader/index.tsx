export default function PurchaseOrderListHeader() {
  return (
    <li className="px-4 py-6 grid items-center gap-4 grid-cols-[1fr_1fr_60px_4fr_1fr_1fr_1fr_40px] text-sm font-semibold border-y">
      <span className="text-center">주문일</span>
      <span className="text-center">상태</span>
      <span className="w-[60px]"></span>
      <span className="pl-2">상품명 / 옵션명</span>
      <span className="text-center">주문수량</span>
      <span className="text-center">입고수량</span>
      <span className="text-center">입고일</span>
      <span className="w-[40px]"></span>
    </li>
  );
}
