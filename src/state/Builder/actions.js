import {
  PROJECT_DATA,
  PROJECT_TILES,
} from 'CONSTANTS/routePaths';
import { PROJECT } from 'CONSTANTS/queryParams';
import {
  getProject,
} from 'STATE/Builder/selectors';
import {
  close as closeDialog,
  setError as setDialogError,
} from 'STATE/Dialog/actions';
import store from 'STATE/store';
import { add as saveData } from 'UTILS/storage';
import setParam from 'UTILS/setParam';
import {
  SET_PROJECT,
  SET_PROJECTS,
  SET_TILES,
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
      const { data: { name, tiles, uid } } = resp;

      setTiles(tiles);
      setProject({
        name,
        uid,
      });
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

const setTiles = (tiles) => {
  const { dispatch } = store.app;

  dispatch({
    type: SET_TILES,
    payload: tiles,
  });
};

const updateProjectTiles = (tiles) => {
  const axios = require('axios');
  const { getState } = store.app;

  return axios.put(PROJECT_TILES, {
    tiles,
    uid: getProject(getState()).uid,
  })
    .then((resp) => {
      setTiles(tiles);
    })
    .catch((err) => {
      console.error(err);
    });
};

export {
  createProject,
  fetchProject,
  setProject,
  setProjects,
  setTiles,
  updateProjectTiles,
};
