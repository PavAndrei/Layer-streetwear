import layerHero3 from '@/public/layer-hero-3.png';
import Image from 'next/image';

export const HeroThirdSlide = () => {
  return (
    <div className="relative h-95 flex items-end pb-10 pl-10">
      <h2 className="font-bold text-neutral-50 italic text-4xl uppercase">
        Comfort, function, and clean silhouettes.
      </h2>
      <Image
        src={layerHero3}
        alt="background image"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
    </div>
  );
};
