const getNextPage = (state) => state.nextPage;
const getPreviousView = (state) => state.previousView;
const getShellClass = (state) => state.shellClass;
const getScrollPos = (state, uid) => state.scrollPos[uid];
const getViewData = (state, key) => state.viewData[key];

export {
  getNextPage,
  getPreviousView,
  getShellClass,
  getScrollPos,
  getViewData,
};
