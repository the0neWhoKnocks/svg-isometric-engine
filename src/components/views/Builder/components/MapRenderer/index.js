import React, { Component } from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { LAYER } from 'CONSTANTS/propTypes';
import Layers from 'COMPONENTS/Layers';
// import { setLayers } from 'STATE/Builder/actions';
import styles from './styles';

class MapRenderer extends Component {
  constructor(props) {
    super();

    this.els = {};
  }

  componentDidMount() {
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);

    this.renderLayers();
  }

  componentDidUpdate() {
    this.renderLayers();
  }
  
  handleMouseDown(ev) {
    const {
      currentTile,
      layers,
      // mapHeight,
      mapWidth,
    } = this.props;
    const layer = Layers.getSelectedLayer(layers).layer;
    
    // TODO - a default `tiles` Array should be built already, but doing this
    // for now.
    if(!layer.tiles){
      layer.tiles = [];
      for(let row=0; row<mapWidth; row++) {
        const rowArr = [];
        // for(let col=0; col<mapHeight; col++) {
        //   rowArr.push(GRID_TILE_NAME);
        // }
        layer.tiles.push(rowArr);
      }
    }
    
    // TODO - determine actual X Y of tile
    
    layer.tiles[0][0] = currentTile;
    this.renderLayers();
    
    // TODO - may have to call `setLayers` to keep things in sync
    // setLayers(layers);
  }

  handleMouseLeave(ev) {
    this.tileCtx.clearRect(0, 0, this.tileCanvas.width, this.tileCanvas.height);
  }

  handleMouseMove(ev) {
    this.renderTileBrush(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY);
  }

  handleMouseOver(ev) {
    const {
      canvasHeight,
      canvasWidth,
      tileWidth,
    } = this.props;

    this.tileCanvas = this.els.tileCanvas;
    this.tileCtx = this.tileCanvas.getContext('2d');
    this.tileCanvas.width = canvasWidth;
    this.tileCanvas.height = canvasHeight;

    // isometric:
    this.IsoW = tileWidth; // cell width
    this.IsoH = tileWidth/2; // cell height
    this.IsoX = canvasWidth / 2;
    this.IsoY = (canvasHeight - this.IsoH * this.IsoH) / 2;

    this.renderTileBrush(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY);
  }

  isoToScreenX(localX, localY) {
    return this.IsoX + (localX - localY) * this.IsoW;
  }

  isoToScreenY(localX, localY) {
    return this.IsoY + (localX + localY) * this.IsoH;
  }

  screenToIsoX(globalX, globalY) {
    return ((globalX - this.IsoX) / this.IsoW + (globalY - this.IsoY) / this.IsoH) / 2;
  }

  screenToIsoY(globalX, globalY) {
    return ((globalY - this.IsoY) / this.IsoH - (globalX - this.IsoX) / this.IsoW) / 2;
  }

  renderTileBrush(xPos, yPos) {
    const {
      currentTile,
      debug,
      mapHeight,
      mapWidth,
      tilesCache,
    } = this.props;
    const tileBrush = tilesCache[currentTile];

    if(tileBrush){
      const centerX = xPos - (tileBrush.width / 2);
      const centerY = yPos - (tileBrush.height / 2);

      this.tileCtx.clearRect(0, 0, this.tileCanvas.width, this.tileCanvas.height);
      
      if(debug){
        // render coordinates
        this.tileCtx.font = '11px sans-serif';
        let rX = this.screenToIsoX(xPos, yPos);
        let rY = this.screenToIsoY(xPos, yPos);
        this.tileCtx.textAlign = 'left';
        this.tileCtx.textBaseline = 'top';
        this.tileCtx.fillText(`Mouse (absolute): ${ xPos }, ${ yPos }`, 5, 25);
        this.tileCtx.fillText(`Mouse (relative): ${ rX.toFixed(2) }, ${ rY.toFixed(2) }`, 5, 25 + 12);
        
        // render X & Y coordinate lines
        rX = Math.max(0, Math.min(rX, mapWidth));
        rY = Math.max(0, Math.min(rY, mapHeight));
        this.tileCtx.strokeStyle = 'red';
        this.tileCtx.beginPath();
        this.tileCtx.moveTo(this.isoToScreenX(0, rY), this.isoToScreenY(0, rY));
        this.tileCtx.lineTo(this.isoToScreenX(mapWidth, rY), this.isoToScreenY(mapWidth, rY));
        this.tileCtx.stroke();
        this.tileCtx.strokeStyle = 'blue';
        this.tileCtx.beginPath();
        this.tileCtx.moveTo(this.isoToScreenX(rX, 0), this.isoToScreenY(rX, 0));
        this.tileCtx.lineTo(this.isoToScreenX(rX, mapHeight), this.isoToScreenY(rX, mapHeight));
        this.tileCtx.stroke();
      }

      this.tileCtx.drawImage(tileBrush, centerX, centerY);
    }
  }

  renderLayers() {
    const {
      canvasHeight,
      canvasWidth,
      debug,
      layers,
      mapHeight,
      mapWidth,
      onLayerRender,
      tileWidth,
      tilesCache,
    } = this.props;
    const canvas = this.els.canvas;
    const ctx = canvas.getContext('2d');
    // size of grid is 2:1
    this.tileHeight = tileWidth / 2;
    this.offsetX = (canvasWidth/2) - (tileWidth/2); // center of canvas
    this.offsetY = 60;

    // size the canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // clear for re-draw
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    if(debug){
      // draw center lines
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#00000025';
      ctx.moveTo(canvasWidth/2, 0);
      ctx.lineTo(canvasWidth/2, canvasHeight);
      ctx.stroke();
      ctx.moveTo(0, canvasHeight/2);
      ctx.lineTo(canvasWidth, canvasHeight/2);
      ctx.stroke();
    }

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
              const tile = tilesCache[ tiles[y][x] ];
              // sprite could be taller
              const spriteWidth = tileWidth;
              const spriteHeight = (tile.height/tile.width) * tileWidth;
              const ctxArgs = [
                tile,
                this.offsetX + (x - y) * spriteWidth/2,
                this.offsetY + (y + x) * this.tileHeight/2 - (spriteHeight - this.tileHeight),
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
      <div
        className={`map-renderer ${ styles.container }`}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        onMouseOver={this.handleMouseOver}
      >
        <canvas ref={(canvas) => this.els.canvas = canvas} />
        <canvas
          ref={(canvas) => this.els.tileCanvas = canvas}
          className="map-renderer__tile"
        />
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
  currentTile: string,
  debug: bool,
  layers: arrayOf(LAYER),
  mapHeight: number,
  mapWidth: number,
  onLayerRender: func,
  tileWidth: number,
  tilesCache: shape({}),
};

export default MapRenderer;
