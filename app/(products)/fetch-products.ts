export const fetchProducts = async (
  isNew?: boolean,
  hasDiscount?: boolean,
  options?: {
    limit?: number;
    pagination?: { startIndex: number; perPage: number };
  },
) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    url.searchParams.append('isNew', isNew ? 'true' : 'false');
    url.searchParams.append('hasDiscount', hasDiscount ? 'true' : 'false');

    if (options?.limit) {
      url.searchParams.append('limit', options.limit.toString());
    } else if (options?.pagination) {
      url.searchParams.append(
        'startIndex',
        options.pagination.startIndex.toString(),
      );
      url.searchParams.append('perPage', options.pagination.perPage.toString());
    }
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${isNew ?? 'new'} ${hasDiscount ?? 'discount'} products`,
      );
    }

    const data = await res.json();

    return {
      items: data.products || data,
      totalCount: data.totalCount || data.length,
    };
  } catch (err) {
    throw err;
  }
};
