import { PROJECTS_LIST } from 'CONSTANTS/routePaths';

const ROUTE = {
  exact: true,
  path: PROJECTS_LIST,
};

if( ON_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/api/projectsList').default;
}

export default {
  get: [ ROUTE ],
};
