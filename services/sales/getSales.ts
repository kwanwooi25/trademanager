import { DEFAULT_PER } from '@/const/api';
import { getCompanyIdFromSession } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';
import { GetSalesFilter } from '@/types/sale';
import { Prisma } from '@prisma/client';

export async function getSales({
  page = 1,
  per = DEFAULT_PER,
  search = '',
}: GetSalesFilter & { page?: number; per?: number }) {
  const companyId = await getCompanyIdFromSession();

  if (!companyId) {
    return {
      totalCount: 0,
      lastPage: 1,
      sales: [],
    };
  }

  const where: Prisma.SaleWhereInput = {
    companyId,
    OR: [
      { productOption: { name: { contains: search } } },
      { productOption: { product: { name: { contains: search } } } },
    ],
  };

  const [count, sales] = await Promise.all([
    prisma.sale.count({ where }),
    prisma.sale.findMany({
      where,
      skip: (page - 1) * per,
      take: per,
      orderBy: { soldAt: 'desc' },
      include: {
        productOption: { include: { product: true } },
        channel: true,
      },
    }),
  ]);

  return {
    totalCount: count,
    lastPage: Math.ceil(count / per),
    sales,
  };
}
