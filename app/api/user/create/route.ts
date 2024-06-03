import { PASSWORD_MIN_LENGTH } from '@/const/auth';
import { HTTP_STATUS } from '@/const/http';
import { handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { hashPassword } from '../utils';

export async function POST(request: NextRequest) {
  const { user }: { user: Prisma.UserCreateInput } = await request.json();

  if (user.password.length < PASSWORD_MIN_LENGTH) {
    const message = `Password must be more than ${PASSWORD_MIN_LENGTH} characters`;
    return handleFail({ status: HTTP_STATUS.BAD_REQUEST, message });
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        password: hashPassword(user.password),
      },
    });
    return handleSuccess({ data: createdUser, status: HTTP_STATUS.CREATED });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
