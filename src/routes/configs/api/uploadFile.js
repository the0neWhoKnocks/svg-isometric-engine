import { UPLOAD_FILE } from 'CONSTANTS/routePaths';

const ROUTE = {
  exact: true,
  path: UPLOAD_FILE,
};

if( ON_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/api/uploadFile').default;
}

export default {
  put: [ ROUTE ],
};
