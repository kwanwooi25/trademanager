import { PurchaseOrderFormSchema } from '@/components/forms/PurchaseOrderForm/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { InventoryChangeType } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const { items, ...purchaseOrder }: PurchaseOrderFormSchema = await req.json();
    await prisma.$transaction(async (tx) => {
      const createdPurchaseOrder = await tx.purchaseOrder.create({
        data: {
          ...purchaseOrder,
          companyId: user?.companyId!,
        },
      });

      await Promise.all(
        items.map(async ({ productOptionId, ...item }) => {
          const inventoryChange = await tx.inventoryChange.create({
            data: {
              type: InventoryChangeType.STORAGE,
              quantity: 0,
              productOptionId,
              companyId: user?.companyId!,
            },
          });
          const createdPurchaseOrderItem = await tx.purchaseOrderItem.create({
            data: {
              ...item,
              inventoryChangeId: inventoryChange.id,
              purchaseOrderId: createdPurchaseOrder.id,
              companyId: user?.companyId!,
              productOptionId,
            },
          });

          await tx.inventoryChange.update({
            where: { id: inventoryChange.id },
            data: {
              purchaseId: createdPurchaseOrderItem.id,
            },
          });
          return createdPurchaseOrderItem;
        }),
      );
    });
    return handleSuccess({ data: null, status: HttpStatusCode.Created });
  } catch (e) {
    console.log(e);
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest) {
  await getUserFromSession();

  try {
    const { items, ...purchaseOrder }: PurchaseOrderFormSchema = await req.json();

    const updatedPurchaseOrder = await prisma.purchaseOrder.update({
      where: {
        id: purchaseOrder.id,
      },
      data: {
        ...purchaseOrder,
        items: {
          updateMany: items.map((item) => ({
            where: {
              id: item.id,
            },
            data: item,
          })),
        },
      },
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

    return handleSuccess({ data: updatedPurchaseOrder });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
