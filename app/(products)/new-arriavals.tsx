import { randomizeList } from '../utils/randomize-list';
import { fetchProducts } from './fetch-products';
import { ProductsSection } from './products-section';

export const NewArrivals = async () => {
  let products;

  try {
    products = await fetchProducts(true, false);
    products = randomizeList(products);
  } catch {
    return <div className="text-red-500">Error fetching new arrivals</div>;
  }

  return (
    <ProductsSection
      title="New Arrivals"
      linkText="All new arrivals"
      linkTo="/new-arrivals"
      products={products}
      quantity={15}
    />
  );
};
