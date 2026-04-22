type FetchProductsFilters = {
  category?: string;
  hasDiscount?: boolean;
  isNew?: boolean;
  trending?: boolean;
  includeOutOfStock?: boolean;
};

type FetchProductsOptions = {
  limit?: number;
  pagination?: {
    startIndex: number;
    perPage: number;
  };
  matchMode?: 'all' | 'any';
};

type FetchCategoryProductsFilters = {
  category: string;
  inStock?: boolean;
  hasDiscount?: boolean;
  isNew?: boolean;
  trending?: boolean;
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

    if (filters?.trending !== undefined) {
      url.searchParams.append('trending', filters.trending.toString());
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

    if (options?.matchMode) {
      url.searchParams.append('matchMode', options.matchMode);
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

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();

    return {
      items: data.products || data,
      totalCount: data.totalCount || data.length,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchDiscountedProducts = async (
  options?: Omit<FetchProductsOptions, 'matchMode'>,
) => {
  return fetchProducts(
    {
      hasDiscount: true,
      includeOutOfStock: true,
    },
    {
      ...options,
      matchMode: 'all',
    },
  );
};

export const fetchNewArrivalProducts = async (
  options?: Omit<FetchProductsOptions, 'matchMode'>,
) => {
  return fetchProducts(
    {
      isNew: true,
      includeOutOfStock: true,
    },
    {
      ...options,
      matchMode: 'all',
    },
  );
};

export const fetchCategoryProducts = async (
  filters: FetchCategoryProductsFilters,
  options?: Omit<FetchProductsOptions, 'matchMode'>,
) => {
  return fetchProducts(
    {
      category: filters.category,
      hasDiscount: filters.hasDiscount,
      isNew: filters.isNew,
      trending: filters.trending,
      includeOutOfStock: filters.inStock === true ? false : true,
    },
    {
      ...options,
      matchMode: 'any',
    },
  );
};
