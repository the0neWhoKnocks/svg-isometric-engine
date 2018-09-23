import { PROJECT_DATA } from 'CONSTANTS/routePaths';

const ROUTE = {
  exact: true,
  path: PROJECT_DATA,
};

if( ON_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/api/projectData').default;
}

export default {
  get: [ ROUTE ],
};
