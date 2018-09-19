import {
  mkdirp,
  readdirSync,
} from 'fs-extra';
import { paths } from 'ROOT/conf.app';
import routeWrapper from 'UTILS/routeWrapper';

export default routeWrapper.bind(null, (req, res) => {
  const { body: { projectName } } = req;

  mkdirp(`${ paths.PROJECTS }/${ projectName }/tiles`, (err) => {
    if(err){
      res.status(500);
      res.send(err);
    }
    else{
      res.send({
        msg: `Project "${ projectName }" was created`,
        projects: readdirSync(paths.PROJECTS),
      });
    }
  });
});
