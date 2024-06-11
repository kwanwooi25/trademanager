import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const data = await req.json();
    const purchaseOrder = await prisma.purchaseOrder.create({
      data: {
        ...data,
        companyId: user?.companyId!,
      },
      include: { productOption: { include: { product: true } } },
    });
    return handleSuccess({ data: purchaseOrder, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest) {
  await getUserFromSession();

  try {
    const data = await req.json();
    const purchaseOrder = await prisma.purchaseOrder.update({
      where: { id: data.id },
      data,
    });
    return handleSuccess({ data: purchaseOrder, status: HttpStatusCode.Ok });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
