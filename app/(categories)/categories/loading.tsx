import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';

const Loading = () => {
  return (
    <ContentSectionSkeleton
      itemsCount={8}
      showHeader
      showLink={false}
      cardVariant="category"
    />
  );
};

export default Loading;
