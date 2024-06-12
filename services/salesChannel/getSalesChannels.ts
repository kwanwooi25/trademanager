import { DEFAULT_PER } from '@/const/api';
import { getCompanyIdFromSession } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';
import { GetSalesChannelsFilter } from '@/types/salesChannel';
import { Prisma } from '@prisma/client';

export async function getSalesChannels({
  page = 1,
  per = DEFAULT_PER,
  search = '',
}: GetSalesChannelsFilter & { page?: number; per?: number }) {
  const companyId = await getCompanyIdFromSession();

  if (!companyId) {
    return {
      totalCount: 0,
      lastPage: 1,
      salesChannels: [],
    };
  }

  const where: Prisma.SalesChannelWhereInput = {
    companyId,
    name: { contains: search },
  };

  const [count, salesChannels] = await Promise.all([
    prisma.salesChannel.count({ where }),
    prisma.salesChannel.findMany({
      where,
      skip: (page - 1) * per,
      take: per,
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  return {
    totalCount: count,
    lastPage: Math.ceil(count / per),
    salesChannels,
  };
}
