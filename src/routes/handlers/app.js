import { readFileSync } from 'fs';
import { resolve } from 'path';
import glob from 'glob';
import { paths } from 'SRC/../conf.app';
import routeWrapper from 'UTILS/routeWrapper';

let svgSprites = '';
glob.sync('**/*.svg', {
  cwd: resolve(__dirname, `${ paths.DIST_PUBLIC }/svgs`),
}).forEach((fileName) => {
  let svg = readFileSync(`${ paths.DIST_PUBLIC }/svgs/${ fileName }`, 'utf8');
  svg = svg
    .replace(
      '<svg',
      `<symbol id="${ fileName.replace('.svg', '') }"`
    )
    .replace('</svg>', '</symbol>');
  svgSprites += svg;
});
svgSprites = `
<svg style="display:none; position:absolute" width="0" height="0">
  ${ svgSprites }
</svg>
`;

export default routeWrapper.bind(null, (req, res) => {
  const {
    readJsonSync,
    stat,
    statSync,
  } = require('fs-extra');
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const Loadable = require('react-loadable');
  const { getBundles } = require('react-loadable/webpack');
  const { renderStatic } = require('glamor/server');
  const serialize = require('serialize-javascript');
  const ClientShell = require('COMPONENTS/Shell').default;
  const { PROJECT_FILE } = require('CONSTANTS/misc');
  const { PROJECT } = require('CONSTANTS/queryParams');
  const appConfig = require('ROOT/conf.app');
  const { CLIENT_ROUTES } = require('ROUTES');
  const AppShell = require('SERVER/views/AppShell');
  const loadableStats = require('SRC/react-loadable.json');
  const {
    setShellClass,
  } = require('STATE/App/actions');
  const {
    setProject,
    setProjects,
  } = require('STATE/Builder/actions');
  const { default: store } = require('STATE/store');
  const {
    default: log,
    BLACK_ON_GREEN,
    BLACK_ON_YELLOW,
    BLUE_START,
    BLUE_END,
  } = require('UTILS/logger');
  const awaitSSRData = require('UTILS/awaitSSRData').default;
  const getProjectsList = require('UTILS/getProjectsList').default;

  const { dispatch, getState } = store.app;
  const { query } = req;

  const isDev = process.env.NODE_ENV === 'development';

  // if a relative file request makes it here, it's most likely an error
  if( /.*\.(js|css|json|jpg|png|gif)$/.test(req.url) ){
    res.status(404);
    res.send('File not found in catch-all route');
  }

  // ensures the favicon is always current (with every start of the server)
  const faviconModTime = statSync(appConfig.paths.FAVICON).mtimeMs;

  // check for existing projects
  stat(appConfig.paths.PROJECTS, async (err, stat) => {
    let projects;

    if( !err && stat.isDirectory() ){
      projects = await getProjectsList();
    }

    awaitSSRData(
      req.url,
      req.params,
      CLIENT_ROUTES,
    ).then(() => {
      dispatch( setShellClass({ pathname: req.path }) );
      if(projects) setProjects(projects);
      // Account for users entering random queries by ensuring project folder exists
      const projectParam = query[PROJECT];
      try {
        const PROJECT_PATH = `${ appConfig.paths.PROJECTS }/${ projectParam }`;

        if(
          projectParam
          && statSync(PROJECT_PATH).isDirectory()
        ){
          const projectData = readJsonSync(`${ PROJECT_PATH }/${ PROJECT_FILE }`);
          setProject(projectData);
        }
      }catch(err){ /* I don't care about stat errors */ }

      let modules = [];
      const captureSSRChunks = (moduleName) => modules.push(moduleName);

      // The `context` object contains the results of the render.
      // `context.url` will contain the URL to redirect to if a <Redirect> was used.
      const context = {};
      let { html, css, ids } = renderStatic(() =>
        renderToString(
          <Loadable.Capture report={captureSSRChunks}>
            <ClientShell
              context={ context }
              request={ req }
            />
          </Loadable.Capture>
        )
      );
      let ssrChunks = getBundles(loadableStats, modules);

      if( context.url ){
        res.redirect(302, context.url);
      }
      else{
        if(ssrChunks.length){
          const chunkNames = ssrChunks
            .filter((chunk) => !chunk.file.endsWith('.map'))
            .map((chunk) => `\n  - ${ BLUE_START } ${ chunk.file } ${ BLUE_END }`);
          log(`${ BLACK_ON_GREEN } CHUNKS`, 'Will be pre-loaded on the Client:', chunkNames.join(''));
        }
        else{
          log(`${ BLACK_ON_YELLOW } WARNING`, 'No SSR chunks were detected, this may be an error');
        }

        res.send(AppShell({
          body: html,
          css,
          dev: isDev,
          faviconModTime,
          glamor: { ids },
          ssrChunks,
          state: serialize( getState() ),
          svgSprites,
          title: appConfig.APP_TITLE,
        }));
      }
    });
  });
});
