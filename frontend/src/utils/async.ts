export function delay<T>(value: T, ms: number = 100): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}
