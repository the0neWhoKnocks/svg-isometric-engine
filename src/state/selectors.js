const getNextPage = (state) => state.nextPage;
const getPreviousView = (state) => state.previousView;
const getProjects = (state) => state.projects;
const getShellClass = (state) => state.shellClass;
const getScrollPos = (state, uid) => state.scrollPos[uid];
const getViewData = (state, key) => state.viewData[key];

export {
  getNextPage,
  getPreviousView,
  getProjects,
  getShellClass,
  getScrollPos,
  getViewData,
};
