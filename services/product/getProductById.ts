import { getCompanyIdFromSession } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

export async function getProductById(id: string) {
  const companyId = await getCompanyIdFromSession();

  if (!companyId) {
    return null;
  }

  return await prisma.product.findUnique({
    where: { companyId, id },
    include: { options: { include: { inventoryChanges: true, sales: true } } },
  });
}
