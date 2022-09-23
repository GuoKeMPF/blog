const storage = window.sessionStorage;

export const sessionKeys: Record<string, string> = {
  token: 'token',
  username: 'username',
  csrftoken: 'csrftoken',
};

export const setSession = (key: string, value: string): void => {
  storage.setItem(key, JSON.stringify(value));
};

export const getSession = (key: string): string | undefined => {
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

export const clearSession = (): void => storage.clear();
