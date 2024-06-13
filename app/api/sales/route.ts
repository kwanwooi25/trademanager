import { SaleFormSchema } from '@/components/forms/SaleFormDialog/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { InventoryChangeType } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const sales: SaleFormSchema['sales'] = await req.json();
    await prisma.$transaction(async (tx) => {
      await Promise.all(
        sales.map(async (sale) => {
          const inventoryChange = await tx.inventoryChange.create({
            data: {
              type: InventoryChangeType.SALE,
              quantity: -sale.quantity,
              productOptionId: sale.productOptionId,
              companyId: user?.companyId!,
            },
          });
          const createdSale = await tx.sale.create({
            data: {
              ...sale,
              inventoryChangeId: inventoryChange.id,
              companyId: user?.companyId!,
            },
          });
          await tx.inventoryChange.update({
            where: { id: inventoryChange.id },
            data: {
              saleId: createdSale.id,
            },
          });
          return createdSale;
        }),
      );
    });
    return handleSuccess({ data: sales.length, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

// TODO: 다중 업데이트 공통 함수로 추출 필요
export async function PATCH(req: NextRequest) {
  await getUserFromSession();

  try {
    const sales: SaleFormSchema['sales'] = await req.json();
    const values = sales
      .map(
        ({ id, quantity, soldAt, productOptionId, channelId }) =>
          `('${id}', ${quantity}, CAST('${soldAt}' AS TIMESTAMP), '${productOptionId}', '${channelId}')`,
      )
      .join(',\n');

    const sql = `
    UPDATE "Sale"
    SET "quantity" = x.quantity,
        "soldAt" = x.soldAt,
        "productOptionId" = x.productOptionId,
        "channelId" = x.channelId
    FROM (
      VALUES
        ${values}
    ) AS x(id, quantity, soldAt, productOptionId, channelId)
    WHERE "Sale".id = x.id
    `;
    const res = await prisma.$executeRawUnsafe(sql);
    return handleSuccess({ data: res });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
