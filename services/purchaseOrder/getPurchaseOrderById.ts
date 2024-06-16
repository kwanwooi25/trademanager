import { getCompanyIdFromSession } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

export async function getPurchaseOrderById(id: string) {
  const companyId = await getCompanyIdFromSession();

  if (!companyId) {
    return null;
  }

  return await prisma.purchaseOrder.findUnique({
    where: { companyId, id },
    include: {
      items: {
        include: {
          productOption: {
            include: {
              product: true,
            },
          },
          inventoryChange: true,
        },
      },
    },
  });
}
