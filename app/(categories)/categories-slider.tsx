'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { CategoryCardProps } from '../types/categories';
import { ArrowRightIcon } from '../icons/arrow-right-icon';
import Link from 'next/link';
import { useEffect } from 'react';

export const CategoriesSlider = ({
  categories,
}: {
  categories: CategoryCardProps[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: false,
  });

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  return (
    <div className="w-full mx-auto flex flex-col gap-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {categories.map((category) => (
            <div
              key={category._id}
              className="min-w-0 shrink-0 basis-full px-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/6 cursor-grab active:cursor-grabbing"
            >
              <div className="relative flex h-full flex-col rounded bg-neutral-800 p-3 text-neutral-50">
                <div className="relative mb-4 flex h-78 max-h-88 w-full items-center justify-center rounded bg-neutral-800">
                  <Image
                    src={category.img}
                    alt={category.title}
                    fill
                    className="rounded object-center max-w-66.25 max-h-78"
                  />
                </div>

                <div className="mb-2 line-clamp-1 text-lg font-medium">
                  {category.title}
                </div>

                <Link
                  href={`/categories/${category.slug}`}
                  className="mt-auto flex cursor-pointer items-center justify-center rounded bg-lime-600 px-2 py-1 font-medium text-neutral-50 transition-all duration-100 ease-in hover:bg-lime-500 active:scale-95"
                >
                  View Category
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 pt-2.5 w-full">
          <button
            className="embla__prev rotate-180 cursor-pointer active:scale-95"
            onClick={goToPrev}
          >
            <ArrowRightIcon />
          </button>
          <button
            className="embla__next cursor-pointer active:scale-95"
            onClick={goToNext}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
