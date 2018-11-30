import { NAME } from './constants';

const getLayerName = (state) => state[NAME].currentLayer.name;
const getLayers = (state) => state[NAME].layers;
const getProject = (state) => state[NAME].project;
const getProjects = (state) => state[NAME].projects;
const getTiles = (state) => state[NAME].tiles;

export {
  getLayerName,
  getLayers,
  getProject,
  getProjects,
  getTiles,
};
