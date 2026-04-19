'use client';

import { ProductsSection } from '@/app/(products)/products-section';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';
import { ProductCardProps } from '@/app/types/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErrorBlock } from '../components/error-block';

export const SearchPageClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchResults, setSearchResults] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    error: Error;
    errorMessage?: string;
    title?: string;
  } | null>(null);

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
        setError({
          error:
            error instanceof Error ? error : new Error(String('Unknown error')),
          errorMessage: 'Failed to search products',
          title: "We couldn't search the products. Try again later.",
        });
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

  if (error) {
    return (
      <ErrorBlock
        error={error.error}
        errorMessage={error.errorMessage}
        title={error.title}
      />
    );
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
