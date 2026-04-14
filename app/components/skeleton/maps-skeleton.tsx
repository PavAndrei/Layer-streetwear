export const MapsSkeleton = () => {
  return (
    <section className="mx-auto w-full max-w-365 px-2.5">
      <div className="flex w-full flex-col gap-10">
        <div className="h-7 w-28 animate-pulse rounded bg-neutral-800" />

        <div className="flex flex-wrap gap-4">
          <div className="h-8 w-20 animate-pulse rounded bg-neutral-800" />
          <div className="h-8 w-24 animate-pulse rounded bg-neutral-800" />
          <div className="h-8 w-24 animate-pulse rounded bg-neutral-800" />
        </div>

        <div className="h-87.5 w-full animate-pulse rounded overflow-hidden bg-neutral-800" />
      </div>
    </section>
  );
};
