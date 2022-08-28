const storage = window.sessionStorage;

export const set = (key: string, value: string): void => {
  storage.setItem(key, JSON.stringify(value));
};

export const get = (key: string): string | undefined => {
  const value = storage.getItem(key);
  try {
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(error);
  }
  return;
};

export const clear = (): void => storage.clear();
