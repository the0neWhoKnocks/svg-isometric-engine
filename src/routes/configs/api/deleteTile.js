import { DELETE_TILE } from 'CONSTANTS/routePaths';

const ROUTE = {
  exact: true,
  path: DELETE_TILE,
};

if( ON_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/api/deleteTile').default;
}

export default {
  del: [ ROUTE ],
};
