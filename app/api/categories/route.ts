import { CategoryCardProps } from '@/app/types/categories';
import { getDB } from '@/app/utils/api-routes';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  try {
    const db = await getDB();
    const categories = await db.collection('categories').find().toArray();

    const normalizedCategories = categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
    }));

    return NextResponse.json(normalizedCategories);
  } catch (error) {
    console.error(`Server error: ${error}`);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDB();
    const updatedCategories: CategoryCardProps[] = await request.json();

    const bulkOps = updatedCategories.map((category) => {
      if (!category._id || !ObjectId.isValid(category._id)) {
        throw new Error(`Invalid category id: ${JSON.stringify(category._id)}`);
      }

      return {
        updateOne: {
          filter: { _id: new ObjectId(category._id) },
          update: {
            $set: {
              order: category.order,
            },
          },
        },
      };
    });

    const result = await db.collection('categories').bulkWrite(bulkOps);

    return NextResponse.json({
      success: true,
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(`Server error: ${error}`);
    return NextResponse.json(
      { error: 'Failed to update categories order' },
      { status: 500 },
    );
  }
}
