const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  let category: string = '';

  try {
    category = (await params).category;
  } catch (error) {
    console.error(`Error fetching category: ${error}`);
  }

  return <div>CategoryPage: {category}</div>;
};

export default CategoryPage;
