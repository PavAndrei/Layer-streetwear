export const HeaderSearchError = ({
  errorMessage,
  setErrorMessage,
  setQuery,
  inputRef,
}: {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  setQuery: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm text-neutral-500">{errorMessage}</div>
      <button
        className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 transition-all duration-100 ease-in cursor-pointer flex items-center justify-center font-medium text-neutral-50 my-0 active:scale-95"
        onClick={() => {
          setErrorMessage('');
          setQuery('');
          inputRef.current?.focus();
        }}
      >
        Try again
      </button>
    </div>
  );
};
