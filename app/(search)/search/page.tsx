import { Suspense } from 'react';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';
import { SearchPageClient } from '../search-page-client';

const SearchPage = () => {
  return (
    <Suspense fallback={<ContentSectionSkeleton showLink={false} />}>
      <SearchPageClient />
    </Suspense>
  );
};

export default SearchPage;
