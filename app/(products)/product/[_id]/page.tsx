const ProductPage = async ({
  params,
}: {
  params: Promise<{ _id: string }>;
}) => {
  let productId: string = '';

  try {
    productId = (await params)._id;
  } catch (error) {
    console.error(`Error fetching this product: ${error}`);
  }

  return <div>Product Page: {productId}</div>;
};

export default ProductPage;
