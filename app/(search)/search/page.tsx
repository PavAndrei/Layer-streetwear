'use client';

import { ProductsSection } from '@/app/(products)/products-section';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';
import { ProductCardProps } from '@/app/types/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchResults, setSearchResults] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `/api/search-all?query=${encodeURIComponent(query)}`,
        );

        const data = await res.json();

        setSearchResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (isLoading) return <ContentSectionSkeleton showLink={false} />;

  return (
    <>
      {searchResults.length > 0 ? (
        <ProductsSection
          products={searchResults}
          title={`${searchResults.length} results for the query "${query}"`}
        />
      ) : (
        <div className="text-center py-10">No results found.</div>
      )}
    </>
  );
};

export default SearchPage;
