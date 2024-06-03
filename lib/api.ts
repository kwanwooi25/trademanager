import { HTTP_STATUS } from '@/const/http';
import { FailedResponse, SuccessResponse } from '@/types/api';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export function handleFail(props?: { status?: number; message?: string }) {
  const { status = HTTP_STATUS.INTERNAL_SERVER_ERROR, message = 'Internal Server Error' } =
    props ?? {};

  return NextResponse.json<FailedResponse>(
    {
      result: 'FAILED',
      data: null,
      message,
    },
    { status },
  );
}

export function handleSuccess<T>({ data, status = HTTP_STATUS.OK }: { data: T; status?: number }) {
  return NextResponse.json<SuccessResponse<T>>(
    {
      result: 'SUCCESS',
      data,
    },
    { status },
  );
}

export function handlePrismaClientError(e: unknown) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    return handleFail({ status: HTTP_STATUS.BAD_REQUEST, message: e.message });
  }
}
