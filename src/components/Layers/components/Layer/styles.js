import { css } from 'glamor';
import {
  DARK_THEME__ACCENT_COLOR,
} from 'CONSTANTS/styles';

const styles = {
  layerInput: css({
    display: 'none',

    ':checked + .layer': {
      borderLeftColor: DARK_THEME__ACCENT_COLOR,
      backgroundColor: '#ffffff15',
    },
  }),

  layer: css({
    width: '100%',
    height: '100%',
    padding: '0.15em 0.25em 0.15em 0',
    borderLeft: 'solid 0.15em transparent',
    backgroundColor: '#0000004a',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    cursor: 'pointer',
    transition: 'border-left-color 0.25s, background-color 0.25s',

    ' > *': {
      margin: '0 2px',
    },

    ' .toggle': {
      display: 'inline-block',
    },

    ' .layer__nav': {
      flexShrink: 0,

      ' .toggle__sprite': {
        border: 'solid 1px',

        ' > :first-child': {
          opacity: 0.5,
        },
      },
    },

    ' .layer__thumbnail-wrapper': {
      width: '1em',
      height: '1em',
      padding: '0.25em',
      border: 'solid 1px #ffffff42',
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'top',
      flexShrink: 0,
      boxSizing: 'content-box',
    },

    ' .layer__thumbnail': {
      width: '100%',
      display: 'block',
      userSelect: 'none',
    },

    ' .layer__toggle-icon': {
      fill: '#ccc',
      padding: '0.25em',
      boxSizing: 'content-box',
    },

    ' .layer__name': {
      color: '#eee',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      padding: '0.2em 0.5em',
      borderRadius: '0.2em',
      overflow: 'hidden',
      pointerEvents: 'all',

      ':focus': {
        color: '#000',
        outline: 'none',
        background: '#ffffff90',
      },
    },
  }),
};

export default styles;
