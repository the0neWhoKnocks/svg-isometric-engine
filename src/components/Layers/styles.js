import { css } from 'glamor';

const SPACING = '0.25em';

export default {
  root: css({
    paddingTop: SPACING,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
  }),

  // TODO - duplicated in TilesBrowser, maybe make nav a component
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

  items: css({
    padding: SPACING,
    margin: SPACING,
    background: '#333',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    flexGrow: 1,
  }),
};
