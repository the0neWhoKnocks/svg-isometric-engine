import { arrayOf, number, shape, string } from 'prop-types';

export const PROJECT = shape({
  name: string,
  tiles: arrayOf(string),
  uid: number,
});
export const PROJECTS = arrayOf(PROJECT);
