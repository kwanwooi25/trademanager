import { Product, ProductOption } from '@prisma/client';

export type ProductOptionWithProduct = ProductOption & { product: Product };
