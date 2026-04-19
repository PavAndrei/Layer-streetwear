import { ErrorBlock } from '@/app/components/error-block';

const ProductPage = async ({
  params,
}: {
  params: Promise<{ _id: string }>;
}) => {
  let productId: string = '';

  try {
    productId = (await params)._id;
  } catch (error) {
    <ErrorBlock
      error={error instanceof Error ? error : new Error(String(error))}
      title="Unable to load this product"
      errorMessage="We couldn't fetch the product right now. Please try again."
    />;
  }

  return <div>Product Page: {productId}</div>;
};

export default ProductPage;
