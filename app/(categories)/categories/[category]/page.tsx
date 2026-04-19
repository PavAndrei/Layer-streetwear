import { ErrorBlock } from '@/app/components/error-block';

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  let category: string = '';

  try {
    category = (await params).category;
  } catch (error) {
    <ErrorBlock
      error={error instanceof Error ? error : new Error(String(error))}
      title="Unable to load this category"
      errorMessage="We couldn't fetch the category right now. Please try again."
    />;
  }

  return <div>CategoryPage: {category}</div>;
};

export default CategoryPage;
