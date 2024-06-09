'use client';

import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function PurchaseOrderFormPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <PageHeader title="구매 입력" backButton>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />}
          <span>구매 입력</span>
        </Button>
      </PageHeader>
    </div>
  );
}
