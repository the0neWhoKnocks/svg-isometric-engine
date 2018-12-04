import { NAME } from './constants';

const getCurrentTile = (state) => state[NAME].currentTile;
const getLayerName = (state) => state[NAME].currentLayer.name;
const getLayers = (state) => state[NAME].layers;
const getLayerThumbs = (state) => state[NAME].layerThumbs;
const getProject = (state) => state[NAME].project;
const getProjects = (state) => state[NAME].projects;
const getTiles = (state) => state[NAME].tiles;
const getTilesCache = (state) => state[NAME].tilesCache;
const getTilesPath = (state) => state[NAME].tilesPath;

export {
  getCurrentTile,
  getLayerName,
  getLayers,
  getLayerThumbs,
  getProject,
  getProjects,
  getTiles,
  getTilesCache,
  getTilesPath,
};
