import { arrayError, numberError, stringError } from "../errors";
import { StrongPasswordOptions } from "../types";
import { currencies } from "../utility";

export const generateStrongPassword = ({
  length = 12,
  hasUppercase = true,
  hasLowercase = true,
  hasNumber = true,
  hasSpecialChar = true,
}: StrongPasswordOptions = {}): string => {
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
};

export const flattenArray = <T>(arr: (T | T[])[]): T[] => {
  arrayError(arr);

  return arr.reduce<T[]>(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : [val]),
    [],
  );
};

export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  arrayError(arr);

  if (size <= 0) {
    throw new Error("Invalid chunk size provided.");
  }

  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
};

export const shuffleArray = <T>(arr: T[]): T[] => {
  arrayError(arr);

  let currentIndex = arr.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

export const uniqueArray = <T>(arr: T[]): T[] => {
  arrayError(arr);

  return Array.from(new Set(arr));
};

export const sortArray = <T>(arr: T[], key: keyof T): T[] => {
  arrayError(arr);

  return arr.sort((a, b) => (a[key] > b[key] ? 1 : -1));
};

export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  arrayError(arr);

  return arr.reduce((acc, val) => {
    const group = String(val[key]);
    if (!acc[group]) acc[group] = [];
    acc[group].push(val);
    return acc;
  }, {} as Record<string, T[]>);
};

export const deepClone = <T>(obj: T): T => {
  if (!obj || typeof obj !== "object" || obj === null) {
    throw new Error("Invalid input object provided.");
  }

  return JSON.parse(JSON.stringify(obj));
};

export const mergeObjects = <T extends object>(
  target: T,
  source: Partial<T>,
): T => {
  if (!target || typeof target !== "object" || target === null) {
    throw new Error("Invalid target object provided.");
  }

  if (!source || typeof source !== "object" || source === null) {
    throw new Error("Invalid source object provided.");
  }

  return { ...target, ...source };
};

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  if (!obj || typeof obj !== "object" || obj === null) {
    throw new Error("Invalid input object provided.");
  }

  if (!keys || !Array.isArray(keys) || !keys.length) {
    throw new Error("Invalid keys provided.");
  }

  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
};

export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  if (!obj || typeof obj !== "object" || obj === null) {
    throw new Error("Invalid input object provided.");
  }

  if (!keys || !Array.isArray(keys) || !keys.length) {
    throw new Error("Invalid keys provided.");
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keys.includes(key as K)) {
      acc[key as keyof Omit<T, K>] = value;
    }
    return acc;
  }, {} as Omit<T, K>);
};

interface QueryParams {
  [key: string]: string;
}

export const getQueryParams = (url: string): QueryParams => {
  stringError(url, "Please provide a valid URL.");

  const params: QueryParams = {};
  new URL(url).searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const getFileExtension = (filename: string) => {
  stringError(filename, "Please provide a valid filename.");

  return filename.split(".").pop();
};

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const getRandomElement = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getType = (value: any) => {
  if (!value || value === null) {
    throw new Error("Invalid input object provided.");
  }
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

interface NestedValueOptions {
  obj: Record<string, any>;
  path: string;
  defaultValue?: any;
}

export const getNestedValue = ({
  obj,
  path,
  defaultValue = undefined,
}: NestedValueOptions): any => {
  if (!obj || typeof obj !== "object" || obj === null) {
    throw new Error("Invalid input object provided.");
  }

  if (!path || typeof path !== "string") {
    throw new Error("Invalid path provided.");
  }

  return (
    path.split(".").reduce((acc, part) => acc && acc[part], obj) || defaultValue
  );
};

export const deepFreeze = (obj: any): any => {
  if (!obj || obj === null) {
    throw new Error("Invalid input object provided.");
  }

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
};

export const toOrdinalSuffix = (num: number): string => {
  numberError(num, "Invalid input number provided.");

  const j = num % 10,
    k = num % 100;
  if (j === 1 && k !== 11) return `${num}st`;
  if (j === 2 && k !== 12) return `${num}nd`;
  if (j === 3 && k !== 13) return `${num}rd`;
  return `${num}th`;
};

export const toCompactNumber = (num: number): string => {
  numberError(num, "Invalid input number provided.");

  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(num);
};

export const toPhoneNumber = (str: string) => {
  stringError(str, "Please provide a valid phone number.");

  return str.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

export const toCreditCardFormat = (value: string | number): string => {
  if (!value || (typeof value !== "string" && typeof value !== "number")) {
    throw new Error("Invalid credit card number provided.");
  }

  if (value.toString().length !== 16) {
    throw new Error("Credit card number must be 16 digits long");
  }

  let str;
  if (typeof value === "number") {
    str = value.toString();
  } else {
    str = value;
  }
  return str.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
};

export const toBinary = (num: number): string => {
  numberError(num, "Please provide a valid number.");
  return num.toString(2);
};

export const toHexadecimal = (num: number): string => {
  numberError(num, "Please provide a valid number.");
  return num.toString(16);
};

export const toOctal = (num: number): string => {
  numberError(num, "Please provide a valid number.");
  return num.toString(8);
};

export const toRoman = (num: number): string => {
  numberError(num, "Please provide a valid number.");

  const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  return map.reduce((result, [value, symbol]) => {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
    return result;
  }, "");
};

export const toCurrencyWords = (
  amount: number,
  currencyCode: string = "USD",
): string => {
  numberError(amount, "Please provide a valid number.");

  stringError(currencyCode, "Please provide a valid currency code.");

  const currency = currencies[currencyCode.toUpperCase()];
  if (!currency) {
    throw new Error(
      `Unsupported currency code: ${currencyCode}. Please provide a valid ISO 4217 currency code.`,
    );
  }

  const { name: currencyName, subunit: subunitName, minorUnit } = currency;

  const convertToWords = (n: number): string => {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

    if (n === 0) return "Zero";

    let words = "";

    for (let i = 0; n > 0; i++) {
      const chunk = n % 1000;
      if (chunk) {
        let chunkWords = "";
        const hundred = Math.floor(chunk / 100);
        const remainder = chunk % 100;
        if (hundred) {
          chunkWords += `${units[hundred]} Hundred `;
        }
        if (remainder < 20 && remainder >= 10) {
          chunkWords += teens[remainder - 10];
        } else {
          const ten = Math.floor(remainder / 10);
          const unit = remainder % 10;
          if (ten) {
            chunkWords += `${tens[ten]} `;
          }
          if (unit) {
            chunkWords += units[unit];
          }
        }
        words = `${chunkWords.trim()} ${thousands[i]} ${words}`.trim();
      }
      n = Math.floor(n / 1000);
    }

    return words;
  };

  const wholePart = Math.floor(amount);
  const fractionPart = Math.round(
    (amount - wholePart) * Math.pow(10, minorUnit),
  );

  const wholePartWords = convertToWords(wholePart);
  const fractionPartWords = convertToWords(fractionPart);

  return `${wholePartWords} ${currencyName}${
    wholePart !== 1 ? "s" : ""
  } and ${fractionPartWords} ${subunitName}${fractionPart > 1 ? "s" : ""}`;
};

export const longestWord = (sentence: string): string => {
  stringError(sentence, "Please provide a valid sentence.");

  return sentence
    .split(" ")
    .reduce(
      (longest, word) => (word.length > longest.length ? word : longest),
      "",
    );
};

export const numberToWords = (num: number): string => {
  numberError(num, "Please provide a valid number.");

  const units = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const scales = ["", "thousand", "million", "billion", "trillion"];

  if (num < 10) return units[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return tens[ten] + (unit !== 0 ? `-${units[unit]}` : "");
  }
  if (num < 1000) {
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    return (
      units[hundred] +
      " hundred" +
      (remainder !== 0 ? ` ${numberToWords(remainder)}` : "")
    );
  }

  const groups: number[] = [];
  let current = num;
  while (current > 0) {
    groups.push(current % 1000);
    current = Math.floor(current / 1000);
  }

  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];
    if (group === 0) continue;
    const part = numberToWords(group) + (scales[i] ? ` ${scales[i]}` : "");
    parts.push(part);
  }

  return parts.join(" ");
};
