import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, string } from 'prop-types';
import SvgIcon from 'COMPONENTS/SvgIcon';
import {
  LAYER,
  PROJECT,
} from 'CONSTANTS/propTypes';
import {
  setLayers,
  setTilesCache,
} from 'STATE/Builder/actions';
import {
  getLayers,
  getLayerThumbs,
  getProject,
} from 'STATE/Builder/selectors';
import Layer from './components/Layer';
import styles from './styles';

const layersProps = (state) => ({
  layers: getLayers(state),
  layerThumbs: getLayerThumbs(state),
  project: getProject(state),
});

const gridLayer = {
  editable: false,
  name: 'Grid',
  tiles: [],
  visible: true,
};
const GRID_TILE_NAME = '__grid';

class Layers extends Component {
  static createLayer(layers) {
    const _layer = {
      current: true,
      locked: false,
      visible: true,
    };
    let count = 1;

    layers.forEach((layer, ndx) => {
      const match = layer.name.match(/^Layer (\d+)$/i);
      layer.current = false;
      layer.ndx = ndx;

      // Find any layers with the matching default name pattern and increment
      // it by one.
      if(match && match[1] && +match[1] >= count) count = +match[1] + 1;
    });

    _layer.name = `Layer ${ count }`;
    _layer.ndx = layers.length;

    layers.push(_layer);

    return layers;
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const current = Layers.getSelectedLayer(props.layers).index;

    if(current !== state.selectedLayer) newState.selectedLayer = current;

    return (Object.keys(newState).length) ? newState : null;
  }

  static getSelectedLayer(layers) {
    let layer = {};

    for(let i=0; i<layers.length; i++){
      if(layers[i].current){
        layer.index = i;
        layer.layer = layers[i];
        break;
      }
    }

    return layer;
  }

  static populateGridTiles({
    debug,
    mapColumns,
    mapRows,
    tileHeight,
    tileWidth,
  }) {
    const tiles = [];
    const gridTile = document.createElement('canvas');
    const tileCtx = gridTile.getContext('2d');
    gridTile.width = tileWidth;
    gridTile.height = tileHeight;
    tileCtx.strokeStyle = '#000000';
    tileCtx.lineWidth = 1;
    tileCtx.lineJoin = 'miter';
    tileCtx.beginPath();
    tileCtx.moveTo(tileWidth/2, 0); // top point
    tileCtx.lineTo(tileWidth, tileHeight/2); // right point
    tileCtx.lineTo(tileWidth/2, tileHeight); // bottom point
    tileCtx.lineTo(0, tileHeight/2); // left point
    tileCtx.closePath();
    tileCtx.stroke();
    
    if(debug){
      // tile bounding box
      tileCtx.fillStyle = '#ff000025';
      tileCtx.fillRect(0, 0, tileWidth, tileHeight);
    }

    for(let row=0; row<mapRows; row++) {
      const rowArr = [];
      for(let col=0; col<mapColumns; col++) {
        rowArr.push(GRID_TILE_NAME);
      }
      tiles.push(rowArr);
    }

    return {
      gridSprite: gridTile,
      gridTiles: tiles,
    };
  }
  
  static buildLayers({
    debug,
    layers,
    project,
  }) {
    let _layers = (layers.length)
      ? layers
      : Layers.createLayer([...layers]);

    // the grid will always be inserted as the first non-editable layer.
    const {
      height: mapRows,
      tileWidth,
      width: mapColumns,
    } = project.map;
    const tileHeight = tileWidth / 2;
    const {
      gridSprite,
      gridTiles,
    } = Layers.populateGridTiles({
      debug,
      mapColumns,
      mapRows,
      tileHeight,
      tileWidth,
    });
    gridLayer.tiles = gridTiles;
    setTilesCache({ [GRID_TILE_NAME]: gridSprite });
    
    if(_layers[0].name !== gridLayer.name){
      _layers = [gridLayer, ..._layers];
    }
    else{
      _layers[0] = gridLayer;
    }
    
    _layers.forEach((layer, ndx) => layer.ndx = ndx);
    
    return _layers;
  }

  constructor({
    debug,
    layers,
    project,
  }) {
    super();

    const _layers = Layers.buildLayers({ debug, layers, project });

    this.state = {
      layers: _layers,
      selectedLayer: Layers.getSelectedLayer(_layers).index,
    };

    this.handleLayerDelete = this.handleLayerDelete.bind(this);
    this.handleLayerLock = this.handleLayerLock.bind(this);
    this.handleLayerSelect = this.handleLayerSelect.bind(this);
    this.handleLayerVisibility = this.handleLayerVisibility.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNewLayer = this.handleNewLayer.bind(this);
  }

  componentDidMount() {
    // only set layers if this is a fresh/empty project
    if(!this.props.layers.length) this.updateLayers();
  }
  
  componentDidUpdate(prevProps) {
    const { debug, layers, project } = this.props;
    
    if(this.props.debug !== prevProps.debug){
      // have to rebuild grid layer when debug is toggled
      this.setState({
        layers: Layers.buildLayers({ debug, layers, project }),
      });
    }
  }

  handleNewLayer() {
    Layers.createLayer(this.state.layers);
    this.updateLayers();
  }

  handleLayerDelete(ev) {
    const layers = [...this.state.layers];
    let selectedLayer = this.state.selectedLayer;
    layers.splice(selectedLayer, 1);
    const nextLayer = layers[selectedLayer - 1];
    const parentLayer = layers[selectedLayer];

    // always select the next layer
    if(
      nextLayer
      && nextLayer.editable === undefined
    ){
      nextLayer.current = true;
    }
    // fallback to a parent layer
    else if(
      !nextLayer.editable
      && parentLayer
    ){
      parentLayer.current = true;
    }

    layers.forEach((layer, ndx) => {
      layer.ndx = ndx;
    });

    this.setState({
      layers,
      selectedLayer,
    }, () => {
      this.updateLayers();
    });
  }

  handleLayerLock(ndx, locked) {
    this.updateLayers(ndx, 'locked', locked);
  }

  handleLayerSelect(ev) {
    const el = ev.currentTarget;
    const ndx = +el.value;
    let selectedLayer = ndx;

    if(selectedLayer !== this.state.selectedLayer){
      const layers = [...this.state.layers];
      delete layers[this.state.selectedLayer].current;
      layers[selectedLayer].current = true;

      this.setState({
        layers,
        selectedLayer,
      }, () => {
        this.updateLayers();
      });
    }
  }

  handleLayerVisibility(ndx, visible) {
    this.updateLayers(ndx, 'visible', visible);
  }

  handleNameChange(ndx, name) {
    this.updateLayers(ndx, 'name', name);
  }

  updateLayers(ndx, prop, val) {
    const layers = [...this.state.layers];
    // args will be undefined when adding/deleting layers
    if(ndx !== undefined) layers[ndx][prop] = val;
    setLayers(layers);
  }

  render() {
    const {
      layerThumbs,
    } = this.props;
    const {
      layers,
      selectedLayer,
    } = this.state;

    return (
      <div className={`layers ${ styles.root }`}>
        <nav className={`layers__nav ${ styles.nav }`}>
          <div className={`layers__nav-items ${ styles.navItems }`}>
            <button
              className="nav-item nav-btn"
              title="New Layer"
              onClick={ this.handleNewLayer }
            >
              <SvgIcon
                className="add-icon"
                name="add_box"
              />
            </button>
            <div className="nav-item is--filler" />
            <button
              className="nav-item nav-btn"
              title="Delete tile"
              disabled={ !selectedLayer }
              onClick={ this.handleLayerDelete }
            >
              <SvgIcon
                className="delete-icon"
                name="delete_forever"
              />
            </button>
          </div>
        </nav>
        <div className={`layers__items ${ styles.items }`}>
          {layers.map((layerProps, layerNdx) => (
            <Layer
              key={ layerNdx }
              onLock={ this.handleLayerLock }
              onNameChange={ this.handleNameChange }
              onSelect={ this.handleLayerSelect }
              onVisibility={ this.handleLayerVisibility }
              thumbnail={ layerThumbs[layerNdx] }
              { ...layerProps }
            />
          ))}
        </div>
      </div>
    );
  }
}

Layers.propTypes = {
  debug: bool,
  layers: arrayOf(LAYER),
  layerThumbs: arrayOf(string),
  project: PROJECT,
};

export default connect(layersProps)(Layers);
