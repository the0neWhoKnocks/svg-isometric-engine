import { NAME } from './constants';

const getProject = (state) => state[NAME].project;
const getProjects = (state) => state[NAME].projects;
const getTiles = (state) => state[NAME].tiles;

export {
  getProject,
  getProjects,
  getTiles,
};
