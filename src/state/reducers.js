import { combineReducers } from 'redux';
import { RESET_STATE } from 'CONSTANTS/misc';
import log, {
  BLACK_ON_GREEN,
} from 'UTILS/logger';
import appReducer from './App/reducer';
import { NAME as APP_KEY } from './App/constants';
import builderReducer from './Builder/reducer';
import { NAME as BUILDER_KEY } from './Builder/constants';
import dialogReducer from './Dialog/reducer';
import { NAME as DIALOG_KEY } from './Dialog/constants';

const combinedReducers = combineReducers({
  [APP_KEY]: appReducer,
  [BUILDER_KEY]: builderReducer,
  [DIALOG_KEY]: dialogReducer,
});

const rootReducer = (state, action) => {
  if( action.type === RESET_STATE ){
    log(`${ BLACK_ON_GREEN } RESET`, 'State');
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
