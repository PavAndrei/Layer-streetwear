import { Suspense, ReactNode } from 'react';

import { Articles } from './(articles)/articles';
import { CategoriesSection } from './(categories)/categories-section';
import { Discounts } from './(products)/discounts';
import { NewArrivals } from './(products)/new-arriavals';
import { Purchases } from './(users)/purchases';
import { HeroSlider } from './components/hero-slider/hero-slider';
import { SpecialOffers } from './components/special-offers';

import { ContentSectionSkeleton } from './components/skeleton/content-section-skeleton';
import { HeroSliderSkeleton } from './components/skeleton/hero-slider-skeleton';
import { MapsSkeleton } from './components/skeleton/maps-skeleton';
import { SpecialOffersSkeleton } from './components/skeleton/special-offers-skeleton';
import { MapsWrapper } from './components/maps-wrapper';

export const dynamic = 'force-dynamic';

type HomeSection = {
  id: string;
  component: ReactNode;
  fallback: ReactNode;
};

const productSectionFallback = (
  <ContentSectionSkeleton
    itemsCount={5}
    showHeader
    showLink
    cardVariant="product"
  />
);

const purchasesFallback = (
  <ContentSectionSkeleton
    itemsCount={5}
    showHeader
    showLink={false}
    cardVariant="product"
  />
);

const categorySectionFallback = (
  <ContentSectionSkeleton
    itemsCount={5}
    showHeader
    showLink={false}
    cardVariant="category"
  />
);

const articleSectionFallback = (
  <ContentSectionSkeleton
    itemsCount={5}
    showHeader
    showLink
    cardVariant="article"
  />
);

const homeSections: HomeSection[] = [
  {
    id: 'hero-slider',
    component: <HeroSlider />,
    fallback: <HeroSliderSkeleton />,
  },
  {
    id: 'discounts',
    component: <Discounts />,
    fallback: productSectionFallback,
  },
  {
    id: 'new-arrivals',
    component: <NewArrivals />,
    fallback: productSectionFallback,
  },
  {
    id: 'categories',
    component: <CategoriesSection />,
    fallback: categorySectionFallback,
  },
  {
    id: 'purchases',
    component: <Purchases />,
    fallback: purchasesFallback,
  },
  {
    id: 'special-offers',
    component: <SpecialOffers />,
    fallback: <SpecialOffersSkeleton />,
  },
  {
    id: 'articles',
    component: <Articles />,
    fallback: articleSectionFallback,
  },
  {
    id: 'maps',
    component: <MapsWrapper />,
    fallback: <MapsSkeleton />,
  },
];

export default function Home() {
  return (
    <main className="mx-auto mb-20 flex h-fit w-full flex-col gap-10">
      {homeSections.map(({ id, component, fallback }) => (
        <Suspense key={id} fallback={fallback}>
          {component}
        </Suspense>
      ))}
    </main>
  );
}
