import { ArrowRightIcon } from '../icons/arrow-right-icon';
import db from '@/app/data/database.json';
import { ProductCard } from './product-card';

export const NewArrivals = () => {
  const arrivals = db.products.filter((product) => product.isNew);

  return (
    <section className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">New Arrivals</h2>
        <div className="flex items-center gap-5">
          <span>All new arrivals</span>
          <ArrowRightIcon />
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {arrivals.slice(0, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </section>
  );
};
