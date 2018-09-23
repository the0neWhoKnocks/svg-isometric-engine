import { PROJECT_DATA } from 'CONSTANTS/routePaths';
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

  return axios[method](url, body)
    .then((resp) => {
      const {
        data: {
          project,
          projects,
        },
      } = resp;

      closeDialog();
      setProjects(projects);
      setProject(project);
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

const fetchProject = (uid) => {
  const axios = require('axios');
  const params = { uid };

  return axios.get(PROJECT_DATA, { params })
    .then((resp) => {
      const { data: { project } } = resp;

      setProject(project);
    })
    .catch((err) => {
      console.error(err);
    });
};

const setProject = (project) => {
  const { dispatch } = store.app;

  if(ON_CLIENT){
    saveData('project', project);
    setParam(PROJECT, project.uid);
  }

  return dispatch({
    type: SET_PROJECT,
    payload: project,
  });
};

const setProjects = (projects) => {
  const { dispatch } = store.app;

  return dispatch({
    type: SET_PROJECTS,
    payload: projects,
  });
};

export {
  createProject,
  fetchProject,
  setProject,
  setProjects,
};
