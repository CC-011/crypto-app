export const setLocalStorage = (data: string, item: any) => {
  localStorage.setItem(data, item);
};

export const getLocalStorage = (data: string) => {
  return localStorage.getItem(data);
};

// Save an array of objects to localStorage
export const setLocalStorageArray = <T extends object>(
  key: string,
  value: T[]
): void => {
  try {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  } catch (_) {
    return;
  }
};

// Get an array of objects from localStorage
export const getLocalStorageArray = <T extends any>(key: string): T[] => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T[]) : [];
  } catch (_) {
    return [];
  }
};
