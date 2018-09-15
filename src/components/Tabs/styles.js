import { css } from 'glamor';
import {
  DARK_THEME__BG_COLOR,
} from 'CONSTANTS/styles';

const tabColor = '#333';
const styles = {
  root: css({
    paddingTop: '0.5em',
  }),

  tabBtnsNav: css({
    borderBottom: `solid 1px ${ tabColor }`,
    boxShadow: 'inset 0px -7px 8px -3px rgba(0,0,0,0.25)',
    position: 'relative',
    zIndex: 0,
  }),

  tabBtnInput: css({
    display: 'none',

    ':checked + .tab-btn': {
      borderBottom: `solid 1px ${ DARK_THEME__BG_COLOR }`,
      marginBottom: '-1px',
      boxShadow: '0px 4px 16px 3px rgba(0,0,0,0.5)',
      background: DARK_THEME__BG_COLOR,
      zIndex: 1,
      transform: 'translateY(0px)',
    },
  }),

  tabBtn: css({
    color: '#eee',
    padding: '0.25em 1em',
    border: 'solid 1px #000',
    borderBottom: 'none',
    borderRadius: '0.5em 0.5em 0em 0em',
    background: tabColor,
    display: 'inline-block',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 0,
    transform: 'translateY(2px)',
    transition: 'transform 0.25s',
  }),

  tabs: css({
    background: DARK_THEME__BG_COLOR,
    position: 'relative',
    zIndex: 1,
  }),
};

export default styles;
