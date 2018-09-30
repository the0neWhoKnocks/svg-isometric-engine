import { css } from 'glamor';

const SPACING = '0.25em';
export const DELETE_DURATION = 500;

const styles = {
  root: css({
    paddingTop: SPACING,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',

    ' .progress__container': {
      margin: SPACING,
    },
  }),

  nav: css({
    padding: SPACING,
    margin: `0 ${ SPACING }`,
    background: '#333',

    ' .nav-item': {
      marginRight: SPACING,
      display: 'inline-block',

      ':last-of-type': {
        marginRight: '0',
      },
    },

    ' .nav-btn': {
      color: '#eee',
      fontSize: '16px',
      padding: '0em 0.15em 0.15em 0.15em',
      border: '1px solid #808080',
      borderRadius: '0.15em',
      background: 'transparent',
      transition: 'opacity 0.25s',

      '[disabled]': {
        opacity: 0.25,
        cursor: 'default',
      },

      ' .delete-icon': {
        fill: '#f58264',
      },
    },
  }),

  navItems: css({
    display: 'flex',
    flexDirection: 'row',

    ' .is--filler': {
      flexGrow: 1,
    },
  }),

  tiles: css({
    padding: SPACING,
    margin: SPACING,
    background: '#333',
    overflowX: 'hidden',
    flexGrow: 1,

    ' .tile-container': {
      display: 'inline-block',
      verticalAlign: 'middle',

      '.delete--started': {
        transition: `all ${ DELETE_DURATION }ms`,
        overflow: 'hidden',
      },

      '.is--deleting': {
        width: '0px !important',
        height: '0px !important',
      },
    },
  }),
};

export default styles;
