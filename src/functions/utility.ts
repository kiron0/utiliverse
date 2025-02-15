import { functionError, numberError } from "../errors";

export function debounce(func: Function, delay: number): Function {
  functionError(func, "Please provide a valid function.");
  numberError(delay, "Please provide a valid number.");
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle(func: Function, limit: number): Function {
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
}

export function memoize(func: Function): Function {
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
}

export function sleep(ms: number): Promise<void> {
  numberError(ms, "Please provide a valid number.");
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry(
  func: Function,
  retries: number,
  delay: number,
): Promise<any> {
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
}

export function timeout(func: Function, ms: number): Promise<any> {
  functionError(func, "Please provide a valid function.");
  numberError(ms, "Please provide a valid number.");
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Timeout"), ms);
    func().then(resolve, reject);
  });
}

export function pipe(...funcs: Function[]): Function {
  for (const func of funcs) {
    functionError(func, "Please provide a valid function.");
  }
  return (value: any) => funcs.reduce((acc, func) => func(acc), value);
}

export function compose(...funcs: Function[]): Function {
  for (const func of funcs) {
    functionError(func, "Please provide a valid function.");
  }
  return pipe(...funcs.reverse());
}

export function once(func: Function): Function {
  functionError(func, "Please provide a valid function.");
  let called = false;
  return (...args: any[]) => {
    if (called) {
      return;
    }
    called = true;
    return func(...args);
  };
}
