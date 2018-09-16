import { NAME } from './constants';

const namespace = `App/${ NAME }`;
const SET_PREVIOUS_VIEW = `${ namespace }/SET_PREVIOUS_VIEW`;
const SET_SHELL_CLASS = `${ namespace }/SET_SHELL_CLASS`;
const SET_SCROLL_POS = `${ namespace }/SET_SCROLL_POS`;
const SET_VIEW_DATA = `${ namespace }/SET_VIEW_DATA`;

export {
  SET_PREVIOUS_VIEW,
  SET_SHELL_CLASS,
  SET_SCROLL_POS,
  SET_VIEW_DATA,
};
