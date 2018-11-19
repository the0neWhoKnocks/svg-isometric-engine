import { css } from 'glamor';
import {
  DARK_THEME__BG_COLOR,
} from 'CONSTANTS/styles';

const globals = () => {
  css.insert(`
    .view.is--builder {
      font-family: monospace;
      background-color: ${ DARK_THEME__BG_COLOR };
    }
    .view.is--builder .view-content {
      height: 100%;
    }
  `);
};

const gutterSize = '11px';
const styles = {
  root: css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    ' [data-type="SplitPane"]': {
      '[data-split="horizontal"] > .map-pane': {
        overflow: 'hidden',
        position: 'relative',
      },

      '[data-split="vertical"] > div': {
        overflowX: 'hidden',
        overflowY: 'auto',
      },
    },

    ' [data-type="Resizer"]': {
      background: '#000',
      backgroundClip: 'padding-box',
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: '50%',
      opacity: 0.2,
      position: 'relative',
      zIndex: 100, // ensures the hover state is above all children

      ':hover': {
        transition: 'all 0.25s ease',
      },

      '[data-attribute="horizontal"]': {
        width: '100%',
        height: gutterSize,
        margin: '-5px 0',
        border: '5px solid rgba(0, 0, 0, 0)',
        borderRight: 'none',
        borderLeft: 'none',
        cursor: 'row-resize',
        // TODO - maybe bring back the handles
        // backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')",

        ':hover': {
          borderColor: 'rgba(0, 0, 0, 0.5)',
        },
      },

      '[data-attribute="vertical"]': {
        width: gutterSize,
        margin: '0 -5px',
        border: '5px solid rgba(0, 0, 0, 0)',
        borderTop: 'none',
        borderBottom: 'none',
        cursor: 'col-resize',
        // backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==')",

        ':hover': {
          borderColor: 'rgba(0, 0, 0, 0.5)',
        },
      },

      '.disabled': {
        cursor: 'not-allowed',

        ':hover': {
          borderColor: 'transparent',
        },
      },
    },
  }),

  rail: css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),

  tabs: css({
    ' .tabs__tab': {
      display: 'flex',
      flexDirection: 'column',
    },
  }),

  mapPaneLabel: css({
    color: '#fff',
    borderRadius: '0.25em',
    background: '#000',
    position: 'absolute',
    top: '4px',
    left: '4px',
    opacity: '0.25',
    padding: '0 0.5em',
    pointerEvents: 'none',
  }),

  builderNav: css({
    textAlign: 'right',
    position: 'absolute',
    top: '4px',
    left: 0,
    right: '4px',

    ' label': {
      margin: '0 0.25em',
    },

    ' input': {
      width: '4em',
      textAlign: 'center',
    },
  }),

  overlay: css({
    background: '#00000073',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.25s',
    opacity: 0,
    zIndex: 100,

    '.is--visible': {
      opacity: 1,
      pointerEvents: 'all',
    },

    ' .overlay__msg': {
      fontWeight: 'bold',
      padding: '0.25em 1em 0.3em',
      borderRadius: '0.5em',
      background: '#fff',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

    '.is--error .overlay__msg': {
      background: '#ff8c78',
    },
  }),
};

export default styles;
export {
  globals,
};
