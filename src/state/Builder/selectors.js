import { NAME } from './constants';

const getLayers = (state) => state[NAME].layers;
const getProject = (state) => state[NAME].project;
const getProjects = (state) => state[NAME].projects;
const getTiles = (state) => state[NAME].tiles;

export {
  getLayers,
  getProject,
  getProjects,
  getTiles,
};
