import { readJson } from 'fs-extra';
import { PROJECT_FILE } from 'CONSTANTS/misc';
import { paths } from 'ROOT/conf.app';

export default (projectFolder) => {
  return new Promise((resolve, reject) => {
    readJson(`${ paths.PROJECTS }/${ projectFolder }/${ PROJECT_FILE }`, (err, json) => {
      if(err) reject(err);
      else resolve(json);
    });
  });
};
