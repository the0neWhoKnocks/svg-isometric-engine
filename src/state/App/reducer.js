import genCacheKey from 'UTILS/genCacheKey';
import {
  BLUE,
} from 'UTILS/logger';
import reducerLogger from 'UTILS/reducerLogger';
import { initialState } from './constants';
import {
  SET_PREVIOUS_VIEW,
  SET_SHELL_CLASS,
  SET_SCROLL_POS,
  SET_VIEW_DATA,
} from './actionTypes';

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch( type ){
    case SET_PREVIOUS_VIEW: {
      reducerLogger(type, [
        'previous view to:', `${ BLUE } "${ payload }"`,
      ]);
      return {
        ...state,
        previousView: payload,
      };
    }

    case SET_SHELL_CLASS: {
      reducerLogger(type, [
        'Shell class to:', `${ BLUE } "${ payload }"`,
      ]);
      return {
        ...state,
        shellClass: payload,
      };
    }

    case SET_SCROLL_POS: {
      const { pos, uid } = payload;

      if(uid){
        reducerLogger(type, [
          'Scroll position for', `${ BLUE } "${ uid }"` ,'to:', `${ BLUE } ${ pos }`,
        ]);
        return {
          ...state,
          scrollPos: {
            ...state.scrollPos,
            [uid]: pos,
          },
        };
      }

      return state;
    }

    case SET_VIEW_DATA: {
      const { data, reqOpts } = payload;
      // fake a caching structure for data
      const uniqueKey = genCacheKey(reqOpts);

      if(state.viewData[uniqueKey]) return state;
      else{
        const newState = { ...state };
        newState.viewData[uniqueKey] = data;
        reducerLogger(type, [
          'unique key for:', `${ BLUE } "${ uniqueKey }"`,
        ]);
        return newState;
      }
    }

    default: return { ...state };
  }
};
