import { ArrowRightIcon } from '../icons/arrow-right-icon';
import db from '@/app/data/database.json';
import { ProductCard } from './product-card';

export const NewArrivals = () => {
  const arrivals = db.filter((product) => product.isNew);

  return (
    <div className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">New Arrivals</h2>
        <div className="flex items-center gap-5">
          <span>All new arrivals</span>
          <ArrowRightIcon />
        </div>
      </div>
      <ul className="flex flex-col md:flex-row justify-between">
        {arrivals.slice(0, 5).map((product, i) => (
          <ProductCard
            key={product._id}
            product={product}
            className={`${i >= 2 && 'hidden'} ${
              i >= 3 && 'md:hidden lg:flex'
            } ${i >= 4 && 'lg:hidden xl:flex'} ${i >= 5 && 'xl:hidden'}`}
          />
        ))}
      </ul>
    </div>
  );
};
