import { execSync } from 'child_process';
import readline from 'readline';
import 'colors';
import { RESET_STATE } from 'CONSTANTS/misc';
import store from 'STATE/store';
import log, {
  BLACK_ON_GREEN,
  BLUE,
} from 'UTILS/logger';

const getTermWidth = () => execSync('tput cols').toString();

/**
 * Logs out info about the request
 *
 * @param {Object} next - The route callback
 * @param {Object} req - The request
 * @param {Object} res - The response
 */
export default (next, req, res) => {
  const args = [`${ BLACK_ON_GREEN } ROUTE`, 'matched:', `${ BLUE } ${ req.route.path }`];
  // add on params if token was replaced
  if(
    req.route.path !== '*'
    && req._parsedUrl.pathname !== req.route.path
  ) args.push(`\n${ JSON.stringify(req.params, null, 2) }`);

  // prints a line that spans the terminal's width
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  process.stdout.write( '─'.gray.repeat(getTermWidth()) + "\n" ); // eslint-disable-line

  // resets all reducer states
  store.app.dispatch({ type: RESET_STATE });

  log(...args);
  next(req, res);
};
