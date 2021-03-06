import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Layers from 'COMPONENTS/Layers';
import Tabs from 'COMPONENTS/Tabs';
import TilesBrowser from 'COMPONENTS/TilesBrowser';
import {
  LAYER,
  PROJECT,
  PROJECTS,
} from 'CONSTANTS/propTypes';
import {
  fetchProject,
  setCurrentTile,
  saveProject,
  setLayerThumb,
  setTilesCache,
} from 'STATE/Builder/actions';
import {
  getCurrentTile,
  getLayerName,
  getLayers,
  getProject,
  getProjects,
  getTiles,
  getTilesCache,
  getTilesPath,
} from 'STATE/Builder/selectors';
import { get as getData } from 'UTILS/storage';
import MapRenderer from './components/MapRenderer';
import ProjectSelector from './components/ProjectSelector';
import TopNav from './components/TopNav';
import styles, { globals as globalStyles } from './styles';

const builderProps = (state) => ({
  currentTile: getCurrentTile(state),
  layerName: getLayerName(state),
  layers: getLayers(state),
  project: getProject(state),
  projects: getProjects(state),
  tiles: getTiles(state),
  tilesCache: getTilesCache(state),
  tilesPath: getTilesPath(state),
});

const TILE_WIDTH_MIN = 5;
const TILE_WIDTH_MAX = 300;

class Builder extends Component {
  static getDerivedStateFromProps(props, state) {
    const newState = {};

    if(
      props.project && !state.project
      || (
        props.project && state.project
        && props.project.uid !== state.project.uid
      )
    ) {
      newState.builderIsVisible = true;
      newState.project = props.project;
    }

    return (Object.keys(newState).length) ? newState : null;
  }

  static prepTiles(tiles, tilesPath) {
    const _tiles = {};

    return new Promise((resolve, reject) => {
      const loadTile = (ndx) => {
        const tile = tiles[ndx];
        const tileImage = new Image();

        tileImage.addEventListener('load', () => {
          const tileCanvas = document.createElement('canvas');
          const tileCtx = tileCanvas.getContext('2d');
          tileCanvas.width = tileImage.width;
          tileCanvas.height = tileImage.height;
          tileCtx.drawImage(tileImage, 0, 0);
          _tiles[tile] = tileCanvas;

          if((ndx + 1) === tiles.length) resolve(_tiles);
          else loadTile(ndx+1);
        });
        tileImage.src = `${ tilesPath }/${ tile }`;
      };

      loadTile(0);
    });
  }

  constructor(props) {
    super();

    this.els = {};
    this.state = {
      builderCanvasHeight: 0,
      builderCanvasWidth: 0,
      builderIsVisible: false,
      debug: false,
      error: undefined,
      horzPaneSize: '50%',
      mapHeight: props.mapHeight,
      mapWidth: props.mapWidth,
      project: props.project,
      saving: false,
      tileWidth: props.tileWidth,
      tileWidthVal: props.tileWidth,
      vertPaneSize: '75%',
    };

    globalStyles();
    this.handleDebugToggle = this.handleDebugToggle.bind(this);
    this.handleHorizontalResize = this.handleHorizontalResize.bind(this);
    this.handleKeyBindings = this.handleKeyBindings.bind(this);
    this.handleLayerRender = this.handleLayerRender.bind(this);
    this.handleMapSizeChange = this.handleMapSizeChange.bind(this);
    this.handleProjectSave = this.handleProjectSave.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleTileSelect = this.handleTileSelect.bind(this);
    this.handleTileWidthChange = this.handleTileWidthChange.bind(this);
    this.handleUnload = this.handleUnload.bind(this);
    this.handleVerticalResize = this.handleVerticalResize.bind(this);
  }

  componentDidMount() {
    const { projects } = this.props;
    const { project } = this.state;

    if(
      // there are projects to reference
      projects.length
      // a project hasn't already been specified (in the URL)
      && !project
    ){
      const _project = getData('project');

      if(
        // a project was previously chosen
        _project
        // that project exists
        && projects.includes(_project)
      ) fetchProject(_project.uid);
    }

    this.setState({
      builderIsVisible: !!project,
    }, () => {
      const { builderIsVisible } = this.state;

      if(builderIsVisible) this.initBuilder();
    });
    this.mounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if(
      this.state.builderIsVisible
      && ( !prevState.project && this.state.project )
      || (
        prevState.project
        && prevState.project.uid !== this.state.project.uid
      )
    ) this.initBuilder();
  }

  componentWillUnmount() {
    const { builderIsVisible } = this.state;
    this.mounted = false;

    if(builderIsVisible){
      window.removeEventListener('keydown', this.handleKeyBindings);
      window.removeEventListener('beforeunload', this.handleUnload);
      window.removeEventListener('resize', this.handleResize);
    }
  }

  initBuilder() {
    const {
      tiles,
      tilesPath,
    } = this.props;
    const { project } = this.state;
    let mapProps = {};

    if(project){
      const {
        height,
        tileWidth,
        width,
      } = project.map;
      mapProps = {
        mapHeight: height,
        mapWidth: width,
        tileWidth,
        tileWidthVal: tileWidth,
      };
    }

    this.setState({
      ...this.getBuilderPaneDimensions(),
      ...mapProps,
    });

    window.addEventListener('keydown', this.handleKeyBindings);
    window.addEventListener('beforeunload', this.handleUnload);
    window.addEventListener('resize', this.handleResize);

    Builder.prepTiles(tiles, tilesPath).then((cachedTiles) => {
      setTilesCache(cachedTiles);
    });
  }

  /**
   * Ensures the map's canvas fits in the pane
   */
  getBuilderPaneDimensions() {
    const pane = findDOMNode(this.els.builderPane); // eslint-disable-line
    return {
      builderCanvasHeight: pane.clientHeight,
      builderCanvasWidth: pane.clientWidth,
    };
  }
  
  handleDebugToggle(ev) {
    const { debug } = this.state;
    this.setState({ debug: !debug });
  }

  handleLayerRender(ndx, layer) {
    const maxSize = 20;
    let thumbWidth, thumbHeight;

    if(layer.width > layer.height){
      thumbWidth = maxSize;
      thumbHeight = layer.height * (maxSize / layer.width);
    }
    else{
      thumbWidth = layer.width * (maxSize / layer.height);
      thumbHeight = maxSize;
    }

    const thumb = document.createElement('canvas');
    const ctx = thumb.getContext('2d', { alpha: false });
    thumb.width = Math.floor(thumbWidth);
    thumb.height = Math.floor(thumbHeight);
    ctx.drawImage(layer, 0, 0, thumbWidth, thumbHeight);

    setLayerThumb(ndx, thumb.toDataURL());
  }

  handleMapSizeChange(ev) {
    const el = ev.currentTarget;
    const state = (el.name === 'mapWidth')
      ? { mapWidth: +el.value }
      : { mapHeight: +el.value };

    this.setState(state);
  }

  handleHorizontalResize(size) {
    this.handleResize({
      size,
      sizeType: 'horz',
    });
  }

  handleVerticalResize(size) {
    this.handleResize({
      size,
      sizeType: 'vert',
    });
  }

  handleResize(ev = {}) {
    if( this.mounted ){
      if( this.resizeTimeout ) clearTimeout(this.resizeTimeout);
      const _self = this;

      this.resizeTimeout = setTimeout(() => {
        const state = {};

        // update pane state first
        if(ev.sizeType){
          // TODO - possibly record pane sizes so page reloads persist views
          state[`${ ev.sizeType }PaneSize`] = ev.size[0];
          _self.setState(state, _self.handleResize);
        }
        // update child els after
        else{
          _self.setState({
            ...this.getBuilderPaneDimensions(),
          });
        }
      }, 50);
    }
  }

  handleTileSelect(tile) {
    setCurrentTile(tile);
  }

  handleTileWidthChange(ev) {
    const val = +ev.currentTarget.value;
    const state = { tileWidthVal: val };

    this.setState(state, () => {
      if( this.inputTimeout ) clearTimeout(this.inputTimeout);

      this.inputTimeout = setTimeout(() => {
        if( val < TILE_WIDTH_MIN ) state.tileWidthVal = TILE_WIDTH_MIN;
        else if( val > TILE_WIDTH_MAX ) state.tileWidthVal = TILE_WIDTH_MAX;
        state.tileWidth = state.tileWidthVal;

        this.setState(state);
      }, 300);
    });
  }

  handleKeyBindings(ev) {
    switch(ev.which){
      case 83: // s
        if( ev.ctrlKey ){
          ev.preventDefault();
          this.handleProjectSave();
        }
        break;
    }
  }

  handleProjectSave() {
    this.setState({
      error: undefined,
      saving: true,
    }, () => {
      const {
        mapHeight,
        mapWidth,
        tileWidth,
      } = this.state;

      saveProject({
        map: {
          height: mapHeight,
          tileWidth: tileWidth,
          width: mapWidth,
        },
      })
        .then(() => {
          this.setState({
            saving: false,
          });
        })
        .catch((err) => {
          this.setState({
            error: {
              msg: err.message,
              type: 'save',
            },
            saving: false,
          });
        });
    });
  }

  handleUnload(ev) {
    const { project } = this.state;
    let customMsg;

    if(project){
      // TODO - think of a better way to handle this
      const mapObj = {
        height: this.state.mapHeight,
        tileWidth: this.state.tileWidth,
        width: this.state.mapWidth,
      };
      const props = Object.keys(project.map);

      for(let i=0; i<props.length; i++){
        const prop = props[i];
        if(project.map[prop] !== mapObj[prop]){
          customMsg = 'You have unsaved changes';
          ev.returnValue = customMsg;
          break;
        }
      }
    }

    return customMsg;
  }

  render() {
    const {
      builderIsVisible,
    } = this.state;
    const showBuilder = this.mounted && builderIsVisible;
    const showProjectsList = this.mounted && !builderIsVisible;
    let builderContent;

    if(showBuilder){
      const {
        currentTile,
        layerName,
        layers,
        project: { uid },
        tilesCache,
      } = this.props;
      const {
        builderCanvasWidth,
        builderCanvasHeight,
        debug,
        error,
        horzPaneSize,
        mapHeight,
        mapWidth,
        saving,
        tileWidth,
        tileWidthVal,
        vertPaneSize,
      } = this.state;
      let overlayMsg;
      let overlayClass = '';

      if(saving) overlayMsg = 'Saving';
      else if(error) {
        overlayMsg = (
          <Fragment>
            {error.msg}&nbsp;
            <button onClick={this.handleProjectSave}>Try Again</button>
          </Fragment>
        );
        overlayClass += ' is--error';
      }

      if(overlayMsg) overlayClass += ' is--visible';

      builderContent = (
        <Fragment>
          <TopNav
            onSave={this.handleProjectSave}
          />
          <SplitPane
            split="vertical"
            onChange={this.handleVerticalResize}
          >
            <Pane initialSize={vertPaneSize}>
              <SplitPane
                split="horizontal"
                onChange={this.handleHorizontalResize}
              >
                <Pane
                  ref={(ref) => this.els.builderPane = ref}
                  initialSize={horzPaneSize}
                  className="map-pane"
                >
                  <div className={`map-pane__label ${ styles.mapPaneLabel }`}>
                    {`Builder${ (layerName) ? ` | ${ layerName }` : '' }`}
                  </div>
                  <MapRenderer
                    canvasWidth={ builderCanvasWidth }
                    canvasHeight={ builderCanvasHeight }
                    currentTile={ currentTile }
                    debug={ debug }
                    layers={ layers }
                    mapWidth={ mapWidth }
                    mapHeight={ mapHeight }
                    onLayerRender={ this.handleLayerRender }
                    tileWidth={ tileWidth }
                    tilesCache={ tilesCache }
                  />
                  <nav className={`builder-nav ${ styles.builderNav }`}>
                    <label>
                      Debug:&nbsp;
                      <input
                        type="checkbox"
                        value={debug}
                        name="debug"
                        onChange={this.handleDebugToggle}
                      />
                    </label>
                    <label>
                      Map:&nbsp;
                      <input
                        type="number"
                        value={mapWidth}
                        name="mapWidth"
                        onChange={this.handleMapSizeChange}
                      />
                      &nbsp;x&nbsp;
                      <input
                        type="number"
                        value={mapHeight}
                        name="mapHeight"
                        onChange={this.handleMapSizeChange}
                      />
                    </label>
                    <label>
                      Tile Width:
                      <input
                        type="number"
                        value={tileWidthVal}
                        name="tileWidth"
                        onChange={this.handleTileWidthChange}
                        min={TILE_WIDTH_MIN}
                        max={TILE_WIDTH_MAX}
                      />
                    </label>
                  </nav>
                </Pane>
                <Pane className="map-pane">
                  <div className={`map-pane__label ${ styles.mapPaneLabel }`}>
                    Preview
                  </div>
                </Pane>
              </SplitPane>
            </Pane>
            <Pane>
              <div className={`${ styles.rail }`}>
                <nav>
                  <button>Load</button>
                  <button>Save</button>
                  <button>Undo</button>
                  <button>Redo</button>
                </nav>
                <Tabs
                  className={`${ styles.tabs }`}
                  items={[
                    {
                      content: <Layers debug={ debug } />,
                      icon: 'layers',
                      label: 'Layers',
                    },
                    {
                      content: (
                        <TilesBrowser
                          currentTile={ currentTile }
                          onTileSelect={ this.handleTileSelect }
                          projectId={ uid }
                        />
                      ),
                      icon: 'photo_library',
                      label: 'Tiles',
                    },
                  ]}
                />
              </div>
            </Pane>
          </SplitPane>
          <div className={`overlay ${ styles.overlay }${ overlayClass }`}>
            <div className="overlay__msg">{overlayMsg}</div>
          </div>
        </Fragment>
      );
    }
    else if(showProjectsList){
      const {
        projects,
      } = this.props;

      builderContent = <ProjectSelector projects={ projects } />;
    }

    return (
      <div className={`${ styles.root }`}>
        { builderContent }
      </div>
    );
  }
}

Builder.defaultProps = {
  mapHeight: 4,
  mapWidth: 4,
  tileWidth: 128,
};

Builder.propTypes = {
  currentTile: string,
  dialogError: shape({
    data: string,
    status: number,
    statusText: string,
  }),
  layerName: string,
  layers: arrayOf(LAYER),
  mapHeight: number,
  mapWidth: number,
  project: PROJECT,
  projects: PROJECTS,
  tileWidth: number,
  tiles: arrayOf(string),
  tilesCache: shape({}),
  tilesPath: string,
};

export default connect(builderProps)(Builder);
