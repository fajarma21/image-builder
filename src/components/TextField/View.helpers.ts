export const valueChecker = (
  value: number,
  min = -Infinity,
  max = Infinity,
) => {
  return Math.max(min, Math.min(value, max));
};
