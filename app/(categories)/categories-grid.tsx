'use client';

import { CategoryCardProps } from '@/app/types/categories';
import React, { useEffect, useState } from 'react';
import { CategoryCard } from './category-card';
import Loading from './categories/loading';
import { ErrorBlock } from '../components/error-block';
import { CategoriesControls } from './categories-controls';
export const CategoriesGrid = () => {
  const [categories, setCategories] = useState<CategoryCardProps[]>([]);
  const [error, setError] = useState<{
    error: Error;
    errorMessage?: string;
    title?: string;
  } | null>(null);
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
      setError({
        error: err instanceof Error ? err : new Error(String('Unknown error')),
        errorMessage: 'Failed to update categories',
        title: "We couldn't update the categories. Try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetLayout = async () => {
    await fetchCategories();
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

      if (!res.ok)
        setError({
          error: new Error(String('Failed to fetch categories')),
          errorMessage: 'Failed to fetch categories',
          title: "We couldn't fetch the categories. Try again later.",
        });

      const data: CategoryCardProps[] = await res.json();

      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (err) {
      setError({
        error: err instanceof Error ? err : new Error(String('Unknown error')),
        errorMessage: 'Failed to fetch categories',
        title: "We couldn't fetch the categories. Try again later.",
      });
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
    return (
      <ErrorBlock
        error={error.error}
        errorMessage={error.errorMessage}
        title={error.title}
      />
    );
  }

  if (categories.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <section className="my-10 flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold ">Categories</h1>
        {isAdmin && (
          <CategoriesControls
            isEditing={isEditing}
            resetLayout={resetLayout}
            toggleEditing={toggleEditing}
          />
        )}
      </div>

      <ul className="grid-container">
        {categories.map((categoryItem) => (
          <CategoryCard
            key={categoryItem._id}
            categoryItem={categoryItem}
            isEditing={isEditing}
            isHovered={hoveredCategoryId === categoryItem._id}
            isDragged={categoryItem._id === draggedCategory?._id}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
          />
        ))}
      </ul>
    </section>
  );
};
