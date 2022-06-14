export const exponentialToString = (v: number | string) => {
  const split = v.toString().split('e');
  if (split.length === 1) {
    return v.toString();
  }
  const numberOfZeroes = Math.abs(parseInt(split[1])) - 1;
  const value = split[0];
  return '0.' + stringWithLength(numberOfZeroes) + value;
};
const stringWithLength = (length): string => {
  return new Array(length + 1).join('0');
};
