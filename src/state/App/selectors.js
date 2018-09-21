import { NAME } from './constants';

const getNextPage = (state) => state[NAME].nextPage;
const getPreviousView = (state) => state[NAME].previousView;
const getShellClass = (state) => state[NAME].shellClass;
const getScrollPos = (state, uid) => state[NAME].scrollPos[uid];
const getViewData = (state, key) => state[NAME].viewData[key];

export {
  getNextPage,
  getPreviousView,
  getShellClass,
  getScrollPos,
  getViewData,
};
