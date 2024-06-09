import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params: { productId, optionId } }: { params: { productId: string; optionId: string } },
) {
  await getUserFromSession();

  if (!productId || !optionId) {
    return handleFail({
      status: HttpStatusCode.BadRequest,
      message: 'productId & optionId is required',
    });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { options: true },
    });
    if (product?.options && product.options.length <= 1) {
      await prisma.product.delete({ where: { id: productId } });
      return handleSuccess({ data: null, status: HttpStatusCode.Ok });
    }
    await prisma.productOption.delete({ where: { id: optionId } });
    return handleSuccess({ data: null, status: HttpStatusCode.Ok });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
