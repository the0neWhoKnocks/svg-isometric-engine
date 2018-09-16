import { css } from 'glamor';
import {
  DARK_THEME__BG_COLOR,
} from 'CONSTANTS/styles';

const tabColor = '#525252';
const styles = {
  root: css({
    paddingTop: '0.5em',
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
    background: `linear-gradient(${ tabColor } 73%, #2b2b2b)`,
    display: 'inline-block',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    zIndex: 0,
    transform: 'translateY(2px)',
    transition: 'transform 0.1s',

    ' .tab-icon': {
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      marginTop: '-0.15em',
      marginRight: '0.15em',
      marginLeft: '-0.25em',
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  }),

  tabs: css({
    background: DARK_THEME__BG_COLOR,
    position: 'relative',
    zIndex: 1,
  }),
};

export default styles;
