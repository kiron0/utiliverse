import { numberError, stringError } from "../errors";

export const truncateString = (value: string, length: number): string => {
  stringError(value);
  numberError(length, "Invalid input length provided.");
  return value.length > length ? value.slice(0, length) + "..." : value;
};

export const reverseString = (value: string): string => {
  stringError(value);
  return value.split("").reverse().join("");
};

export const countWords = (value: string): number => {
  stringError(value);
  return value.split(/\s+/).length;
};

export const countCharacters = (value: string): number => {
  stringError(value);
  return value.length;
};

export const removeWhitespace = (value: string): string => {
  stringError(value);
  return value.replace(/\s/g, "");
};

export const removeSpecialCharacters = (value: string): string => {
  stringError(value);
  return value.replace(/[^a-zA-Z0-9]/g, "");
};

export const capitalize = (value: string): string => {
  stringError(value);
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const replaceAll = (
  value: string,
  search: string,
  replace: string,
): string => {
  stringError(value);
  stringError(search);
  stringError(replace);
  return value.split(search).join(replace);
};

export const generateRandomString = (length: number): string => {
  numberError(length);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const escapeHTML = (value: string): string => {
  stringError(value);
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
};

export const unescapeHTML = (value: string): string => {
  stringError(value);
  return value.replace(/&#(\d+);/g, (_, char) =>
    String.fromCharCode(Number(char)),
  );
};

export const formatCurrency = (
  amount: number,
  currency = "USD",
  locale = "en-US",
) => {
  numberError(amount, "Please provide a valid number");
  stringError(currency, "Currency must be a string");
  stringError(locale, "Locale must be a string");

  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount,
  );
};
