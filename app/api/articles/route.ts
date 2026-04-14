import { ARTICLES_CARDS_HOME_PAGE_LIMIT } from '@/app/(articles)/constants';
import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);

    const limit = searchParams.get('limit');
    const startIndex = parseInt(searchParams.get('startIndex') || '0');
    const perPage = parseInt(
      searchParams.get('perPage') || ARTICLES_CARDS_HOME_PAGE_LIMIT.toString(),
    );

    if (limit) {
      const items = await db
        .collection('articles')
        .find()
        .limit(parseInt(limit))
        .toArray();

      return NextResponse.json({
        items,
        totalCount: items.length,
      });
    }

    const totalCount = await db.collection('articles').countDocuments();

    const items = await db
      .collection('articles')
      .find()
      .sort({ id: -1 })
      .skip(startIndex)
      .limit(perPage)
      .toArray();

    return NextResponse.json({ items, totalCount });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 },
    );
  }
}
