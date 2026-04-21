import Image from 'next/image';
import Link from 'next/link';
import { CategoryCardProps } from '../types/categories';

export const CategoryCard = ({
  isEditing,
  isHovered,
  isDragged,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleDragStart,
  categoryItem,
}: {
  isEditing: boolean;
  isHovered: boolean;
  isDragged: boolean;
  handleDragOver: (e: React.DragEvent<HTMLLIElement>, _id: string) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent<HTMLLIElement>, _id: string) => void;
  handleDragStart: (categoryItem: CategoryCardProps) => void;
  categoryItem: CategoryCardProps;
}) => {
  return (
    <li
      className={`bg-neutral-800 rounded p-3 text-neutral-50 min-h-80 ${isEditing && 'border border-dashed border-lime-600'} ${
        isHovered ? 'shadow-[0_0_15px_rgba(132,204,22,0.6)]' : ''
      }`}
      onDragOver={(e) => handleDragOver(e, categoryItem._id)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, categoryItem._id)}
    >
      <div
        className={`w-full h-full transition-opacity duration-100 ease-in ${isDragged && 'opacity-50'}`}
        draggable
        onDragStart={() => handleDragStart(categoryItem)}
      >
        <Link
          href={`/categories/${categoryItem.slug}`}
          className="block h-full relative"
        >
          <span className="absolute bottom-3 left-3 z-500 capitalize font-medium text-2xl">
            {categoryItem.title}
          </span>
          <Image
            src={categoryItem.img}
            alt={categoryItem.title}
            fill
            className="object-contain opacity-70"
          />
        </Link>
      </div>
    </li>
  );
};
