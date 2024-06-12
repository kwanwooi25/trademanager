import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const salesChannels = await prisma.salesChannel.findMany({
      where: { companyId: user?.companyId! },
    });
    return handleSuccess({ data: salesChannels });
  } catch (e) {
    handlePrismaClientError(e);
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const data = await req.json();
    const salesChannel = await prisma.salesChannel.create({
      data: { ...data, companyId: user?.companyId! },
    });
    return handleSuccess({ data: salesChannel, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest) {
  await getUserFromSession();

  try {
    const data = await req.json();
    const salesChannel = await prisma.salesChannel.update({
      where: { id: data.id },
      data,
    });
    return handleSuccess({ data: salesChannel });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
