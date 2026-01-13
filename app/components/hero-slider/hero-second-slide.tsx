import layerHero2 from '@/public/layer-hero-2.png';
import Image from 'next/image';

export const HeroSecondtSlide = () => {
  return (
    <div className="relative h-95 flex items-end pb-10 pl-10">
      <h2 className="font-bold text-neutral-50 italic text-4xl uppercase">
        Designed for movement.
      </h2>
      <Image
        src={layerHero2}
        alt="background image"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10 scale-x-[-1]"
      />
    </div>
  );
};
