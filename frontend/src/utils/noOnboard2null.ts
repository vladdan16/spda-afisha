export function noOnboard2null<T>(fetchData: () => Promise<T>) {
  return async () => {
    // NOTE: now considering any error as no onboarding for simplicity
    // TODO: distinguish exactly if the error is indicating no onboarding
    try {
      return await fetchData();
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}
