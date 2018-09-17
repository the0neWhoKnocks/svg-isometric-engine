import React, { Component } from 'react';
import Tile from './components/Tile';
import styles from './styles';

class TilesBrowser extends Component {
  constructor() {
    super();

    this.state = {
      tiles: [],
    };
    this.handleTilesUpload = this.handleTilesUpload.bind(this);
  }
  
  handleTilesUpload(ev) {
    const files = ev.currentTarget.files;
    const tiles = [];
    
    for(let i=0; i<files.length; i++){
      const currFile = files[i];
      // Only process image files.
      if( !currFile.type.match('image.*') ) continue;

      const reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = ((tile) => {
        return (fileEv) => {
          tiles.push({
            image: fileEv.target.result,
            name: escape(tile.name),
          });
          
          // Once all the tiles have been loaded, update the view
          if(tiles.length === files.length){
            this.setState({
              // TODO filter out duplicates, and maintain order
              tiles: [
                ...this.state.tiles,
                ...tiles,
              ],
            });
          }
        };
      })(currFile);

      // Read in the image file as a data URL.
      reader.readAsDataURL(currFile);
    }
  }

  render() {
    const { tiles } = this.state;

    return (
      <div className={`${ styles.root }`}>
        <nav className={`${ styles.nav }`}>
          <input
            type="file"
            accept="image/*"
            multiple="true"
            onChange={ this.handleTilesUpload }
          />
          <input
            type="file"
            accept="image/*"
            webkitdirectory="true"
            mozdirectory="true"
            onChange={ this.handleTilesUpload }
          />
        </nav>
        <div className={`${ styles.tiles }`}>
          {tiles.map(({ image, name }, ndx) => {
            return (
              <Tile
                key={ name }
                image={ image }
                name={ name }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TilesBrowser;
