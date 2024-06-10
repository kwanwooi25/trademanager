import { getUserFromSession, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const user = await getUserFromSession();
  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search') ?? '';

  const productOptions = await prisma.productOption.findMany({
    where: {
      AND: {
        companyId: user?.companyId!,
      },
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          product: {
            name: {
              contains: search,
            },
          },
        },
      ],
    },
    include: {
      product: true,
    },
  });

  return handleSuccess({ data: productOptions });
}
