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
    if(props.tileWidth !== state.tileWidth) newState.tileWidth = props.tileWidth;

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
      tileWidth: props.tileWidth,
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
      tileWidth,
    } = this.state;
    const canvas = this.els.canvas;
    const ctx = canvas.getContext('2d');
    // size of grid is 2:1
    const tileHeight = tileWidth / 2;

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

    // sprite could be taller
    const spriteWidth = tileWidth;
    const spriteHeight = (gridTile.height/gridTile.width) * tileWidth;

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
          offsetY + (y + x) * tileHeight/2 - (spriteHeight - tileHeight),
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
  mapHeight: 4,
  mapWidth: 4,
  tileWidth: 128,
};
MapRenderer.propTypes = {
  canvasHeight: number,
  canvasWidth: number,
  mapHeight: number,
  mapWidth: number,
  tileWidth: number,
};

export default MapRenderer;
