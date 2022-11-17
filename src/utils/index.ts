export const getOrdinalSuffix = (n: number): string => {
  const first = n % 10;
  const second = n % 100;
  if (first === 1 && second !== 11) return "st";
  if (first === 2 && second !== 12) return "nd";
  if (first === 3 && second !== 13) return "rd";
  return "th";
};
