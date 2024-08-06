import { DEFAULT_PER } from '@/const/api';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getProducts({
  page = 1,
  per = DEFAULT_PER,
  search = '',
}: {
  page?: number;
  per?: number;
  search?: string;
}) {
  const session = await auth();
  const companyId = session?.user?.companyId;

  if (!companyId) {
    return {
      totalCount: 0,
      lastPage: 1,
      products: [],
    };
  }

  const where = { companyId, name: { contains: search } };

  const [count, products] = await prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip: (page - 1) * per,
      take: per,
      orderBy: [{ createdAt: 'desc' }],
      include: {
        options: {
          include: {
            inventoryChanges: true,
            sales: true,
            purchases: { include: { purchaseOrder: true } },
          },
        },
      },
    }),
  ]);

  return {
    totalCount: count,
    lastPage: Math.ceil(count / per),
    products,
  };
}
