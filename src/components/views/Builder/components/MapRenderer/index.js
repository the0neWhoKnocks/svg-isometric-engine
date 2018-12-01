import React, { Component } from 'react';
import { arrayOf, func, number } from 'prop-types';
import {
  LAYER,
} from 'CONSTANTS/propTypes';
import styles from './styles';

class MapRenderer extends Component {
  constructor(props) {
    super();

    this.els = {};
  }

  componentDidMount() {
    this.renderLayers();
  }

  componentDidUpdate() {
    this.renderLayers();
  }

  renderLayers() {
    const {
      canvasHeight,
      canvasWidth,
      layers,
      mapHeight,
      mapWidth,
      onLayerRender,
      tileWidth,
    } = this.props;
    const canvas = this.els.canvas;
    const ctx = canvas.getContext('2d');
    // size of grid is 2:1
    const tileHeight = tileWidth / 2;
    const offsetX = (canvasWidth/2) - (tileWidth/2); // center of canvas
    const offsetY = 60;

    // size the canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // clear for re-draw
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // render layers
    for(let layerNdx=0; layerNdx<layers.length; layerNdx++){
      const { tiles, visible } = layers[layerNdx];
      let layerCanvas, layerCtx;

      if(onLayerRender){
        layerCanvas = document.createElement('canvas');
        layerCtx = layerCanvas.getContext('2d', { alpha: false });
        layerCanvas.width = canvasWidth;
        layerCanvas.height = canvasHeight;
        layerCtx.fillStyle = '#fff';
        layerCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      if(tiles && visible){
        for(let x=0; x<mapWidth; x++) {
          for(let y=0; y<mapHeight; y++) {
            if(tiles[y] && tiles[y][x]){
              const tile = tiles[y][x];
              // sprite could be taller
              const spriteWidth = tileWidth;
              const spriteHeight = (tile.height/tile.width) * tileWidth;
              const ctxArgs = [
                tile,
                offsetX + (x - y) * spriteWidth/2,
                offsetY + (y + x) * tileHeight/2 - (spriteHeight - tileHeight),
                spriteWidth,
                spriteHeight,
              ];

              ctx.drawImage(...ctxArgs);
              if(layerCanvas) layerCtx.drawImage(...ctxArgs);
            }
          }
        }

        // On layer render, dispatch the image so it can be used for things
        // like layer thumbnails.
        if(layerCanvas) onLayerRender(layerNdx, layerCanvas);
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
  layers: arrayOf(LAYER),
  mapHeight: number,
  mapWidth: number,
  onLayerRender: func,
  tileWidth: number,
};

export default MapRenderer;
