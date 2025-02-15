import { numberError } from "../errors";

export const clamp = (value: number, min: number, max: number): number => {
  numberError(value, "Invalid input number provided.");
  numberError(min, "Invalid input number provided.");
  numberError(max, "Invalid input number provided.");
  return Math.min(Math.max(value, min), max);
};

export const roundToDecimal = (value: number, decimal: number): number => {
  numberError(value, "Invalid input number provided.");
  numberError(decimal, "Invalid input number provided.");
  return Number(value.toFixed(decimal));
};

export const toRadians = (value: number): number => {
  numberError(value, "Invalid input number provided.");
  return (value * Math.PI) / 180;
};

export const toDegrees = (value: number): number => {
  numberError(value, "Invalid input number provided.");
  return (value * 180) / Math.PI;
};

export const generateRandomNumber = (min: number, max: number): number => {
  numberError(min, "Invalid input number provided.");
  numberError(max, "Invalid input number provided.");
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const factorial = (value: number): number => {
  numberError(value, "Invalid input number provided.");
  let result = 1;
  for (let i = 2; i <= value; i++) {
    result *= i;
  }
  return result;
};

export const fibonacci = (value: number): number[] => {
  numberError(value, "Invalid input number provided.");
  const sequence = [0, 1];
  for (let i = 2; i <= value; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
};

export const gcd = (a: number, b: number): number => {
  numberError(a, "Invalid input number provided.");
  numberError(b, "Invalid input number provided.");
  return b === 0 ? a : gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  numberError(a, "Invalid input number provided.");
  numberError(b, "Invalid input number provided.");
  return (a * b) / gcd(a, b);
};
