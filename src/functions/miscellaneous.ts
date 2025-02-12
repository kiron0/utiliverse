export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const roundToDecimal = (value: number, decimal: number): number => {
  return Number(value.toFixed(decimal));
};

export const toRadians = (value: number): number => {
  return (value * Math.PI) / 180;
};

export const toDegrees = (value: number): number => {
  return (value * 180) / Math.PI;
};

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const factorial = (value: number): number => {
  let result = 1;
  for (let i = 2; i <= value; i++) {
    result *= i;
  }
  return result;
};

export const fibonacci = (value: number): number[] => {
  const sequence = [0, 1];
  for (let i = 2; i <= value; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
};

export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};
