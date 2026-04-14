export const HeroSliderSkeleton = () => {
  return (
    <section className="relative h-95 overflow-hidden bg-neutral-800">
      <div className="absolute inset-0 animate-pulse bg-neutral-700" />
      <div className="absolute bottom-10 left-1/2 w-full max-w-365 -translate-x-1/2 px-2.5">
        <div className="h-10 w-52 animate-pulse rounded bg-neutral-600" />
      </div>
    </section>
  );
};
