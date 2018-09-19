import React, { Component } from 'react';
import SvgIcon from 'COMPONENTS/SvgIcon';
import FilePicker from './components/FilePicker';
import Tile from './components/Tile';
import styles from './styles';

const FILE_TYPES = 'image/*';
class TilesBrowser extends Component {
  constructor() {
    super();

    this.state = {
      tiles: [],
    };
    this.handleChosenTiles = this.handleChosenTiles.bind(this);
  }

  handleChosenTiles(files) {
    const tiles = [];

    files.forEach((currFile) => {
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
    });
  }

  render() {
    const { tiles } = this.state;

    return (
      <div className={`tiles-browser ${ styles.root }`}>
        <nav className={`tiles-browser__nav ${ styles.nav }`}>
          <FilePicker
            accept={ FILE_TYPES }
            allowMultiple
            btnLabel={ <SvgIcon name="add_to_photos" /> }
            btnTooltip="Load tile(s)"
            className="nav-btn"
            onFilesChosen={ this.handleChosenTiles }
          />
          <FilePicker
            accept={ FILE_TYPES }
            allowDirectory
            btnLabel={ <SvgIcon name="create_new_folder" /> }
            btnTooltip="Load folder of tiles"
            className="nav-btn"
            onFilesChosen={ this.handleChosenTiles }
          />
        </nav>
        <div className={`tiles-browser__tiles ${ styles.tiles }`}>
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
