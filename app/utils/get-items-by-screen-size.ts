export const getItemsByScreenSize = () => {
  const width = window.innerWidth;

  if (width < 640) {
    return 1;
  }

  if (width < 768) {
    return 2;
  }

  if (width < 1024) {
    return 3;
  }

  if (width <= 1536) {
    return 4;
  }

  return 6;
};
