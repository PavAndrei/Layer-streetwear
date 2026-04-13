'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  const router = useRouter();

  const handleRetry = () => {
    startTransition(() => {
      reset();
      router.refresh();
    });
  };

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-365 flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-xl font-semibold text-neutral-50">
          Failed to load categories
        </h2>

        <p className="max-w-md text-sm text-neutral-300">
          {error.message || 'Something went wrong. Please try again.'}
        </p>
      </div>

      <button
        onClick={handleRetry}
        className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 transition-all duration-100 ease-in cursor-pointer flex items-center justify-center font-medium text-neutral-50 my-0 active:scale-95"
        aria-label="try again"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorBoundary;
