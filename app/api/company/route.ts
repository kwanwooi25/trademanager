import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess
} from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  
  try {
    const data = await req.json();
    const existingCompany = await prisma.company.findUnique({ where: { crn: data.crn } });
    if (existingCompany)
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: '이미 등록된 사업자번호입니다.',
      });
    const company = await prisma.company.create({
      data: {
        ...data,
        users: {
          connect: {
            id: user!.id,
          }
        }
      }
    });
    return handleSuccess({ data: company, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
