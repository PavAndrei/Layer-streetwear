import { ArrowRightIcon } from '../icons/arrow-right-icon';
import { ProductCardProps } from '../types/product';
import { randomizeList } from '../utils/randomize-list';
import { NavigateLink } from './navigate-link';
import { ProductCard } from './product-card';

export const NewArrivals = async () => {
  let arrivals: ProductCardProps[] = [];
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?isNew=true`,
    );
    arrivals = await res.json();

    arrivals = randomizeList(arrivals);
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
        <h2 className="text-xl font-semibold ">New Arrivals</h2>
        {/* <div className="flex items-center gap-5">
          <span>All new arrivals</span>
          <ArrowRightIcon />
        </div> */}
        <NavigateLink href="/new-arrivals" text="All new arrivals" />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {arrivals.slice(0, 8).map((product) => (
          <ProductCard key={product._id} displayNewBadge product={product} />
        ))}
      </ul>
    </section>
  );
};
