import { arrayError, functionError, numberError, stringError } from "../errors";
import { adjustKeyLength } from "../utility";

export const debounce = (func: Function, delay: number): Function => {
  functionError(func, "Please provide a valid function.");
  numberError(delay, "Please provide a valid number.");
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = (func: Function, limit: number): Function => {
  functionError(func, "Please provide a valid function.");
  numberError(limit, "Please provide a valid number.");
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const memoize = (func: Function): Function => {
  functionError(func, "Please provide a valid function.");
  const cache = new Map();
  return (value: any) => {
    if (cache.has(value)) {
      return cache.get(value);
    }
    const result = func(value);
    cache.set(value, result);
    return result;
  };
};

export const sleep = (ms: number): Promise<void> => {
  numberError(ms, "Please provide a valid number.");
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retry = async (
  func: Function,
  retries: number,
  delay: number,
): Promise<any> => {
  functionError(func, "Please provide a valid function.");
  numberError(retries, "Please provide a valid number.");
  numberError(delay, "Please provide a valid number.");
  try {
    return await func();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    await sleep(delay);
    return retry(func, retries - 1, delay);
  }
};

export const timeout = (func: Function, ms: number): Promise<any> => {
  functionError(func, "Please provide a valid function.");
  numberError(ms, "Please provide a valid number.");
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Timeout"), ms);
    func().then(resolve, reject);
  });
};

export const pipe = (...funcs: Function[]): Function => {
  for (const func of funcs) {
    functionError(func, "Please provide a valid function.");
  }
  return (value: any) => funcs.reduce((acc, func) => func(acc), value);
};

export const compose = (...funcs: Function[]): Function => {
  for (const func of funcs) {
    functionError(func, "Please provide a valid function.");
  }
  return pipe(...funcs.reverse());
};

export const once = (func: Function): Function => {
  functionError(func, "Please provide a valid function.");
  let called = false;
  return (...args: any[]) => {
    if (called) {
      return;
    }
    called = true;
    return func(...args);
  };
};

export const after = (count: number, func: Function): Function => {
  functionError(func, "Please provide a valid function.");
  numberError(count, "Please provide a valid number.");

  return (...args: any[]) => {
    if (--count < 1) {
      return func(...args);
    }
  };
};

export const before = (count: number, func: Function): Function => {
  functionError(func, "Please provide a valid function.");
  numberError(count, "Please provide a valid number.");
  return (...args: any[]) => {
    if (--count > 0) {
      return func(...args);
    }
  };
};

export const curry = (func: Function): Function => {
  functionError(func, "Please provide a valid function.");
  return function curried(...args: any[]) {
    if (args.length >= func.length) {
      return func(...args);
    }
    return (...more: any[]) => curried(...args, ...more);
  };
};

export const partial = (func: Function, ...args: any[]): Function => {
  functionError(func, "Please provide a valid function.");
  return (...more: any[]) => func(...args, ...more);
};

export const spread = (func: Function): Function => {
  functionError(func, "Please provide a valid function.");
  return (args: any[]) => func(...args);
};

export const negate = (func: Function): Function => {
  functionError(func, "Please provide a valid function.");
  return (...args: any[]) => !func(...args);
};

export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  arrayError(arr1, "Please provide a valid array.");
  arrayError(arr2, "Please provide a valid array.");
  return arr1.filter((value) => arr2.includes(value));
};

export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  arrayError(arr1, "Please provide a valid array.");
  arrayError(arr2, "Please provide a valid array.");
  return arr1.filter((value) => !arr2.includes(value));
};

export const union = <T>(arr1: T[], arr2: T[]): T[] => {
  arrayError(arr1, "Please provide a valid array.");
  arrayError(arr2, "Please provide a valid array.");
  return Array.from(new Set([...arr1, ...arr2]));
};

export const zip = <T, U>(arr1: T[], arr2: U[]): [T, U][] => {
  arrayError(arr1, "Please provide a valid array.");
  arrayError(arr2, "Please provide a valid array.");
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
};

export const toQueryString = (obj: Record<string, any>): string => {
  if (!obj || typeof obj !== "object" || obj === null) {
    throw new Error("Invalid input object provided.");
  }

  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
};

export const parseQueryString = (query: string): Record<string, string> => {
  if (!query) {
    return {};
  }

  return query
    .replace(/^\?/, "")
    .split("&")
    .filter(Boolean)
    .reduce((acc, pair) => {
      const [key, value] = pair.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(value || "");
      return acc;
    }, {} as Record<string, string>);
};

export const buildQueryString = (
  params: Record<string, string | number | boolean>,
): string => {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    throw new Error("Invalid input object provided.");
  }

  const query = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
  return query ? `?${query}` : "";
};

export const encryptString = async (
  plaintext: string,
  key: string,
): Promise<string> => {
  if (!plaintext) {
    return "";
  }

  stringError(key, "Please provide a valid key.");

  const encoder = new TextEncoder();

  const adjustedKey = adjustKeyLength(key, 32);

  const rawKey = encoder.encode(adjustedKey);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-CBC" },
    false,
    ["encrypt"],
  );

  const iv = crypto.getRandomValues(new Uint8Array(16));

  const plaintextData = encoder.encode(plaintext);

  try {
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      plaintextData,
    );

    const encryptedHex = Array.from(new Uint8Array(encryptedData))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    const ivHex = Array.from(iv)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return `${ivHex}:${encryptedHex}`;
  } catch (error) {
    throw new Error("Encryption failed: " + (error as Error).message);
  }
};

export const decryptString = async (
  encryptedValue: string,
  key: string,
): Promise<string> => {
  stringError(encryptedValue, "Please provide a valid encrypted value.");
  stringError(key, "Please provide a valid key.");

  const [ivHex, encrypted] = encryptedValue.split(":");

  if (!ivHex || !encrypted) {
    throw new Error("Invalid encrypted value format.");
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const adjustedKey = adjustKeyLength(key, 32);

  const rawKey = encoder.encode(adjustedKey);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-CBC" },
    false,
    ["decrypt"],
  );

  const iv = new Uint8Array(
    ivHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  );

  const encryptedData = new Uint8Array(
    encrypted.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  );

  try {
    const decryptedData = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      encryptedData,
    );

    return decoder.decode(decryptedData);
  } catch (error) {
    throw new Error("Decryption failed: " + (error as Error).message);
  }
};
