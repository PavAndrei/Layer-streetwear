import { PRODUCTS_CARDS_HOME_PAGE_LIMIT } from '@/app/(products)/constants';
import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const TRENDING_RATING_THRESHOLD = 4.7;

const escapeRegex = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);

    const hasDiscount = searchParams.get('hasDiscount');
    const isNew = searchParams.get('isNew');
    const trending = searchParams.get('trending');
    const category = searchParams.get('category');
    const includeOutOfStock = searchParams.get('includeOutOfStock');
    const matchMode = searchParams.get('matchMode') ?? 'all';
    const limit = searchParams.get('limit');
    const startIndex = parseInt(searchParams.get('startIndex') || '0');
    const perPage = parseInt(
      searchParams.get('perPage') || PRODUCTS_CARDS_HOME_PAGE_LIMIT.toString(),
    );

    const shouldIncludeOutOfStock = includeOutOfStock === 'true';

    const query: Record<string, unknown> = {};
    const statusFilters: Record<string, unknown>[] = [];

    if (!shouldIncludeOutOfStock) {
      query.quantity = { $gt: 0 };
    }

    if (category) {
      const normalizedCategory = decodeURIComponent(category).trim();
      query.categories = new RegExp(
        `^${escapeRegex(normalizedCategory)}$`,
        'i',
      );
    }

    if (hasDiscount === 'true') {
      statusFilters.push({ hasDiscount: true });
    }

    if (isNew === 'true') {
      statusFilters.push({ isNew: true });
    }

    if (trending === 'true') {
      statusFilters.push({ rating: { $gte: TRENDING_RATING_THRESHOLD } });
    }

    if (statusFilters.length > 0) {
      if (matchMode === 'any') {
        query.$or = statusFilters;
      } else {
        Object.assign(query, ...statusFilters);
      }
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
    console.error(`Server error: ${error}`);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
