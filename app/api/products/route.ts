import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasDiscount = searchParams.get('hasDiscount');
    const isNew = searchParams.get('isNew');

    const filter: Record<string, boolean> = {};

    if (hasDiscount !== null) {
      filter.hasDiscount = hasDiscount === 'true';
    }

    if (isNew !== null) {
      filter.isNew = isNew === 'true';
    }

    const db = await getDB();
    const products = await db.collection('products').find(filter).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
