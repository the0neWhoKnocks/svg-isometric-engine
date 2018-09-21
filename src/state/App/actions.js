import {
  SET_PREVIOUS_VIEW,
  SET_SHELL_CLASS,
  SET_SCROLL_POS,
  SET_VIEW_DATA,
} from './actionTypes';

const setPreviousView = url => ({
  type: SET_PREVIOUS_VIEW,
  payload: url,
});

const setShellClass = loc => {
  // const { pathname } = loc;
  let cssClass = '';

  // if(pathname === ROOT || pathname.includes(ITEM))
  //   cssClass = 'is--ram';
  // else if(pathname !== TERMS)
  //   cssClass = 'is--ipsum';

  return {
    type: SET_SHELL_CLASS,
    payload: cssClass,
  };
};

const setScrollPos = (uid, pos) => ({
  type: SET_SCROLL_POS,
  payload: {
    pos,
    uid,
  },
});

const setViewData = data => ({
  type: SET_VIEW_DATA,
  payload: data,
});

export {
  setPreviousView,
  setShellClass,
  setScrollPos,
  setViewData,
};
