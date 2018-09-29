import { readJson } from 'fs-extra';
import { PROJECT_FILE } from 'CONSTANTS/misc';
import { paths } from 'ROOT/conf.app';
import logger, {
  BLACK_ON_RED,
} from 'UTILS/logger';

export default (projectFolder) => {
  return new Promise((resolve, reject) => {
    readJson(`${ paths.PROJECTS }/${ projectFolder }/${ PROJECT_FILE }`, (err, json) => {
      if(err){
        logger(
          `${ BLACK_ON_RED } ERROR`,
          "Couldn't read project data because:",
          err.message,
        );
        reject(err);
      }
      else resolve(json);
    });
  });
};
