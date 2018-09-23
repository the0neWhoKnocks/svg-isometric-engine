import getProjectsList from 'UTILS/getProjectsList';
import routeWrapper from 'UTILS/routeWrapper';

export default routeWrapper.bind(null, async (req, res) => {
  console.log(await getProjectsList());
  res.send({
    projects: await getProjectsList(),
  });
});
