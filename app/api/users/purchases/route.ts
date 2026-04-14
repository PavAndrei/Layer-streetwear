import { PURCHASES_CARDS_HOME_PAGE_LIMIT } from '@/app/(users)/constants';
import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = await getDB();

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    const startIndex = parseInt(searchParams.get('startIndex') || '0');
    const perPage = parseInt(
      searchParams.get('perPage') || PURCHASES_CARDS_HOME_PAGE_LIMIT.toString(),
    );

    const user = await db.collection('users').findOne({});

    if (!user || !user.purchases || user.purchases.length === 0) {
      return NextResponse.json({ items: [], totalCount: 0 });
    }

    const productIds = user.purchases.map((p: { _id: number }) => p._id);

    if (limit) {
      const purchases = await db
        .collection('products')
        .find({ _id: { $in: productIds } })
        .limit(parseInt(limit))
        .toArray();

      return NextResponse.json({
        items: purchases,
        totalCount: purchases.length,
      });
    }

    const totalCount = productIds.length;

    const items = await db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(perPage)
      .toArray();

    return NextResponse.json({
      items,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    return NextResponse.json(
      { error: "Failed to fetch user's purchases" },
      { status: 500 },
    );
  }
}
