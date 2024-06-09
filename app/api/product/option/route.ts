import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { deleteImage } from '@/lib/s3';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  await getUserFromSession();

  const productId = req.nextUrl.searchParams.get('productId');
  const optionId = req.nextUrl.searchParams.get('optionId');
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
