'use client';

export const ErrorBlock = ({
  error,
  errorMessage,
  title = 'Something went wrong',
}: {
  error: Error;
  errorMessage?: string;
  title?: string;
}) => {
  console.error(`Error occured: ${error}`);

  return (
    <div className="flex min-h-65 w-full items-center justify-center rounded-3xl border border-neutral-500 bg-neutral-800 px-6 py-10 shadow-[0_0_15px_rgba(132,204,22,0.6)] backdrop-blur-sm my-10 max-w-365 mx-auto">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-500 bg-neutral-800 text-2xl">
          ⚠
        </div>

        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-neutral-50">
          {title}
        </h2>

        <p className="mb-6 text-sm leading-6 text-neutral-50 sm:text-base">
          {errorMessage ||
            'An unexpected error occurred. Please try again later.'}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 transition-all duration-100 ease-in cursor-pointer w-full flex items-center justify-center font-medium text-neutral-50 my-3 mb-0 active:scale-95"
        >
          Try again
        </button>
      </div>
    </div>
  );
};
