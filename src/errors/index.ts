export const stringError = (str: string, message?: string): void => {
  if (!str || typeof str !== "string") {
    throw new Error(message || "Please provide a valid string.");
  }
};

export const numberError = (num: number, message?: string): void => {
  if (
    !num ||
    typeof num !== "number" ||
    isNaN(num) ||
    num === Infinity ||
    num === -Infinity ||
    num === 0 ||
    !isFinite(num)
  ) {
    throw new Error(message || "Please provide a valid number.");
  }
};

export const arrayError = (arr: any[], message?: string): void => {
  if (!arr || !Array.isArray(arr) || !arr.length) {
    throw new Error(message || "Please provide a valid array.");
  }
};

export const objectError = (obj: object, message?: string): void => {
  if (!obj || typeof obj !== "object") {
    throw new Error(message || "Please provide a valid object.");
  }
};

export const dateError = (date: Date, message?: string): void => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error(message || "Please provide a valid date.");
  }
};

export const functionError = (func: Function, message?: string): void => {
  if (!func || typeof func !== "function") {
    throw new Error(message || "Please provide a valid function.");
  }
};
