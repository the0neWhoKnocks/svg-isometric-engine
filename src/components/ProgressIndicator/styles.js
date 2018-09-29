import { css } from 'glamor';
import {
  DARK_THEME__ACCENT_COLOR,
  DARK_THEME__BG_COLOR,
  DARK_THEME__FONT_COLOR,
} from 'CONSTANTS/styles';

const styles = {
  root: css({
    opacity: 0,
    transition: 'opacity 0.5s',
    pointerEvents: 'none',
    userSelect: 'none',

    '.is--overlay': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,

      '::before': {
        content: "''",
        background: `${ DARK_THEME__BG_COLOR }D6`,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },

    '.is--visible': {
      opacity: 1,

      '.is--overlay': {
        pointerEvents: 'all',
      },
    },
  }),

  container: css({
    padding: '1em 0.5em',
    background: 'linear-gradient(transparent, #00000080 5%, #00000080 95%, transparent)',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: 'translateY(-50%)',
  }),

  progress: css({
    width: '100%',
    height: '0.4em',
    borderRadius: '0.25em',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'block',
    appearance: 'none',

    '[value]': {
      '::-webkit-progress-bar': {
        backgroundColor: '#000',
        boxShadow: '0 -1px 2px rgba(255, 255, 255, 0.55) inset',
      },

      '::-webkit-progress-value': {
        borderRadius: '0em 0.4em 0.4em 0em',
        background: DARK_THEME__ACCENT_COLOR,
        transition: 'width 0.25s',
      },
    },
  }),

  message: css({
    color: DARK_THEME__FONT_COLOR,
    minHeight: '1em',
    paddingTop: '0.5em',
  }),
};

export default styles;
