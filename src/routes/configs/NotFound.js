import NotFound from 'COMPONENTS/views/NotFound';
import { NOT_FOUND } from 'CONSTANTS/routePaths';

const ROUTE = {
  path: NOT_FOUND,
  view: NotFound,
};

if( process.env.IS_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/app').default;
}

export default {
  get: [ ROUTE ],
};
