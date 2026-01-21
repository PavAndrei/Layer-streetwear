'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const SpecialOfferCard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around md:items-center w-full gap-4 md:h-75 h-full">
      <div className="flex flex-col gap-2 md:max-w-1/2 px-2.5 md:h-2/3">
        <h2 className="text-xl font-semibold">Apply for our Rewards Card</h2>
        <p className="text-neutral-300 text-sm">
          Earn reward points with every purchase and unlock access to exclusive
          offers available only to cardholders. Enjoy early access to sales,
          special pricing on selected items, and personalized rewards designed
          around your style.
        </p>
        <button className="flex items-center justify-center bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-all duration-200 ease-in text-neutral-50 sm:max-w-50 text-center mt-auto mb-2 active:scale-95">
          Sign Up Now
        </button>
      </div>
      <div className="md:max-w-1/2 w-full h-25 md:h-9/12 md:max-h-75 px-2.5">
        <Image
          src="/banners/banner-card-offer.png"
          alt="special offers"
          width={300}
          height={300}
          className="rounded w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export const SpecialOfferDiscount = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around md:items-center w-full gap-4 md:h-75 h-full">
      <div className="flex flex-col gap-2 md:max-w-1/2 px-2.5 md:h-2/3">
        <h2 className="text-xl font-semibold">Seasonal discounts</h2>
        <p className="text-neutral-300 text-sm">
          Discover a curated selection of LAYER essentials available with
          limited-time discounts. Clean silhouettes, premium materials, and
          everyday comfort — now more accessible.
        </p>
        <button className="flex items-center justify-center bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-all duration-200 ease-in text-neutral-50 sm:max-w-50 text-center mt-auto mb-2 active:scale-95">
          Unlock Discounts
        </button>
      </div>
      <div className="md:max-w-1/2 w-full h-25 md:h-9/12 md:max-h-75 px-2.5">
        <Image
          src="/banners/banner-discount-offer.png"
          alt="special offers"
          width={300}
          height={300}
          className="rounded w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export const SpecialOffers = () => {
  const slides = [
    <SpecialOfferCard key="slide-1" />,
    <SpecialOfferDiscount key="slide-2" />,
  ];

  return (
    <section className="bg-neutral-800">
      <div className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full py-5 relative min-h-90 md:min-h-75 h-fit overflow-hidden">
        {slides.map((slide, i) => (
          <motion.div
            key={`slide-${i}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: '100%' }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: ['100%', '0%', '0%', '-100%'],
            }}
            transition={{
              duration: slides.length * 24,
              times: [
                i / slides.length,
                (i + 0.1) / slides.length,
                (i + 0.9) / slides.length,
                (i + 1) / slides.length,
              ],
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {slide}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
