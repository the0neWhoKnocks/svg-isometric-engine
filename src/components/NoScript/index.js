import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { node } from 'prop-types';
import styles from './styles';

const NoScript = ({
  children,
}) => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: renderToStaticMarkup(
        <div className={`${ styles.root }`}>
          <span>{ children }</span>
        </div>
      ),
    }}
  />
);

NoScript.propTypes = {
  children: node,
};

export default NoScript;
