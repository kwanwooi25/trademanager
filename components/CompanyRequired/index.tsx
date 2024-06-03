'use client';

import { PATHS } from '@/const/paths';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function CompanyRequired() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 items-center py-8">
      <span className="text-lg">회사 등록이 필요합니다</span>
      <Button onClick={() => router.push(PATHS.REGISTER_COMPANY)} size="lg">
        회사 등록하기
      </Button>
      <Button variant="link">기존 회사 연결 요청하기</Button>
    </div>
  );
}
