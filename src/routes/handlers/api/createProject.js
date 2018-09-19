import {
  mkdirp,
  readdirSync,
} from 'fs-extra';
import { paths } from 'ROOT/conf.app';
import logger, {
  BLACK_ON_GREEN,
  BLACK_ON_RED,
  BLUE,
} from 'UTILS/logger';
import routeWrapper from 'UTILS/routeWrapper';

export default routeWrapper.bind(null, (req, res) => {
  const { body: { projectName } } = req;

  mkdirp(`${ paths.PROJECTS }/${ projectName }/tiles`, (err) => {
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
      logger(
        `${ BLACK_ON_GREEN } CREATED`,
        'The first project:',
        `${ BLUE } "${ paths.PROJECTS }/${ projectName }"`,
      );
      res.send({
        msg: `Project "${ projectName }" was created`,
        projects: readdirSync(paths.PROJECTS),
      });
    }
  });
});
