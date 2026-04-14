import { CategoryCardProps } from '../types/categories';

export const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const categories: CategoryCardProps[] = await res.json();

    return categories;
  } catch (err) {
    console.error(`Failed to fetch categories: ${err}`);
    throw err;
  }
};
