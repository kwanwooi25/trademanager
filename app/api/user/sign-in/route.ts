import { HTTP_STATUS } from '@/const/http';
import { handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { hashPassword } from '../utils';

export async function POST(request: NextRequest) {
  const { email, password }: { email: string; password: string } = await request.json();

  if (!email || !password) {
    return handleFail({ status: HTTP_STATUS.BAD_REQUEST, message: 'Invalid inputs' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        verified: true,
        imageUrl: true,
        company: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return handleFail({ status: 400, message: 'User not found' });

    const { password: userPassword, ...data } = user;
    if (user && userPassword === hashPassword(password)) {
      return handleSuccess({ data });
    }

    return handleFail({ status: 401, message: 'Invalid credentials' });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
