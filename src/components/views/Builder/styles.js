import { css } from 'glamor';
import {
  DARK_THEME__BG_COLOR,
} from 'CONSTANTS/styles';

const globals = () => {
  css.insert(`
    .view.is--builder {
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

    ' [data-type="SplitPane"]': {
      '[data-split="horizontal"] > div': {
        overflowX: 'auto',
        overflowY: 'hidden',
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
      zIndex: 1,

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
};

export default styles;
export {
  globals,
};
