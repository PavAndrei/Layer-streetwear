import { getDB } from '@/app/utils/api-routes';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await getDB();

    const user = await db.collection('users').findOne({});

    if (!user || user.purchases.length === 0) {
      return NextResponse.json([]);
    }

    const productIds = user.purchases.map((p: { _id: number }) => p._id);

    const products = await db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user's purchases" },
      { status: 500 },
    );
  }
}
