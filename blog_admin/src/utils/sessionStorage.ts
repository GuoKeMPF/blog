const storage = window.sessionStorage;

export const set = (key: string, value: string): void => {
  storage.setItem(key, JSON.stringify(value));
};

export const get = (key: string): string | undefined => {
  const value = storage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return;
};

export const clear = (): void => storage.clear();
