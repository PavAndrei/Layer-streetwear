type FetchProductsFilters = {
  isNew?: boolean;
  hasDiscount?: boolean;
  category?: string;
  includeOutOfStock?: boolean;
};

type FetchProductsOptions = {
  limit?: number;
  pagination?: {
    startIndex: number;
    perPage: number;
  };
};

export const fetchProducts = async (
  filters?: FetchProductsFilters,
  options?: FetchProductsOptions,
) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

    if (filters?.isNew !== undefined) {
      url.searchParams.append('isNew', filters.isNew.toString());
    }

    if (filters?.hasDiscount !== undefined) {
      url.searchParams.append('hasDiscount', filters.hasDiscount.toString());
    }

    if (filters?.category) {
      url.searchParams.append('category', filters.category);
    }

    if (filters?.includeOutOfStock !== undefined) {
      url.searchParams.append(
        'includeOutOfStock',
        filters.includeOutOfStock.toString(),
      );
    }

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
      throw new Error('Failed to fetch products');
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
