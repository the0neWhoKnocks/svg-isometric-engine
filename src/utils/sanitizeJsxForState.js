/**
 * In the cases where a State's property is JSX, and it's required during a
 * SSR, this will convert the JSX to a String that will be safe to be eval'd via
 * Redux hydration on the Client.
 *
 * @param {String|Object} prop - A state property that needs to be sanitized
 * @return {String}
 */
export default (prop) => {
  let ret = prop;

  if(
    ON_SERVER
    && typeof prop === 'object'
    && prop['$$typeof'].toString() === 'Symbol(react.element)'
  ){
    const { renderToStaticMarkup } = require('react-dom/server');
    ret = renderToStaticMarkup(prop);
  }

  return ret;
};
