import { LOCAL_STORAGE } from 'CONSTANTS/misc';

export const add = (prop, val) => {
  const data = JSON.parse( window.localStorage.getItem(LOCAL_STORAGE) ) || {};
  data[prop] = val;
  window.localStorage.setItem(LOCAL_STORAGE, JSON.stringify(data));
};

export const get = (prop) => {
  const data = JSON.parse( window.localStorage.getItem(LOCAL_STORAGE) );
  return !prop ? data : data[prop];
};
