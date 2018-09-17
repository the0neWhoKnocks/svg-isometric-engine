import React from 'react';
import { string } from 'prop-types';

const Tile = ({ image, name }) => {
  return (
    <div>
      <div>{ name }</div>
      <img src={ image } />
    </div>
  );
};

Tile.propTypes = {
  image: string,
  name: string,
};

export default Tile;