import {
  BLUE,
} from 'UTILS/logger';
import reducerLogger from 'UTILS/reducerLogger';
import { initialState } from './constants';
import {
  SET_CURRENT_TILE,
  SET_LAYERS,
  SET_LAYER_THUMB,
  SET_PROJECT,
  SET_PROJECTS,
  SET_TILES,
  SET_TILES_CACHE,
} from './actionTypes';

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch( type ){
    case SET_CURRENT_TILE: {
      reducerLogger(type, [
        'current tile to:', `${ BLUE } ${ payload }`,
      ]);

      return {
        ...state,
        currentTile: payload,
      };
    }

    case SET_LAYERS: {
      reducerLogger(type, ['layers']);
      const layers = payload;
      let currentLayer = {};

      for(let i=0; i<layers.length; i++){
        if(layers[i].current){
          currentLayer = layers[i];
          break;
        }
      }

      return {
        ...state,
        currentLayer,
        layers,
      };
    }

    case SET_LAYER_THUMB: {
      reducerLogger(type, ['layer-thumb']);
      const { ndx, thumb } = payload;
      const layerThumbs = [...state.layerThumbs];

      layerThumbs[ndx] = thumb;

      return {
        ...state,
        layerThumbs,
      };
    }

    case SET_PROJECT: {
      reducerLogger(type, [
        'project to:', `${ BLUE } "${ JSON.stringify(payload) }"`,
      ]);
      return {
        ...state,
        project: payload,
        tilesPath: `/projects/${ payload.uid }/tiles`,
      };
    }

    case SET_PROJECTS: {
      reducerLogger(type, [
        'projects to:', `${ BLUE } ${ JSON.stringify(payload) }`,
      ]);
      return {
        ...state,
        projects: payload,
      };
    }

    case SET_TILES: {
      reducerLogger(type, ['tiles']);
      return {
        ...state,
        tiles: [...payload],
      };
    }

    case SET_TILES_CACHE: {
      reducerLogger(type, ['tiles-cache']);
      return {
        ...state,
        tilesCache: payload,
      };
    }

    default: return { ...state };
  }
};
