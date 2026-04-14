import { PRODUCTS_CARDS_HOME_PAGE_LIMIT } from '@/app/(products)/constants';
import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';
import { parse } from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);

    const hasDiscount = searchParams.get('hasDiscount');
    const isNew = searchParams.get('isNew');
    const limit = searchParams.get('limit');
    const startIndex = parseInt(searchParams.get('startIndex') || '0');
    const perPage = parseInt(
      searchParams.get('perPage') || PRODUCTS_CARDS_HOME_PAGE_LIMIT.toString(),
    );

    const query: Record<string, boolean | { $gt: number }> = {
      quantity: { $gt: 0 },
    };

    if (hasDiscount !== null) {
      query.hasDiscount = hasDiscount === 'true';
    }

    if (isNew !== null) {
      query.isNew = isNew === 'true';
    }

    if (limit) {
      const products = await db
        .collection('products')
        .aggregate([{ $match: query }, { $sample: { size: Number(limit) } }])
        .toArray();

      return NextResponse.json(products);
    }

    const totalCount = await db.collection('products').countDocuments(query);
    const products = await db
      .collection('products')
      .find(query)
      .sort({ _id: 1 })
      .skip(startIndex)
      .limit(perPage)
      .toArray();

    return NextResponse.json({ products, totalCount });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
