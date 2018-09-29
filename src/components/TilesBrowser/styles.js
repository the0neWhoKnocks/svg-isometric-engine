import { css } from 'glamor';

const SPACING = '0.25em';

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

    ' .nav-btn': {
      marginRight: SPACING,

      ' button': {
        color: '#eee',
        padding: '0em 0.15em 0.15em 0.15em',
        background: 'transparent',
      },
    },
  }),

  tiles: css({
    padding: SPACING,
    margin: SPACING,
    background: '#333',
    overflowX: 'hidden',
    flexGrow: 1,
  }),
};

export default styles;
