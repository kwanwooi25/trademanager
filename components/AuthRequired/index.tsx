'use client';

import { PATHS } from '@/const/paths';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function AuthRequired() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <form
      className="flex flex-col gap-4 items-center py-8"
      action={() => router.replace(`${PATHS.SIGN_IN}?callbackUrl=${pathname}`)}
    >
      <span className="text-lg">로그인이 필요합니다</span>
      <Button type="submit" size="lg">
        로그인하고 이용하기
      </Button>
    </form>
  );
}
