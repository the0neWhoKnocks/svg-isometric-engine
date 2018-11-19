import React, { Component } from 'react';
import { number } from 'prop-types';
import styles from './styles';

class MapRenderer extends Component {
  static getDerivedStateFromProps(props, state) {
    const newState = {};

    if(props.canvasHeight !== state.canvasHeight) newState.canvasHeight = props.canvasHeight;
    if(props.canvasWidth !== state.canvasWidth) newState.canvasWidth = props.canvasWidth;
    if(props.mapWidth !== state.mapWidth) newState.mapWidth = props.mapWidth;
    if(props.mapHeight !== state.mapHeight) newState.mapHeight = props.mapHeight;

    return (Object.keys(newState).length) ? newState : null;
  }

  constructor(props) {
    super();

    this.els = {};
    this.state = {
      canvasHeight: props.canvasHeight,
      canvasWidth: props.canvasWidth,
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
    const {
      canvasHeight,
      canvasWidth,
    } = this.state;
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

    // size the canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const offsetX = (canvas.width/2) - (spriteWidth/2); // center of canvas
    const offsetY = 60;

    for(let x=0; x<this.state.mapWidth; x++) {
      for(let y=0; y<this.state.mapHeight; y++) {
        ctx.drawImage(
          gridTile,
          offsetX + (x - y) * spriteWidth/2,
          offsetY + (y + x) * gridHeight/2 - (spriteHeight-gridHeight),
          spriteWidth,
          spriteHeight
        );
      }
    }
  }

  render() {
    return (
      <div className={`map-renderer ${ styles.container }`}>
        <canvas ref={(canvas) => this.els.canvas = canvas} />
      </div>
    );
  }
}

MapRenderer.defaultProps = {
  canvasHeight: 200,
  canvasWidth: 300,
};
MapRenderer.propTypes = {
  canvasHeight: number,
  canvasWidth: number,
  mapHeight: number,
  mapWidth: number,
  tileHeight: number,
  tileWidth: number,
};

export default MapRenderer;
