import { RESET_STATE } from 'CONSTANTS/misc';
import store from 'STATE/store';

/**
 * Ensures the state on the server is reset before the handler processes the
 * request.
 *
 * @param {Object} next - The route callback
 * @param {Object} req - The request
 * @param {Object} res - The response
 */
export default (req, res, next) => {
  // resets all reducer states
  store.app.dispatch({ type: RESET_STATE });
  next();
};
