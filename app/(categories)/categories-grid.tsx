'use client';

import { CategoryCardProps } from '@/app/types/categories';
import React, { useEffect, useState } from 'react';
import { CategoryCard } from './category-card';
import Loading from './categories/loading';
export const CategoriesGrid = () => {
  const [categories, setCategories] = useState<CategoryCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // editing functionality
  const isAdmin = true; // temporary hardcoded
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draggedCategory, setDraggedCategory] =
    useState<CategoryCardProps | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );
  const toggleEditing = async () => {
    if (isEditing) {
      await updateCategories();
    }

    setIsEditing(!isEditing);
  };
  const updateCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            categories.map((c, i) => ({
              _id: c._id,
              order: i + 1,
              title: c.title,
              img: c.img,
            })),
          ),
        },
      );

      if (!res.ok) throw new Error('Failed to update categories');

      const data = await res.json();
    } catch (err) {
      console.error(`Failed to update categories: ${err}`);
      setError('Failed to update categories');
    } finally {
      setIsLoading(false);
    }
  };

  const resetLayout = () => {
    fetchCategories();
  };
  const handleDragStart = (category: CategoryCardProps) => {
    if (isEditing) {
      setDraggedCategory(category);
    }
  };
  const handleDragOver = (
    e: React.DragEvent<HTMLLIElement>,
    categoryId: string,
  ) => {
    e.preventDefault();

    if (draggedCategory && draggedCategory._id !== categoryId) {
      setHoveredCategoryId(categoryId);
    }
  };
  const handleDragLeave = () => {
    setHoveredCategoryId(null);
  };
  const handleDrop = (
    e: React.DragEvent<HTMLLIElement>,
    targetCategoryId: string,
  ) => {
    e.preventDefault();

    if (!isEditing || !draggedCategory) return;

    setCategories((prev) => {
      const draggedItemIndex = prev.findIndex(
        (item) => item._id === draggedCategory._id,
      );

      const targetItemIndex = prev.findIndex(
        (item) => item._id === targetCategoryId,
      );

      if (draggedItemIndex === -1 || targetItemIndex === -1) return prev;

      const newCategories = [...prev];

      const draggedItem = newCategories[draggedItemIndex];
      const targetItem = newCategories[targetItemIndex];

      newCategories[draggedItemIndex] = targetItem;
      newCategories[targetItemIndex] = draggedItem;

      return newCategories;
    });

    setDraggedCategory(null);
    setHoveredCategoryId(null);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
        { next: { revalidate: 3600 } },
      );

      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);

      const data: CategoryCardProps[] = await res.json();

      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error(`Failed to fetch categories: ${err}`);
      setError('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    throw error;
  }

  if (categories.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <section className="my-10 flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold ">Categories</h1>
        {isAdmin && (
          <div className="flex items-center gap-4">
            <button
              className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-all duration-100 ease-in text-neutral-50 sm:max-w-50 text-center mt-auto mb-2 active:scale-95"
              onClick={() => toggleEditing()}
            >
              {isEditing ? 'Apply changes' : 'Change categories order'}
            </button>
            {isEditing && (
              <button
                className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-all duration-100 ease-in text-neutral-50 sm:max-w-50 text-center mt-auto mb-2 active:scale-95"
                onClick={resetLayout}
              >
                Reset
              </button>
            )}
          </div>
        )}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-8">
        {categories.map((categoryItem) => (
          <li
            key={categoryItem._id}
            className={`bg-neutral-800 rounded p-3 text-neutral-50 min-h-80 ${isEditing && 'border border-dashed border-lime-600'} ${
              hoveredCategoryId === categoryItem._id
                ? 'shadow-[0_0_15px_rgba(132,204,22,0.6)]'
                : ''
            }`}
            onDragOver={(e) => handleDragOver(e, categoryItem._id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, categoryItem._id)}
          >
            <div
              className={`w-full h-full transition-opacity duration-100 ease-in ${categoryItem._id === draggedCategory?._id && 'opacity-50'}`}
              draggable
              onDragStart={() => handleDragStart(categoryItem)}
            >
              <CategoryCard
                _id={categoryItem._id}
                title={categoryItem.title}
                img={categoryItem.img}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
