import { Discounts } from './components/discounts';
import { HeroSlider } from './components/hero-slider/hero-slider';
import { NewArrivals } from './components/new-arriavals';
import { Purchases } from './components/purchases';
import { SpecialOffers } from './components/special-offers';

export default function Home() {
  return (
    <main className="w-full mx-auto mb-20 h-fit flex flex-col gap-20">
      <HeroSlider />
      <Discounts />
      <NewArrivals />
      <Purchases />
      <SpecialOffers />
    </main>
  );
}
