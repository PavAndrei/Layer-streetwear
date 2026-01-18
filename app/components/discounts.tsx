import { ArrowRightIcon } from '../icons/arrow-right-icon';
import db from '@/app/data/database.json';
import { ProductCard } from './product-card';

export const Discounts = () => {
  const products = db.products.filter((product) => product.hasDiscount);

  return (
    <section className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">Dicounts</h2>
        <div className="flex items-center gap-5">
          <span>All discounts</span>
          <ArrowRightIcon />
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </section>
  );
};
