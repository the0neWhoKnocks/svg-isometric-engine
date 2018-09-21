import { NAME } from './constants';

const getProject = (state) => state[NAME].project;
const getProjects = (state) => state[NAME].projects;

export {
  getProject,
  getProjects,
};
