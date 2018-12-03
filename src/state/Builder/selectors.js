import { NAME } from './constants';

const getCurrentTileName = (state) => state[NAME].currentTile.name;
const getCurrentTilePath = (state) => state[NAME].currentTile.path;
const getLayerName = (state) => state[NAME].currentLayer.name;
const getLayers = (state) => state[NAME].layers;
const getLayerThumbs = (state) => state[NAME].layerThumbs;
const getProject = (state) => state[NAME].project;
const getProjects = (state) => state[NAME].projects;
const getTiles = (state) => state[NAME].tiles;

export {
  getCurrentTileName,
  getCurrentTilePath,
  getLayerName,
  getLayers,
  getLayerThumbs,
  getProject,
  getProjects,
  getTiles,
};
