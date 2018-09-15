import React from 'react';
// import { arrayOf, string } from 'prop-types';
import styles, { globals as globalStyles } from './styles';

const Builder = () => {
  globalStyles();
  // 
  // if(!data.length) return null;

  return (
    <div className={`${ styles.root }`}>
      <h1>Builder</h1>
      
    </div>
  );
};

// Builder.propTypes = {
// 
// };
// Builder.defaultProps = {
// 
// };

export default Builder;
