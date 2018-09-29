import { BUILDER } from 'CONSTANTS/routePaths';
import { Builder } from 'ROUTES/shared/composedChunks';

const ROUTE = {
  exact: true,
  label: 'Builder',
  path: BUILDER,
  view: Builder,
  viewProps: {
    data: {},
  },
};

if( ON_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/app').default;
  ROUTE.middleware = [
    require('ROUTES/middleware/resetState').default,
  ];
}

export default {
  get: [ ROUTE ],
};
