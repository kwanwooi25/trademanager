import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  await getUserFromSession();

  if (!id) {
    return handleFail({
      status: HttpStatusCode.BadRequest,
      message: 'id is required',
    });
  }

  try {
    await Promise.all([
      prisma.purchaseOrder.delete({ where: { id } }),
      prisma.inventoryChange.deleteMany({ where: { purchaseId: id } }),
    ]);
    return handleSuccess({ data: null, status: HttpStatusCode.Ok });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
