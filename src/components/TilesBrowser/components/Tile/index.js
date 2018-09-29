import React from 'react';
import { string } from 'prop-types';

const Tile = ({
  name,
  src,
}) => {
  return (
    <div>
      <div>{ name }</div>
      <img src={ src } />
    </div>
  );
};

Tile.propTypes = {
  name: string,
  src: string,
};

export default Tile;
