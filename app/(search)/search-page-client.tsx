'use client';

import { ProductsSection } from '@/app/(products)/products-section';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';
import { ProductCardProps } from '@/app/types/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SearchPageClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchResults, setSearchResults] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `/api/search-all?query=${encodeURIComponent(query)}`,
        );

        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [query]);

  if (isLoading) {
    return <ContentSectionSkeleton showLink={false} />;
  }

  return searchResults.length > 0 ? (
    <ProductsSection
      products={searchResults}
      title={`${searchResults.length} results for the query "${query}"`}
    />
  ) : (
    <div className="py-10 text-center">No results found.</div>
  );
};
