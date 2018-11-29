import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import SvgIcon from 'COMPONENTS/SvgIcon';
import {
  LAYER,
} from 'CONSTANTS/propTypes';
import {
  setLayers,
} from 'STATE/Builder/actions';
import {
  getLayers,
} from 'STATE/Builder/selectors';
import Layer from './components/Layer';
import styles from './styles';

const layersProps = (state) => ({
  layers: getLayers(state),
});

const defaultLayer = {
  locked: false,
  name: 'Layer 1',
  visible: true,
};

class Layers extends Component {
  constructor(props) {
    super();

    this.state = {
      layers: (props.layers.length) ? props.layers : [{ ...defaultLayer }],
      selectedLayer: undefined,
    };

    this.handleLayerDelete = this.handleLayerDelete.bind(this);
    this.handleLayerLock = this.handleLayerLock.bind(this);
    this.handleLayerSelect = this.handleLayerSelect.bind(this);
    this.handleLayerVisibility = this.handleLayerVisibility.bind(this);
  }

  handleLayerDelete(ev) {

  }

  handleLayerLock(ndx, locked) {
    this.updateLayers(ndx, 'locked', locked);
  }

  handleLayerSelect(ev) {
    const el = ev.currentTarget;
    const uid = +el.value;
    let selectedLayer = uid;

    // allows for de-selecting a currently select layer
    if(selectedLayer === this.state.selectedLayer) selectedLayer = undefined;

    this.setState({
      selectedLayer,
    });
  }

  handleLayerVisibility(ndx, visible) {
    this.updateLayers(ndx, 'visible', visible);
  }

  updateLayers(ndx, prop, val) {
    const layers = [...this.state.layers];
    layers[ndx][prop] = val;
    setLayers(layers);
  }

  render() {
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
          {layers.map(({ name, tiles }, layerNdx) => (
            <Layer
              key={ layerNdx }
              current={ layerNdx === selectedLayer }
              name={ name }
              ndx={ layerNdx }
              onLock={ this.handleLayerLock }
              onSelect={ this.handleLayerSelect }
              onVisibility={ this.handleLayerVisibility }
              thumbnail=""
            />
          ))}
        </div>
      </div>
    );
  }
}

Layers.propTypes = {
  layers: arrayOf(LAYER),
};

export default connect(layersProps)(Layers);
