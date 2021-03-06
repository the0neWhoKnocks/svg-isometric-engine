import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { arrayOf, func, number, string } from 'prop-types';
import axios from 'axios';
import ProgressIndicator from 'COMPONENTS/ProgressIndicator';
import SvgIcon from 'COMPONENTS/SvgIcon';
import {
  UPLOAD_FILE,
} from 'CONSTANTS/routePaths';
import {
  deleteTile,
  updateProjectTiles,
} from 'STATE/Builder/actions';
import {
  getTiles,
  getTilesPath,
} from 'STATE/Builder/selectors';
import FilePicker from './components/FilePicker';
import Tile from './components/Tile';
import styles, {
  DELETE_DURATION,
} from './styles';

const browserProps = (state) => ({
  tiles: getTiles(state),
  tilesPath: getTilesPath(state),
});

const FILE_TYPES = 'image/*';
class TilesBrowser extends Component {
  constructor() {
    super();

    this.defaultProgress = {
      progressMessage: '',
      showProgress: false,
      uploadProgress: 0,
    };
    this.state = {
      ...this.defaultProgress,
      beingDeleted: undefined,
    };

    this.handleChosenTiles = this.handleChosenTiles.bind(this);
    this.handleTileSelect = this.handleTileSelect.bind(this);
    this.handleTileDelete = this.handleTileDelete.bind(this);
    this.handleTileDeletion = this.handleTileDeletion.bind(this);
  }

  uploadFile(file, projectId) {
    const data = new FormData();
    data.append('fileName', file.name);
    data.append('projectId', projectId);
    data.append('file', file);

    return axios.put(UPLOAD_FILE, data, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        console.log('Upload progress:', percentCompleted);
      },
    });
  }

  uploadFiles(files) {
    const {
      projectId,
    } = this.props;
    const _ndx = 0;

    const upload = (ndx) => {
      const file = files[ndx];

      this.setState({
        progressMessage: file.name,
        uploadProgress: ((ndx+1) / files.length) * 100,
      });

      this.uploadFile(file, projectId)
        .then((resp) => {
          ndx++;
          if(ndx < files.length){
            upload(ndx);
          }
          else{
            // update tiles after uploads have completed, otherwise image calls
            // will go out which can slow down uploads if not on an http2 server.
            updateProjectTiles(resp.data.files);
            console.log('done uploading files');
            this.setState({
              ...this.defaultProgress,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    this.setState({
      showProgress: true,
    });
    upload(_ndx);
  }

  handleChosenTiles(files) {
    this.uploadFiles(files);
  }

  handleTileDelete() {
    const {
      currentTile,
      onTileSelect,
    } = this.props;

    this.setState({
      beingDeleted: currentTile,
    }, () => {
      onTileSelect(undefined);
      deleteTile(this.state.beingDeleted);
    });
  }

  handleTileDeletion() {
    this.setState({
      beingDeleted: undefined,
    });
  }

  handleTileSelect(ev) {
    const {
      currentTile,
      onTileSelect,
    } = this.props;
    const el = ev.currentTarget;
    const tileName = el.value;
    let tile = tileName;

    // allows for de-selecting a currently selected tile
    if(currentTile === tile) tile = undefined;

    onTileSelect(tile);
  }

  render() {
    const {
      currentTile,
      tiles,
      tilesPath,
    } = this.props;
    const {
      beingDeleted,
      progressMessage,
      showProgress,
      uploadProgress,
    } = this.state;
    const progressProps = {
      message: progressMessage,
      overlay: true,
      value: uploadProgress,
      visible: showProgress,
    };

    return (
      <div className={`tiles-browser ${ styles.root }`}>
        <nav className={`tiles-browser__nav ${ styles.nav }`}>
          <div className={`tiles-browser__nav-items ${ styles.navItems }`}>
            <FilePicker
              accept={ FILE_TYPES }
              allowMultiple
              btnClass="nav-btn"
              btnLabel={ <SvgIcon name="library_add" /> }
              btnTooltip="Load tile(s)"
              className="nav-item"
              onFilesChosen={ this.handleChosenTiles }
            />
            <FilePicker
              accept={ FILE_TYPES }
              allowDirectory
              btnClass="nav-btn"
              btnLabel={ <SvgIcon name="create_new_folder" /> }
              btnTooltip="Load folder of tiles"
              className="nav-item"
              onFilesChosen={ this.handleChosenTiles }
            />
            <div className="nav-item is--filler" />
            <button
              className="nav-item nav-btn"
              title="Delete tile"
              disabled={ !currentTile }
              onClick={ this.handleTileDelete }
            >
              <SvgIcon
                className="delete-icon"
                name="delete_forever"
              />
            </button>
          </div>
        </nav>
        <TransitionGroup
          className={`tiles-browser__tiles ${ styles.tiles }`}
        >
          {tiles.map((name, ndx) => (
            <CSSTransition
              key={ name }
              timeout={ DELETE_DURATION }
              classNames={{
                exit: 'delete--started',
                exitActive: 'is--deleting',
                exitDone: 'has--deleted',
              }}
              onExited={ this.handleTileDeletion }
            >
              <Tile
                current={ name === currentTile || name === beingDeleted }
                name={ name }
                onSelect={ this.handleTileSelect }
                src={ `${ tilesPath }/${ name }` }
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
        <ProgressIndicator { ...progressProps } />
      </div>
    );
  }
}

TilesBrowser.propTypes = {
  currentTile: string,
  onTileSelect: func,
  projectId: number,
  tiles: arrayOf(string),
  tilesPath: string,
};

export default connect(browserProps)(TilesBrowser);
