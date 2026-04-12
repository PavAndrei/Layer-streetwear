import Image from 'next/image';
import Link from 'next/link';

export const CategoryCard = ({
  _id,
  img,
  title,
}: {
  _id: string;
  img: string;
  title: string;
}) => {
  return (
    <Link href={`/categories/${_id}`} className="block h-full relative">
      <span className="absolute bottom-3 left-3 z-500 capitalize font-medium text-2xl">
        {title}
      </span>
      <Image src={img} alt={title} fill className="object-cover opacity-70" />
    </Link>
  );
};
