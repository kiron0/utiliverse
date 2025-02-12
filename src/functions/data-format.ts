import { StrongPasswordOptions } from "../types";

export function generateStrongPassword({
  length = 12,
  hasUppercase = true,
  hasLowercase = true,
  hasNumber = true,
  hasSpecialChar = true,
}: StrongPasswordOptions = {}): string {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{};:,.<>?";
  const allChars = [
    hasUppercase ? uppercaseChars : "",
    hasLowercase ? lowercaseChars : "",
    hasNumber ? numberChars : "",
    hasSpecialChar ? specialChars : "",
  ].join("");

  const getRandomChar = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)];

  const password = Array.from({ length })
    .map(() => getRandomChar(allChars))
    .join("");

  return password;
}

export const flattenArray = <T>(arr: (T | T[])[]): T[] =>
  arr.reduce<T[]>(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : [val]),
    [],
  );

export const chunkArray = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

export const shuffleArray = <T>(arr: T[]): T[] =>
  arr.sort(() => Math.random() - 0.5);

export const uniqueArray = <T>(arr: T[]): T[] => [...new Set(arr)];
export const sortArray = <T>(arr: T[], key: keyof T): T[] =>
  arr.sort((a, b) => (a[key] > b[key] ? 1 : -1));

export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> =>
  arr.reduce((acc, val) => {
    const group = String(val[key]);
    if (!acc[group]) acc[group] = [];
    acc[group].push(val);
    return acc;
  }, {} as Record<string, T[]>);

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const mergeObjects = <T extends object>(
  target: T,
  source: Partial<T>,
): T => ({ ...target, ...source });

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> =>
  keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);

export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keys.includes(key as K)) {
      acc[key as keyof Omit<T, K>] = value;
    }
    return acc;
  }, {} as Omit<T, K>);
