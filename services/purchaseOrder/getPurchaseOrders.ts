import { DEFAULT_PER } from '@/const/api';
import { getCompanyIdFromSession } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';
import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import { Prisma } from '@prisma/client';

export async function getPurchaseOrders({
  page = 1,
  per = DEFAULT_PER,
  search = '',
}: GetPurchaseOrdersFilter & {
  page?: number;
  per?: number;
}) {
  const companyId = await getCompanyIdFromSession();

  if (!companyId) {
    return {
      totalCount: 0,
      lastPage: 1,
      purchaseOrders: [],
    };
  }

  const where: Prisma.PurchaseOrderWhereInput = {
    companyId,
    AND: [
      {
        items: {
          some: {
            OR: [
              { productOption: { product: { name: { contains: search } } } },
              { productOption: { name: { contains: search } } },
            ],
          },
        },
      },
    ],
  };

  const [count, purchaseOrders] = await prisma.$transaction([
    prisma.purchaseOrder.count({ where }),
    prisma.purchaseOrder.findMany({
      where,
      skip: (page - 1) * per,
      take: per,
      orderBy: { orderedAt: 'desc' },
      include: {
        items: {
          include: {
            productOption: { include: { product: true } },
            inventoryChange: true,
          },
        },
      },
    }),
  ]);

  return {
    totalCount: count,
    lastPage: Math.ceil(count / per),
    purchaseOrders,
  };
}
