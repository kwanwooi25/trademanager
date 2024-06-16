import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { PurchaseOrderItemWithProductOption } from '@/types/purchaseOrder';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  await getUserFromSession();

  if (!id) {
    return handleFail({
      status: HttpStatusCode.BadRequest,
      message: 'id is required',
    });
  }

  try {
    const data: PurchaseOrderItemWithProductOption = await req.json();
    const updatedPurchaseOrder = await prisma.purchaseOrderItem.update({
      where: { id },
      data: {
        receivedAt: data.receivedAt,
        receivedQuantity: data.receivedQuantity,
        inventoryChange: {
          update: {
            where: {
              id: data.inventoryChangeId,
            },
            data: {
              ...data.inventoryChange,
              quantity: data.receivedQuantity!,
            },
          },
        },
      },
      include: {
        productOption: {
          include: {
            product: true,
          },
        },
        inventoryChange: true,
      },
    });
    return handleSuccess({ data: updatedPurchaseOrder });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
