export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  console.log(data);
  return data ? JSON.parse(data) : null;
};

export const saveLocalStorage = (key, data) => {
  const stringData = JSON.stringify(data);
  return localStorage.setItem(key, stringData);
};
