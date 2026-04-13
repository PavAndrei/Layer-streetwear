import { NavigateLink } from '../components/navigate-link';
import { randomizeList } from '../utils/randomize-list';
import { fetchCategories } from './fetch-categories';
import { CategoriesSlider } from './categories-slider';

export const CategoriesSection = async () => {
  let categories;

  try {
    categories = await fetchCategories();
    categories = randomizeList(categories);
  } catch {
    return <div className="text-red-500">Error fetching categories</div>;
  }

  return (
    <section className="mt-10 flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">Categories</h2>
        <NavigateLink href="/categories" text="All categories" />
      </div>
      <CategoriesSlider categories={categories} />
    </section>
  );
};
