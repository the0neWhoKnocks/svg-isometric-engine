import { css } from 'glamor';
import {
  DARK_THEME__ACCENT_COLOR,
} from 'CONSTANTS/styles';

const layerToggle = {
  margin: '0 1px',
  background: '#0000007a',
};

const styles = {
  layerInput: css({
    display: 'none',

    ':checked + .layer': {
      borderLeftColor: DARK_THEME__ACCENT_COLOR,
      backgroundColor: '#ffffff15',
    },

    ':disabled + .layer': {
      cursor: 'default',

      ' .layer__name': {
        opacity: 0.5,
      },
    },
  }),

  layer: css({
    width: '100%',
    height: '100%',
    padding: '0.15em 0.25em 0.15em 0',
    borderLeft: 'solid 0.15em transparent',
    margin: '1px 0',
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
        ...layerToggle,

        ' > :first-child': {
          opacity: 0.5,
        },
      },
    },

    ' .layer__thumbnail-wrapper': {
      width: '1em',
      height: '1em',
      padding: '0.25em',
      overflow: 'hidden',
      verticalAlign: 'top',
      boxSizing: 'content-box',
      background: '#ffffff14',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      justifyContent: 'center',
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

      '.is--disabled': {
        fill: '#ffffff50',
        ...layerToggle,
      },
    },

    ' .layer__name': {
      color: '#eee',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      padding: '0.2em 0.5em',
      borderRadius: '0.2em',
      overflow: 'hidden',
      pointerEvents: 'all',
      userSelect: 'none',

      ':focus': {
        color: '#000',
        cursor: 'text',
        outline: 'none',
        background: '#ffffff90',
      },
    },
  }),
};

export default styles;
