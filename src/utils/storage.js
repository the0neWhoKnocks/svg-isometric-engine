import { LOCAL_STORAGE } from 'CONSTANTS/misc';

const getData = () => JSON.parse( window.localStorage.getItem(LOCAL_STORAGE) ) || {};

export const add = (prop, val) => {
  const data = getData();
  data[prop] = val;
  window.localStorage.setItem(LOCAL_STORAGE, JSON.stringify(data));
};

export const get = (prop) => {
  const data = getData();
  return !prop ? data : data[prop];
};
