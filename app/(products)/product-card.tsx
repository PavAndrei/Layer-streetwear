import Image from 'next/image';
import { ProductCardProps } from '../types/product';
import { StarRating } from '../components/star-rating';
import Link from 'next/link';

export const ProductCard = ({
  product,
  className,
  displayDiscount = true,
  displayNewBadge = true,
}: {
  product: ProductCardProps;
  className?: string;
  displayDiscount?: boolean;
  displayNewBadge?: boolean;
}) => {
  return (
    <li
      className={`relative flex flex-col bg-neutral-800 p-3 rounded text-neutral-50 ${className}`}
    >
      <div className="w-full h-78 max-h-88 bg-neutral-800 flex items-center justify-center rounded mb-4">
        <Link href={`/product/${product._id}`}>
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="rounded max-w-70 max-h-78 object-cover mx-auto mt-2"
          />
        </Link>
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
        <Link
          href={`/product/${product._id}`}
          className="font-medium text-lg line-clamp-1"
        >
          {product.title}
        </Link>
        <div className="italic line-clamp-3">{product.description}</div>
      </div>

      <div className="mt-auto mb-2">
        {product.rating > 0 && <StarRating rating={product.rating} />}
      </div>

      <button
        aria-label="add to cart"
        className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 transition-all duration-100 ease-in cursor-pointer flex items-center justify-center font-medium text-neutral-50 my-0 active:scale-95 disabled:bg-neutral-600 disabled:cursor-not-allowed"
        disabled={product.quantity === 0}
      >
        Add to cart
      </button>

      <div className="text-sm pt-2 text-neutral-300">
        In Stock: {product.quantity}
      </div>

      {displayDiscount && product.discountPercent && (
        <div className="absolute top-4 left-4 text-neutral-800 font-medium">
          - {product.discountPercent} %
        </div>
      )}

      {product.isNew && displayNewBadge && (
        <div className="absolute top-4 right-6 px-2 py-1 bg-lime-600 rounded animate-pulse">
          New
        </div>
      )}
    </li>
  );
};
