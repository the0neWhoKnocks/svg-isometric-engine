import { combineReducers } from 'redux';
import appReducer from './App/reducer';
import { NAME as APP_KEY } from './App/constants';
import builderReducer from './Builder/reducer';
import { NAME as BUILDER_KEY } from './Builder/constants';
import dialogReducer from './Dialog/reducer';
import { NAME as DIALOG_KEY } from './Dialog/constants';

export default combineReducers({
  [APP_KEY]: appReducer,
  [BUILDER_KEY]: builderReducer,
  [DIALOG_KEY]: dialogReducer,
});
