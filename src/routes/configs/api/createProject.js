import { CREATE_PROJECT } from 'CONSTANTS/routePaths';

const ROUTE = {
  exact: true,
  path: CREATE_PROJECT,
};

if( ON_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/api/createProject').default;
}

export default {
  post: [ ROUTE ],
};
