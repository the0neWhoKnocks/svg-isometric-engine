import {
  readdir,
} from 'fs-extra';
import { paths } from 'ROOT/conf.app';
import logger, {
  BLACK_ON_GREEN,
  BLUE_END,
  BLUE_START,
} from 'UTILS/logger';
import routeWrapper from 'UTILS/routeWrapper';

export default routeWrapper.bind(null, (req, res) => {
  const multer = require('multer');
  let UPLOAD_PATH, FILE_NAME;

  const formDataParser = multer({
    // TODO - may need this for chunked data
    // NOTE - axios chunking example https://github.com/axios/axios/blob/master/examples/upload/server.js
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const { body: { projectId } } = req;
        UPLOAD_PATH = `${ paths.PROJECTS }/${ projectId }/tiles`;
        cb(null, UPLOAD_PATH);
      },
      filename: (req, file, cb) => {
        const { body: { fileName } } = req;
        FILE_NAME = fileName;
        cb(null, FILE_NAME);
      },
    }),
  }).any();

  formDataParser(req, res, (err) => {
    if(err) res.sendStatus(500);
    else{
      logger(
        `${ BLACK_ON_GREEN } UPLOADED`,
        `file to ${ BLUE_START } "${ UPLOAD_PATH }/${ FILE_NAME }" ${ BLUE_END }`,
      );

      readdir(UPLOAD_PATH, async (err, files) => {
        if(err) res.sendStatus(500);
        else{
          res.status(200);
          res.send({ files });
        }
      });
    }
  });
});
