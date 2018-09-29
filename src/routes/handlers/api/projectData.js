import logger, {
  BLACK_ON_RED,
} from 'UTILS/logger';
import readProjectData from 'UTILS/readProjectData';

export default (req, res) => {
  const { uid: projectFolder } = req.query;

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
    readProjectData(projectFolder)
      .then(({ name, tiles, uid }) => {
        res.send({
          name,
          tiles,
          uid,
        });
      })
      .catch((err) => {
        logger(
          `${ BLACK_ON_RED } ERROR`,
          "Couldn't read project data because:",
          err.message,
        );
        res.status(500);
        res.send(err.message);
      });
  }
};
