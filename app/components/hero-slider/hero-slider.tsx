'use client';

import { motion } from 'framer-motion';
import { HeroFirstSlide } from './hero-first-slide';
import { HeroSecondtSlide } from './hero-second-slide';
import { HeroThirdSlide } from './hero-third-slide';

export const HeroSlider = () => {
  const slides = [
    <HeroFirstSlide key="slide-1" />,
    <HeroSecondtSlide key="slide-2" />,
    <HeroThirdSlide key="slide-3" />,
  ];
  return (
    <div className="relative h-95">
      {slides.map((slide, i) => (
        <motion.div
          className="absolute inset-0"
          key={`slide-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: slides.length * 6 - 6,
            delay: i * 6,
          }}
        >
          {slide}
        </motion.div>
      ))}
    </div>
  );
};
