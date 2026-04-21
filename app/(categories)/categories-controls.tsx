export const CategoriesControls = ({
  isEditing,
  toggleEditing,
  resetLayout,
}: {
  isEditing: boolean;
  toggleEditing: () => void;
  resetLayout: () => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-all duration-100 ease-in text-neutral-50 sm:max-w-50 text-center mt-auto mb-2 active:scale-95"
        onClick={() => toggleEditing()}
      >
        {isEditing ? 'Apply changes' : 'Change categories order'}
      </button>
      {isEditing && (
        <button
          className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-all duration-100 ease-in text-neutral-50 sm:max-w-50 text-center mt-auto mb-2 active:scale-95"
          onClick={resetLayout}
        >
          Reset
        </button>
      )}
    </div>
  );
};
