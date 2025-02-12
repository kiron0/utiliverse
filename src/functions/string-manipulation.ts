export const truncateString = (value: string, length: number): string => {
  return value.length > length ? value.slice(0, length) + "..." : value;
};

export const reverseString = (value: string): string => {
  return value.split("").reverse().join("");
};

export const countWords = (value: string): number => {
  return value.split(/\s+/).length;
};

export const countCharacters = (value: string): number => {
  return value.length;
};

export const removeWhitespace = (value: string): string => {
  return value.replace(/\s/g, "");
};

export const removeSpecialCharacters = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
};

export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const replaceAll = (
  value: string,
  search: string,
  replace: string,
): string => {
  return value.split(search).join(replace);
};

export const generateRandomString = (length: number): string => {
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
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
};

export const unescapeHTML = (value: string): string => {
  return value.replace(/&#(\d+);/g, (_, char) =>
    String.fromCharCode(Number(char)),
  );
};
