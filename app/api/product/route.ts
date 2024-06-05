import type { ProductFormSchema } from '@/components/pages/AddProduct/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpStatusCode, formToJSON } from 'axios';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const formData = await req.formData();
    const { options, ...productToCreate } = formToJSON(formData) as ProductFormSchema;
    const [optionsToCreate] = await Promise.all([
      Promise.all(
        options.map(async ({ imageFile, ...option }) => {
          const optionToCreate = {
            ...option,
            unitPrice: option.unitPrice ? +option.unitPrice : 0,
            inventoryQuantity: option.inventoryQuantity ? +option.inventoryQuantity : 0,
            leadtime: option.leadtime ? +option.leadtime : 0,
          };
          if (!imageFile) {
            return {
              ...optionToCreate,
              imageUrl: '',
            };
          }

          const s3Client = new S3Client({
            region: 'ap-northeast-2',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
          });

          const command = new PutObjectCommand({
            Bucket: 'images.trademanager.app',
            Key: imageFile.name,
            Body: await imageFile.arrayBuffer(),
          });
          await s3Client.send(command);

          return {
            ...optionToCreate,
            imageUrl: `https://images.trademanager.app/${imageFile.name}`,
          };
        }),
      ),
    ]);

    const product = await prisma.product.create({
      data: {
        ...productToCreate,
        companyId: user!.companyId!,
        options: {
          createMany: {
            data: optionsToCreate,
          },
        },
      },
    });
    return handleSuccess({ data: product, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
