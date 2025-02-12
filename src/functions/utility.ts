export function debounce(func: Function, delay: number): Function {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle(func: Function, limit: number): Function {
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
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry(
  func: Function,
  retries: number,
  delay: number,
): Promise<any> {
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
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Timeout"), ms);
    func().then(resolve, reject);
  });
}

export function pipe(...funcs: Function[]): Function {
  return (value: any) => funcs.reduce((acc, func) => func(acc), value);
}

export function compose(...funcs: Function[]): Function {
  return pipe(...funcs.reverse());
}

export function once(func: Function): Function {
  let called = false;
  return (...args: any[]) => {
    if (called) {
      return;
    }
    called = true;
    return func(...args);
  };
}
