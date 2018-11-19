import logger, {
  BLACK_ON_RED,
} from 'UTILS/logger';
import readProjectData from 'UTILS/readProjectData';
import writeProjectData from 'UTILS/writeProjectData';

const handleProjectReadError = (res) => (err) => {
  logger(
    `${ BLACK_ON_RED } ERROR`,
    "Couldn't read project data because:",
    err.message,
  );
  res.status(500);
  res.send(err.message);
};

const getProjectData = ({ projectFolder, res }) => {
  readProjectData(projectFolder)
    .then(({ name, tiles, uid }) => {
      res.send({
        name,
        tiles,
        uid,
      });
    })
    .catch(handleProjectReadError(res));
};

const saveProjectData = ({ data, projectFolder, res }) => {
  readProjectData(projectFolder)
    .then((projectData) => {
      Object.keys(data).forEach((prop) => {
        const val = data[prop];

        if( typeof val === 'object' ){
          projectData[prop] = {
            ...projectData[prop],
            ...val,
          };
        }
        else{
          projectData[prop] = val;
        }
      });

      writeProjectData(projectFolder, projectData)
        .then(() => res.send(projectData))
        .catch((err) => {
          logger(
            `${ BLACK_ON_RED } ERROR`,
            "Couldn't update `project` data",
            err.message,
          );
          res.status(500);
          res.send(err.message);
        });
    })
    .catch(handleProjectReadError(res));
};

export default (req, res) => {
  const { data, uid: projectFolder } = (Object.keys(req.body).length)
    ? req.body
    : req.query;

  if( !projectFolder ){
    const errMsg = 'No `uid` was provided';
    logger(
      `${ BLACK_ON_RED } ERROR`,
      errMsg,
    );
    res.status(500);
    res.send(errMsg);
  }
  else{
    switch(req.method) {
      case 'PUT':
        saveProjectData({
          data,
          projectFolder,
          res,
        });
        break;

      default:
        getProjectData({
          projectFolder,
          res,
        });
    }
  }
};
