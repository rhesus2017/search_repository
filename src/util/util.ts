export const getStorage = (key: string): string =>
  JSON.parse(window.localStorage.getItem(key) || "");

export const setStorage = (key: string, value: string) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const formatNumber = (number: string) => {
  const reg = /(^[+-]?\d+)(\d{3})/;
  while (reg.test(number)) number = number.replace(reg, "$1,$2");
  return number;
};
