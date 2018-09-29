import logger, {
  BLACK_ON_RED,
} from 'UTILS/logger';
import routeWrapper from 'UTILS/routeWrapper';

export default routeWrapper.bind(null, async (req, res) => {
  const readProjectData = require('UTILS/readProjectData').default;
  const writeProjectData = require('UTILS/writeProjectData').default;

  const {
    tiles,
    uid: projectFolder,
  } = req.body;

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
    const data = await readProjectData(projectFolder);
    data.tiles = tiles;

    writeProjectData(projectFolder, data)
      .then((project) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        logger(
          `${ BLACK_ON_RED } ERROR`,
          "Couldn't update `tiles` data",
          err.message,
        );
        res.status(500);
        res.send(err.message);
      });
  }
});
