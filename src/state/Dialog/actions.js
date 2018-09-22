import store from 'STATE/store';
import sanitizeJsxForState from 'UTILS/sanitizeJsxForState';
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
  const transformedProps = { ...dialogProps };
  transformedProps.children = sanitizeJsxForState(transformedProps.children);

  store.app.dispatch({
    type: OPEN_MODAL,
    payload: {
      modal: true,
      opened: true,
      ...transformedProps,
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
