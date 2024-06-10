import type { ProductFormSchema } from '@/components/pages/ProductForm/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { deleteImage, uploadImage } from '@/lib/s3';
import { Prisma } from '@prisma/client';
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
            companyId: user?.companyId!,
          };
          if (!imageFile) {
            return optionToCreate;
          }

          const imageUrl = await uploadImage({ file: imageFile });

          return {
            ...optionToCreate,
            imageUrl,
          };
        }),
      ),
    ]);

    const product = await prisma.product.create({
      data: {
        ...productToCreate,
        companyId: user?.companyId!,
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

export async function PATCH(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const formData = await req.formData();
    const {
      options,
      optionIdsToDelete = [],
      ...productToUpdate
    } = formToJSON(formData) as ProductFormSchema;
    const optionsToCreate: Prisma.ProductOptionCreateManyProductInput[] = [];
    const optionsToUpdate: Prisma.ProductOptionUpdateWithoutProductInput[] = [];
    await Promise.all([
      Promise.all(
        options.map(async ({ imageFile, ...option }) => {
          const optionToCreateOrUpdate = {
            ...option,
            unitPrice: option.unitPrice ? +option.unitPrice : 0,
            inventoryQuantity: option.inventoryQuantity ? +option.inventoryQuantity : 0,
            leadtime: option.leadtime ? +option.leadtime : 0,
          };

          if (!option.id) {
            optionsToCreate.push({ ...optionToCreateOrUpdate, companyId: user?.companyId! });
            return;
          }

          if (!imageFile) {
            optionsToUpdate.push(optionToCreateOrUpdate);
            return;
          }

          if (option.imageUrl) {
            await deleteImage(option.imageUrl);
          }

          const imageUrl = await uploadImage({ file: imageFile });
          optionsToUpdate.push({ ...optionToCreateOrUpdate, imageUrl });
        }),
      ),
    ]);

    const product = await prisma.product.update({
      where: { id: productToUpdate.id },
      data: {
        ...productToUpdate,
        options: {
          createMany: {
            data: optionsToCreate,
          },
          updateMany: optionsToUpdate.map((option) => ({
            where: { id: option?.id as string },
            data: option,
          })),
          deleteMany: optionIdsToDelete.map((id) => ({ id })),
        },
      },
    });

    return handleSuccess({ data: product, status: HttpStatusCode.Ok });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
