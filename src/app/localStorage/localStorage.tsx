export const setLocalStorage = (data: string, item: any) => {
  localStorage.setItem(data, item);
};

export const getLocalStorage = (data: string) => {
  return localStorage.getItem(data);
};
