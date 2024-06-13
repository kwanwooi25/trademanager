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
    await prisma.sale.delete({ where: { id } });
    return handleSuccess({ data: null });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
