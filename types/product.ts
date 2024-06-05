import { Product, ProductOption } from '@prisma/client';

export type ProductWithOptions = Product & { options: ProductOption[] };
