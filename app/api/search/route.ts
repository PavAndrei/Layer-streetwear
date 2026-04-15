import { SearchProduct } from '@/app/types/product';
import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    if (!query) {
      return NextResponse.json([]);
    }

    const db = await getDB();

    const products = (await db
      .collection('products')
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      })
      .project({
        title: 1,
        categories: 1,
        _id: 1,
      })
      .toArray()) as SearchProduct[];

    if (!products.length) {
      return NextResponse.json([]);
    }

    const productsSortedByCategories: Record<string, SearchProduct[]> = {};

    for (const product of products) {
      for (const category of product.categories) {
        const normalizedCategory = category.toLowerCase();

        if (!productsSortedByCategories[normalizedCategory]) {
          productsSortedByCategories[normalizedCategory] = [];
        }

        productsSortedByCategories[normalizedCategory].push(product);
      }
    }

    const result = Object.entries(productsSortedByCategories).map(
      ([category, products]) => ({
        category,
        products,
      }),
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(`Server error: ${error}`);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 },
    );
  }
}
