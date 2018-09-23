import { PROJECT } from 'CONSTANTS/queryParams';
import { add as saveData } from 'UTILS/storage';
import setParam from 'UTILS/setParam';
import {
  close as closeDialog,
  setError as setDialogError,
} from 'STATE/Dialog/actions';
import store from 'STATE/store';
import {
  SET_PROJECT,
  SET_PROJECTS,
} from './actionTypes';

const createProject = opts => {
  const axios = require('axios');
  const { body, method, url } = opts;
  const { dispatch } = store.app;

  return axios[method](url, body)
    .then((resp) => {
      const { data: { projects } } = resp;

      closeDialog();
      dispatch( setProjects(projects) );
      setProject(body.projectName);
    })
    .catch((err) => {
      const { data, status, statusText } = err.response;
      setDialogError({
        data,
        status,
        statusText,
      });
    });
};

const setProject = project => {
  const { dispatch } = store.app;

  if(ON_CLIENT){
    saveData('project', project);
    setParam(PROJECT, project);
  }

  return dispatch({
    type: SET_PROJECT,
    payload: project,
  });
};

const setProjects = projects => ({
  type: SET_PROJECTS,
  payload: projects,
});

export {
  createProject,
  setProject,
  setProjects,
};
