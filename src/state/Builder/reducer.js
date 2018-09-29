import {
  BLUE,
} from 'UTILS/logger';
import reducerLogger from 'UTILS/reducerLogger';
import { initialState } from './constants';
import {
  SET_PROJECT,
  SET_PROJECTS,
  SET_TILES,
} from './actionTypes';

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch( type ){
    case SET_PROJECT: {
      reducerLogger(type, [
        'project to:', `${ BLUE } "${ JSON.stringify(payload) }"`,
      ]);
      return {
        ...state,
        project: payload,
      };
    }

    case SET_PROJECTS: {
      reducerLogger(type, [
        'projects to:', `${ BLUE } ${ JSON.stringify(payload) }`,
      ]);
      return {
        ...state,
        projects: payload,
      };
    }

    case SET_TILES: {
      reducerLogger(type, ['tiles']);
      return {
        ...state,
        tiles: [...payload],
      };
    }

    default: return { ...state };
  }
};
