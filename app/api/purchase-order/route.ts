import { PurchaseOrderFormSchema } from '@/components/forms/PurchaseOrderFormDialog/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const purchaseOrders: PurchaseOrderFormSchema['purchaseOrders'] = await req.json();
    const { count } = await prisma.purchaseOrder.createMany({
      data: purchaseOrders.map((purchaseOrder) => ({
        ...purchaseOrder,
        companyId: user?.companyId!,
      })),
    });
    return handleSuccess({ data: count, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

// TODO: 다중 업데이트 공통 함수로 추출 필요
export async function PATCH(req: NextRequest) {
  await getUserFromSession();

  try {
    const purchaseOrders: PurchaseOrderFormSchema['purchaseOrders'] = await req.json();
    const values = purchaseOrders
      .map(({ id, orderedQuantity, orderedAt, receivedQuantity, receivedAt, productOptionId }) => {
        const adjustedStatus: (typeof purchaseOrders)[number]['status'] =
          !!receivedAt && !!receivedQuantity ? 'RECEIVED' : 'ORDERED';
        const receivedAtValue = receivedAt
          ? `CAST('${receivedAt}' AS TIMESTAMP)`
          : `CAST(null AS TIMESTAMP)`;

        return `('${id}', ${orderedQuantity}, CAST('${orderedAt}' AS TIMESTAMP), ${receivedQuantity}, ${receivedAtValue}, CAST('${adjustedStatus}' AS "PurchaseOrderStatus"), '${productOptionId}')`;
      })
      .join(',\n');

    const sql = `
      UPDATE "PurchaseOrder"
      SET "orderedQuantity" = x.orderedQuantity,
          "orderedAt" = x.orderedAt,
          "receivedQuantity" = x.receivedQuantity,
          "receivedAt" = x.receivedAt,
          "status" = x.status,
          "productOptionId" = x.productOptionId
      FROM (
        VALUES
          ${values}
      ) AS x(id, orderedQuantity, orderedAt, receivedQuantity, receivedAt, status, productOptionId)
      WHERE "PurchaseOrder".id = x.id
      `;

    console.log(sql);

    const res = await prisma.$executeRawUnsafe(sql);
    return handleSuccess({ data: res });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
