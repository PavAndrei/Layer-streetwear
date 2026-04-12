import { NavigateLink } from '../components/navigate-link';
import { ProductCard } from './product-card';
import { ProductCardProps } from '../types/product';

export const ProductsSection = ({
  title,
  linkText,
  linkTo,
  products,
  displayDiscount,
  displayNewBadge,
  quantity = products.length,
  headingLevel = 'h1',
}: {
  title: string;
  linkText?: string;
  linkTo?: string;
  products: ProductCardProps[];
  displayDiscount?: boolean;
  displayNewBadge?: boolean;
  quantity?: number;
  headingLevel?: 'h1' | 'h2';
}) => {
  return (
    <section className="mt-10 flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        {headingLevel === 'h1' && (
          <h1 className="text-xl font-semibold ">{title}</h1>
        )}
        {headingLevel === 'h2' && (
          <h2 className="text-xl font-semibold ">{title}</h2>
        )}
        {linkTo && linkText && <NavigateLink href={linkTo} text={linkText} />}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.slice(0, quantity).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            displayDiscount={displayDiscount}
            displayNewBadge={displayNewBadge}
          />
        ))}
      </ul>
    </section>
  );
};
