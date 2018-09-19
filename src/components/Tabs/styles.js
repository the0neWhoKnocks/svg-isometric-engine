import { css } from 'glamor';
import {
  DARK_THEME__BG_COLOR,
} from 'CONSTANTS/styles';

const styles = {
  root: css({
    paddingTop: '0.5em',
    // Ensures the tabs take up 100% of their available height
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }),

  tabBtnsNav: css({
    boxShadow: 'inset 0px -7px 8px -3px rgba(0,0,0,0.25)',
    position: 'relative',
    zIndex: 0,
  }),

  tabBtnInput: css({
    display: 'none',

    ':checked + .tab-btn': {
      color: '#eee',
      boxShadow: '0px 2px 7px 2px rgba(0,0,0,0.65)',
      background: DARK_THEME__BG_COLOR,
      zIndex: 1,
      transform: 'translateY(0px)',

      ' .tab-icon': {
        fill: '#00fffa',
      },
    },
  }),

  tabBtn: css({
    color: '#bdbdbd',
    textTransform: 'uppercase',
    padding: '0.25em 1em',
    borderRadius: '0.5em 0.5em 0em 0em',
    background: 'linear-gradient(#00000040 73%, #00000070)',
    display: 'inline-block',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    zIndex: 0,
    transform: 'translateY(2px)',
    transition: 'transform 0.1s',

    ' .tab-icon': {
      marginTop: '-0.15em',
      marginRight: '0.15em',
      marginLeft: '-0.25em',
    },
  }),

  currentTab: css({
    background: DARK_THEME__BG_COLOR,
    position: 'relative',
    zIndex: 1,
    // tab will fill the remaining height based on available space
    flexGrow: 1,
  }),
};

export default styles;
