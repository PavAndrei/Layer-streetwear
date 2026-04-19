export const fetchUsersPurchases = async (options?: {
  limit?: number;
  pagination?: { startIndex: number; perPage: number };
}) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/purchases`,
    );

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
      throw new Error(`Failed to fetch users purchases: ${res.status}`);
    }

    const data = await res.json();

    return {
      items: Array.isArray(data?.items) ? data.items : [],
      totalCount: typeof data?.totalCount === 'number' ? data.totalCount : 0,
    };
  } catch (err) {
    throw err;
  }
};
