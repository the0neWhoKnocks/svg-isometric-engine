import { PROJECT } from 'CONSTANTS/queryParams';
import { add as saveData } from 'UTILS/storage';
import setParam from 'UTILS/setParam';
import {
  CLEAR_DIALOG_ERROR,
  SET_DIALOG_ERROR,
  SET_PREVIOUS_VIEW,
  SET_PROJECT,
  SET_PROJECTS,
  SET_SHELL_CLASS,
  SET_SCROLL_POS,
  SET_VIEW_DATA,
} from './actionTypes';
import store from './store';

const clearDialogError = () => ({
  type: CLEAR_DIALOG_ERROR,
});

const createProject = opts => {
  const axios = require('axios');
  const { body, method, url } = opts;
  const { dispatch } = store.app;

  axios[method](url, body)
    .then((resp) => {
      const { data: { projects } } = resp;
      const currProject = projects[0];
      
      dispatch( clearDialogError() );
      dispatch( setProjects(projects) );
      dispatch( setProject(currProject) );
      
      saveData('project', currProject);
      setParam(PROJECT, currProject);
    })
    .catch((err) => {
      const { data, status, statusText } = err.response;
      dispatch(setDialogError({
        data,
        status,
        statusText,
      }));
    });
};

const setDialogError = err => ({
  type: SET_DIALOG_ERROR,
  payload: err,
});

const setProject = project => ({
  type: SET_PROJECT,
  payload: project,
});

const setProjects = projects => ({
  type: SET_PROJECTS,
  payload: projects,
});

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
  clearDialogError,
  createProject,
  setDialogError,
  setPreviousView,
  setProject,
  setProjects,
  setShellClass,
  setScrollPos,
  setViewData,
};
