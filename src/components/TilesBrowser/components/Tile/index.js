import React from 'react';
import { bool, func, string } from 'prop-types';
import styles from './styles';

const Tile = ({
  current,
  name,
  onSelect,
  src,
}) => {
  const sanitizedName = name
    // remove spaces
    .replace(/\s/g, '')
    // remove file extensions
    .replace(/\.[a-z]{3,4}$/i, '');
  const uid = `tile_${ sanitizedName }`;

  return (
    <div className="tile-container">
      <input
        id={ uid }
        type="checkbox"
        className={`${ styles.tileInput }`}
        checked={ current }
        onChange={ onSelect }
        value={ name }
      />
      <label
        className={`tile ${ styles.tile }`}
        htmlFor={ uid }
        title={ name }
      >
        <img src={ src } alt={ name } />
      </label>
    </div>
  );
};

Tile.propTypes = {
  current: bool,
  name: string.isRequired,
  onSelect: func.isRequired,
  src: string.isRequired,
};

export default Tile;
