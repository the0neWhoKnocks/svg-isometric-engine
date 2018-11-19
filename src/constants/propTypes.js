import { arrayOf, number, shape, string } from 'prop-types';

export const PROJECT = shape({
  map: shape({
    height: number,
    tileWidth: number,
    width: number,
  }),
  name: string,
  tiles: arrayOf(string),
  uid: number,
});
export const PROJECTS = arrayOf(PROJECT);
