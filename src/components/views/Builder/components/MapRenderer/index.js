import React, { Component } from 'react';
import { number } from 'prop-types';
import styles from './styles';

class MapRenderer extends Component {
  static getDerivedStateFromProps(props, state) {
    const newState = {};

    if(props.mapWidth !== state.mapWidth) newState.mapWidth = props.mapWidth;
    if(props.mapHeight !== state.mapHeight) newState.mapHeight = props.mapHeight;

    return (Object.keys(newState).length) ? newState : null;
  }

  constructor(props) {
    super();

    this.els = {};
    this.state = {
      mapHeight: props.mapHeight,
      mapWidth: props.mapWidth,
    };
  }

  componentDidMount() {
    this.renderGrid();
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  renderGrid() {
    const canvas = this.els.canvas;
    const ctx = canvas.getContext('2d');
    // size of grid is 2:1
    const gridWidth = 128;
    const gridHeight = 64;

    const gridTile = document.createElement('canvas');
    const tileCtx = gridTile.getContext('2d');
    gridTile.width = gridWidth;
    gridTile.height = gridHeight;
    tileCtx.strokeStyle = '#000000';
    tileCtx.lineWidth = 1;
    tileCtx.lineJoin = 'miter';
    tileCtx.beginPath();
    tileCtx.moveTo(gridWidth/2, 0); // top point
    tileCtx.lineTo(gridWidth, gridHeight/2); // right point
    tileCtx.lineTo(gridWidth/2, gridHeight); // bottom point
    tileCtx.lineTo(0, gridHeight/2); // left point
    tileCtx.closePath();
    tileCtx.stroke();

    // sprite could be taller
    const spriteWidth = gridWidth;
    const spriteHeight = (gridTile.height/gridTile.width) * gridWidth;

    // always resize canvas with javascript. using CSS will make it stretch
    canvas.width = this.els.container.clientWidth;
    canvas.height = this.els.container.clientHeight;
    const ox = (canvas.width/2) - (spriteWidth/2);
    const oy = spriteHeight;

    for(let x=0; x<this.state.mapWidth; x++) {
      for(let y=0; y<this.state.mapHeight; y++) {
        ctx.drawImage(
          gridTile,
          ox + (x - y) * spriteWidth/2,
          oy + (y + x) * gridHeight/2 - (spriteHeight-gridHeight),
          spriteWidth,
          spriteHeight
        );
      }
    }
  }

  render() {
    return (
      <div
        className={`${ styles.container }`}
        ref={(container) => this.els.container = container}
      >
        <canvas ref={(canvas) => this.els.canvas = canvas} />
      </div>
    );
  }
}

MapRenderer.propTypes = {
  mapHeight: number,
  mapWidth: number,
  tileHeight: number,
  tileWidth: number,
};

export default MapRenderer;
