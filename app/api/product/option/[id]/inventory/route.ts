import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { InventoryChangeType } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const user = await getUserFromSession();

  try {
    const data = await req.json();

    const inventoryChange = await prisma.inventoryChange.create({
      data: {
        type: InventoryChangeType.STOCKTAKING,
        quantity: data.quantity,
        productOptionId: id,
        companyId: user?.companyId!,
      },
    });

    return handleSuccess({ data: inventoryChange, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
