import { ProductCardProps } from '@/app/types/product';
import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    const db = await getDB();

    const items = (await db
      .collection('products')
      .find({
        $and: [
          {
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } },
            ],
          },
          {
            quantity: { $gt: 0 },
          },
        ],
      })
      .project({})
      .toArray()) as ProductCardProps[];

    return NextResponse.json(items);
  } catch (error) {
    console.error(`Server error: ${error}`);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 },
    );
  }
}
