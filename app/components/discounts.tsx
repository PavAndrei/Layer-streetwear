import { ArrowRightIcon } from '../icons/arrow-right-icon';
import { ProductCard } from './product-card';
import { ProductCardProps } from '../types/product';
import { randomizeList } from '../utils/randomize-list';
import { NavigateLink } from './navigate-link';

export const Discounts = async () => {
  let products: ProductCardProps[] = [];
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?hasDiscount=true`,
    );
    products = await res.json();

    products = randomizeList(products);
  } catch (err) {
    error = 'Failed to fetch products';
    console.log(err);
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <section className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">Dicounts</h2>
        {/* <div className="flex items-center gap-5">
          <span>All discounts</span>
          <ArrowRightIcon />
        </div> */}
        <NavigateLink href="/discounts" text="All discounts" />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </section>
  );
};
