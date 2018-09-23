import { readdir } from 'fs-extra';
import { paths } from 'ROOT/conf.app';
import readProjectData from 'UTILS/readProjectData';

export default () => {
  return new Promise((resolve, reject) => {
    readdir(paths.PROJECTS, async (err, projects) => {
      if(err){
        reject(err);
      }
      else{
        const list = [];

        for(const projectFolder of projects){
          const { name, uid } = await readProjectData(projectFolder);
          list.push({
            name,
            uid,
          });
        }

        resolve(list);
      }
    });
  });
};
