import { outputJson } from 'fs-extra';
import {
  PROJECT_FILE,
  PROJECT_TEMPLATE,
} from 'CONSTANTS/misc';
import { paths } from 'ROOT/conf.app';
import logger, {
  BLACK_ON_RED,
} from 'UTILS/logger';

export default (projectFolder, data) => {
  return new Promise((resolve, reject) => {
    const projFile = {
      ...PROJECT_TEMPLATE,
      ...data,
    };

    outputJson(`${ paths.PROJECTS }/${ projectFolder }/${ PROJECT_FILE }`, projFile, {
      spaces: 2,
    }, (err, json) => {
      if(err){
        logger(
          `${ BLACK_ON_RED } ERROR`,
          "Couldn't write project data because:",
          err.message,
        );
        reject(err);
      }
      else resolve(json);
    });
  });
};
