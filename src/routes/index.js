import buildRoutes from 'UTILS/buildRoutes';
import orderRoutes from 'UTILS/orderRoutes';

// NOTE - Routes can be set up statically here, or dynamically via the mechanism
// set-up below.
let routes = {
  get: {
    FAVICON: {
      exact: true,
      path: '/favicon.ico',
      handler: (req, res) => res.sendStatus(204),
    },
  },
  post: {},
  put: {},
};

// Dynamically set up all routes
const CONFIGS_DIR = './configs';

if( ON_CLIENT ){
  // NOTE - WP does a static analysis of all `require.context` calls so the
  // configs path has to be hard-coded here.
  const configs = require.context('./configs', false, /\.js$/);

  configs.keys().forEach(confName => {
    const conf = configs(confName).default;
    buildRoutes(conf, confName, routes);
  });
}
else{
  const { resolve } = require('path');

  require('glob').sync('**/*.js', {
    cwd: resolve(__dirname, CONFIGS_DIR),
  })
    .forEach((confName) => {
      const conf = require(`${ CONFIGS_DIR }/${ confName }`).default;
      buildRoutes(conf, confName, routes);
    });
}

routes = orderRoutes(routes);

const {
  get,
  post,
  put,
} = routes;
const CLIENT_ROUTES = Object.keys(get).map((key) => get[key]);
export {
  CLIENT_ROUTES,
  get,
  post,
  put,
};
