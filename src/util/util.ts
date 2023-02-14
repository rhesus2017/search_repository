export const getStorage = (key: string) => {
  const result = window.localStorage.getItem(key)

  if ( result ) JSON.parse(result); 
  else throw Error('스토리지에 해당 키가 존재하지 않습니다');
}

export const setStorage = (key: string, value: string) =>
  window.localStorage.setItem(key, JSON.stringify(value));
