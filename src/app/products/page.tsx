'use server';

import { addProjectFormSchema } from '@/lib/constants';
import { z } from 'zod';
import prisma from '@/lib/database'; // Import the Prisma client
import { ProductLine } from '@/lib/types';

type Product = z.infer<typeof addProjectFormSchema>;
type ProductsPageProps = {
  filter?: ProductLine;
  page?: number;
  limit?: number;
};

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<ProductsPageProps>;
}) {
  const products = await prisma.project.findMany({
    where: {
      productLine: (await searchParams).filter,
    },
  });

  // loading state

  return (
    <div className="">
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.projectCode} {product.productLine}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
