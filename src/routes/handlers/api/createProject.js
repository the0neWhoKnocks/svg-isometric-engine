import {
  mkdirp,
} from 'fs-extra';
import { paths } from 'ROOT/conf.app';
import logger, {
  BLACK_ON_GREEN,
  BLACK_ON_RED,
  BLUE,
  BLUE_END,
  BLUE_START,
} from 'UTILS/logger';
import routeWrapper from 'UTILS/routeWrapper';

export default routeWrapper.bind(null, (req, res) => {
  const { body: { projectName } } = req;
  const folderName = Date.now();
  const PROJECT_PATH = `${ paths.PROJECTS }/${ folderName }`;

  mkdirp(`${ PROJECT_PATH }/tiles`, (err) => {
    if(err){
      logger(
        `${ BLACK_ON_RED } ERROR`,
        "Couldn't create projects directory because:",
        err.message,
      );
      res.status(500);
      res.send(err);
    }
    else{
      const getProjectsList = require('UTILS/getProjectsList').default;
      const writeProjectData = require('UTILS/writeProjectData').default;
      const projFile = {
        name: projectName,
        uid: folderName,
      };

      writeProjectData(folderName, projFile)
        .then(async () => {
          logger(
            `${ BLACK_ON_GREEN } CREATED`,
            `Project ${ BLUE_START } "${ projectName }" ${ BLUE_END } | Path:`,
            `${ BLUE } "${ PROJECT_PATH }"`,
          );
          res.send({
            msg: `Project "${ projectName }" was created`,
            project: projFile,
            projects: await getProjectsList(),
          });
        })
        .catch((err) => {
          logger(
            `${ BLACK_ON_RED } ERROR`,
            "Couldn't create projec file because:",
            err.message,
          );
          res.status(500);
          res.send(err);
        });
    }
  });
});
