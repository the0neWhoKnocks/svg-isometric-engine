import store from 'STATE/store';
import {
  CLEAR_ERROR,
  CLOSE,
  OPEN_MODAL,
  SET_ERROR,
} from './actionTypes';

export const clearError = () => {
  store.app.dispatch({
    type: CLEAR_ERROR,
  });
};

export const openModal = (dialogProps) => {
  store.app.dispatch({
    type: OPEN_MODAL,
    payload: {
      modal: true,
      opened: true,
      ...dialogProps,
    },
  });
};

export const close = () => {
  store.app.dispatch({
    type: CLOSE,
  });
};

export const setError = (err) => {
  store.app.dispatch({
    type: SET_ERROR,
    payload: err,
  });
};
