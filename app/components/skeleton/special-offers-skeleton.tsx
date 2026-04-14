export const SpecialOffersSkeleton = () => {
  return (
    <section className="bg-neutral-800">
      <div className="mx-auto flex h-fit min-h-90 w-full max-w-365 flex-col gap-4 px-2.5 py-5 md:h-75 md:min-h-75 md:flex-row md:items-center md:justify-around">
        <div className="flex flex-col gap-3 px-2.5 md:h-2/3 md:max-w-1/2">
          <div className="h-7 w-56 animate-pulse rounded bg-neutral-700" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-700" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-700" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-700" />
          <div className="mt-auto h-9 w-32 animate-pulse rounded bg-neutral-700" />
        </div>

        <div className="h-25 w-full px-2.5 md:max-h-75 md:h-9/12 md:max-w-1/2">
          <div className="h-full w-full animate-pulse rounded bg-neutral-700" />
        </div>
      </div>
    </section>
  );
};
