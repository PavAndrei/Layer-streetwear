import Image from 'next/image';
import { ProductCardProps } from '../types/product';

export const ProductCard = ({
  product,
  className,
}: {
  product: ProductCardProps;
  className?: string;
}) => {
  return (
    <li
      className={`relative flex flex-col max-w-76 ${className} text-neutral-50 bg-neutral-800 p-2 rounded`}
    >
      <div className="w-72 h-48 bg-neutral-800 flex items-center justify-center rounded mb-4">
        <Image
          src={product.img}
          alt={product.title}
          width={288}
          height={144}
          className="rounded"
        />
      </div>
      <div className="flex items-center justify-between mb-2">
        {!product.hasDiscount ? (
          <div className="flex flex-col gap-1">
            <div className="font-bold">{product.defaultPrice} $</div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <div className="font-bold">{product.discountPrice} $</div>
              <div className="text-sm text-neutral-300">by card</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold line-through">
                {product.defaultPrice} $
              </div>
              <div className="text-sm text-neutral-300">default price</div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <div className="font-medium text-lg line-clamp-1">{product.title}</div>
        <div className="italic line-clamp-3">{product.description}</div>
      </div>
      <div className="mt-auto mb-2">{product.rating}</div>

      <button
        aria-label="add to cart"
        className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 transition-colors duration-200 ease-in cursor-pointer flex items-center justify-center font-medium text-neutral-50 my-0"
      >
        Add to cart
      </button>
      {product.discountPercent && (
        <div className="absolute top-4 left-4">
          - {product.discountPercent} %
        </div>
      )}
    </li>
  );
};
