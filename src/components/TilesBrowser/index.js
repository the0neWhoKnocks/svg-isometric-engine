import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, number, shape, string } from 'prop-types';
import axios from 'axios';
import ProgressIndicator from 'COMPONENTS/ProgressIndicator';
import SvgIcon from 'COMPONENTS/SvgIcon';
import {
  UPLOAD_FILE,
} from 'CONSTANTS/routePaths';
import { updateProjectTiles } from 'STATE/Builder/actions';
import {
  getProject,
  getTiles,
} from 'STATE/Builder/selectors';
import FilePicker from './components/FilePicker';
import Tile from './components/Tile';
import styles from './styles';

const browserProps = (state) => ({
  project: getProject(state),
  tiles: getTiles(state),
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
    };

    this.handleChosenTiles = this.handleChosenTiles.bind(this);
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
    const _ndx = 0;
    const projectId = this.props.project.uid;

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

  render() {
    const {
      project,
      tiles,
    } = this.props;
    const {
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
          <FilePicker
            accept={ FILE_TYPES }
            allowMultiple
            btnLabel={ <SvgIcon name="library_add" /> }
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
          {tiles.map((name, ndx) => {
            return (
              <Tile
                key={ name }
                src={`/projects/${ project.uid }/tiles/${ name }`}
                name={ name }
              />
            );
          })}
        </div>
        <ProgressIndicator { ...progressProps } />
      </div>
    );
  }
}

TilesBrowser.propTypes = {
  project: shape({
    uid: number,
  }),
  tiles: arrayOf(string),
};

export default connect(browserProps)(TilesBrowser);
