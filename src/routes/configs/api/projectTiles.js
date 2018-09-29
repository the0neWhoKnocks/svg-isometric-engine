import { PROJECT_TILES } from 'CONSTANTS/routePaths';

const ROUTE = {
  exact: true,
  path: PROJECT_TILES,
};

if( ON_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/api/projectTiles').default;
}

export default {
  put: [ ROUTE ],
};
