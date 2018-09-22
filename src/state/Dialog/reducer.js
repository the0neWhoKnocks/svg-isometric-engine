import reducerLogger from 'UTILS/reducerLogger';
import { initialState } from './constants';
import {
  CLEAR_ERROR,
  CLOSE,
  OPEN_MODAL,
  SET_ERROR,
} from './actionTypes';

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch( type ){
    case CLEAR_ERROR: {
      reducerLogger(type, 'CLEAR', ['Dialog error']);
      return {
        ...state,
        error: undefined,
      };
    }

    case CLOSE: {
      reducerLogger(type, 'CLOSE', ['Dialog']);
      return {
        ...initialState,
      };
    }

    case OPEN_MODAL: {
      reducerLogger(type, 'OPEN', ['Dialog']);
      return {
        ...state,
        ...payload,
      };
    }

    case SET_ERROR: {
      reducerLogger(type, ['Dialog error', JSON.stringify(payload)]);
      return {
        ...state,
        error: payload,
      };
    }

    default: return { ...state };
  }
};
