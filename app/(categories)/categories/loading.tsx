const skeletonItems = Array.from({ length: 8 });

const Loading = () => {
  return (
    <section className="mx-auto my-10 flex w-full max-w-365 flex-col gap-10 px-2.5">
      <div className="flex items-center justify-between gap-4">
        <div className="h-7 w-32 animate-pulse rounded bg-neutral-800" />

        <div className="flex items-center gap-4">
          <div className="h-10 w-44 animate-pulse rounded bg-neutral-800" />
          <div className="hidden h-10 w-24 animate-pulse rounded bg-neutral-800 sm:block" />
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-8">
        {skeletonItems.map((_, index) => (
          <li
            key={index}
            className="min-h-80 rounded bg-neutral-800 p-3 text-neutral-50"
          >
            <div className="flex h-full flex-col gap-3">
              <div className="relative overflow-hidden rounded bg-neutral-700">
                <div className="aspect-4/5 animate-pulse bg-neutral-700" />
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-700" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-700" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Loading;
