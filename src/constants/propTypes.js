import { arrayOf, bool, number, shape, string } from 'prop-types';

export const RAW_LAYER = {
  locked: bool,
  name: string,
  ndx: number,
  thumbnail: string,
  visible: bool,
};
export const LAYER = shape(RAW_LAYER);
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
