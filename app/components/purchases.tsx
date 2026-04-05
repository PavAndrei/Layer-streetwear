import { ArrowRightIcon } from '../icons/arrow-right-icon';
// import db from '@/app/data/database.json';
import { ProductCard } from './product-card';
import { ProductCardProps } from '../types/product';
import { NavigateLink } from './navigate-link';

export const Purchases = async () => {
  // const userPurchases = db.users[0].purchases
  //   .map((purchase) =>
  //     db.products.find((product) => {
  //       const userPurchases = purchase._id === product._id && product;
  //       if (userPurchases) {
  //       const { discountPrice, ...rest } = userPurchases;
  //       void discountPrice;
  //       return rest;
  //     }
  //   }),
  // )
  // .filter((product) => product !== undefined) as ProductCardProps[];

  let purchases: ProductCardProps[] = [];
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?isNew=true`,
    );
    purchases = await res.json();
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
        <h2 className="text-xl font-semibold ">Purchases</h2>
        {/* <div className="flex items-center gap-5">
          <span>Show all purchases</span>
          <ArrowRightIcon />
        </div> */}
        <NavigateLink href="/purchases" text="Show all purchases" />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {purchases.slice(0, 8).map((purchase) => (
          <ProductCard
            key={purchase._id}
            product={purchase}
            displayDiscount={false}
          />
        ))}
      </ul>
    </section>
  );
};
