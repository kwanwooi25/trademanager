import { DEFAULT_PER } from '@/const/api';
import { getCompanyIdFromSession } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

export async function getPurchaseOrders({
  page = 1,
  per = DEFAULT_PER,
  search = '',
}: {
  page?: number;
  per?: number;
  search?: string;
}) {
  const companyId = await getCompanyIdFromSession();

  if (!companyId) {
    return {
      totalCount: 0,
      lastPage: 1,
      purchaseOrders: [],
    };
  }

  const where = {
    companyId,
    OR: [
      { productOption: { name: { contains: search } } },
      { productOption: { product: { name: { contains: search } } } },
    ],
  };

  const [count, purchaseOrders] = await Promise.all([
    prisma.purchaseOrder.count({ where }),
    prisma.purchaseOrder.findMany({
      where,
      skip: (page - 1) * per,
      take: per,
      orderBy: { orderedAt: 'asc' },
      include: { productOption: { include: { product: true } } },
    }),
  ]);

  return {
    totalCount: count,
    lastPage: Math.ceil(count / per),
    purchaseOrders,
  };
}
