import getProjectsList from 'UTILS/getProjectsList';

export default async (req, res) => {
  console.log(await getProjectsList());
  res.send({
    projects: await getProjectsList(),
  });
};
