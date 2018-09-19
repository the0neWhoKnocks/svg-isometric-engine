const getDialogError = (state) => state.dialogError;
const getNextPage = (state) => state.nextPage;
const getPreviousView = (state) => state.previousView;
const getProject = (state) => state.project;
const getProjects = (state) => state.projects;
const getShellClass = (state) => state.shellClass;
const getScrollPos = (state, uid) => state.scrollPos[uid];
const getViewData = (state, key) => state.viewData[key];

export {
  getDialogError,
  getNextPage,
  getPreviousView,
  getProject,
  getProjects,
  getShellClass,
  getScrollPos,
  getViewData,
};
