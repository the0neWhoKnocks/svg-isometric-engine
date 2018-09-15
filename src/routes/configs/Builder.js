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

if( process.env.IS_SERVER ){
  ROUTE.handler = require('ROUTES/handlers/app').default;
}

export default {
  get: [ ROUTE ],
};
