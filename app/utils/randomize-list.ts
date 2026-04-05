export const randomizeList = <T>(list: T[]): T[] => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled;
};
