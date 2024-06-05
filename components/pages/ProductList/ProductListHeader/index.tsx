export default function ProductListHeader() {
  return (
    <li className="px-4 py-6 grid items-center gap-4 grid-cols-[2fr_auto_2fr_1fr_1fr_1fr_1fr_60px] text-sm font-semibold border-y">
      <span>상품명</span>
      <span className="w-[60px]"></span>
      <span>옵션명</span>
      <span className="text-right">단가</span>
      <span className="text-right">재고수량</span>
      <span className="text-right">입고소요일</span>
      <span className="text-right">보관 위치</span>
      <span className="w-[40px]"></span>
    </li>
  );
}
