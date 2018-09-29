import {
  readdir,
  unlink,
} from 'fs-extra';
import { paths } from 'ROOT/conf.app';
import logger, {
  BLACK_ON_GREEN,
  BLACK_ON_RED,
  BLUE_END,
  BLUE_START,
} from 'UTILS/logger';

export default (req, res) => {
  const { projectId, tile } = req.query;
  const TILES_PATH = `${ paths.PROJECTS }/${ projectId }/tiles`;
  const file = `${ TILES_PATH }/${ tile }`;

  unlink(file, (err) => {
    if(err){
      logger(
        `${ BLACK_ON_RED } ERROR`,
        "Couldn't delete file because:",
        err.message,
      );
      res.status(500);
      res.send(err);
    }
    else{
      logger(
        `${ BLACK_ON_GREEN } DELETED`,
        `file ${ BLUE_START } "${ file }" ${ BLUE_END }`,
      );

      readdir(TILES_PATH, async (err, tiles) => {
        if(err) res.sendStatus(500);
        else{
          res.status(200);
          res.send({ tiles });
        }
      });
    }
  });
};
