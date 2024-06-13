import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { InventoryChangeType, PurchaseOrderStatus } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const user = await getUserFromSession();

  if (!id) {
    return handleFail({
      status: HttpStatusCode.BadRequest,
      message: 'id is required',
    });
  }

  try {
    const data: PurchaseOrderWithProductOption = await req.json();
    const updatedPurchaseOrder = await prisma.purchaseOrder.update({
      where: { id },
      data: {
        receivedAt: data.receivedAt,
        receivedQuantity: data.receivedQuantity,
        status: PurchaseOrderStatus.RECEIVED,
        inventoryChanges: {
          create: {
            type: InventoryChangeType.STORAGE,
            quantity: data.receivedQuantity!,
            productOptionId: data.productOptionId,
            companyId: user?.companyId!,
          },
        },
      },
      include: {
        productOption: {
          include: {
            product: true,
          },
        },
      },
    });
    return handleSuccess({ data: updatedPurchaseOrder });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
