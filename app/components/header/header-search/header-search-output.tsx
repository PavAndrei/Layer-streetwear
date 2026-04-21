import Link from 'next/link';
import { HighlightMatches } from '../highlight-matches';
import { SearchProduct } from '@/app/types/product';
import { BurgerMenuIcon } from '@/app/icons/burger-menu-icon';

export const HeaderSearchOutput = ({
  isLoading,
  data,
  query,
  resetSearch,
}: {
  isLoading: boolean;
  data: {
    category: string;
    products: SearchProduct[];
  }[];
  errorMessage?: string;
  query: string;
  resetSearch: () => void;
}) => {
  if (isLoading) {
    return <div className="text-sm">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="text-sm">No results found</div>;
  }

  return (
    <>
      {data.map(({ category, products }, i) => (
        <div key={i}>
          <Link
            href={`/categories/${encodeURIComponent(category)}`}
            className="flex gap-1 items-center justify-between cursor-pointer group"
            onClick={() => resetSearch()}
          >
            <span className="text-neutral-500 group-hover:text-neutral-50 transition-colors duration-100 ease-in capitalize">
              <HighlightMatches text={category} highlight={query} />
            </span>
            <BurgerMenuIcon
              w={20}
              h={20}
              className="text-neutral-500 group-hover:text-neutral-50 transition-colors duration-100 ease-in"
            />
          </Link>
          <ul className="flex flex-col">
            {products.map((product) => (
              <li
                key={product._id}
                className="border-t border-neutral-500 py-1 cursor-pointer group"
              >
                <Link
                  href={`/product/${product._id}`}
                  className="wrap-break-word text-neutral-500 group-hover:text-neutral-50 transition-colors duration-100 ease-in"
                  onClick={() => resetSearch()}
                >
                  <HighlightMatches text={product.title} highlight={query} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
