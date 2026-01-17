import { Discounts } from './components/discounts';
import { HeroSlider } from './components/hero-slider/hero-slider';
import { NewArrivals } from './components/new-arriavals';

export default function Home() {
  return (
    <main className="w-full mx-auto mb-20 h-fit flex flex-col gap-20">
      <HeroSlider />
      <Discounts />
      <NewArrivals />
    </main>
  );
}
