import { css } from 'glamor';

const styles = {
  root: css({
    paddingTop: '0.25em',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }),

  nav: css({
    padding: '0.25em',
    margin: '0 0.25em',
    background: '#333',

    ' .nav-btn': {
      marginRight: '0.25em',

      ' button': {
        color: '#eee',
        fontSize: '1.5em',
        padding: '0em 0.15em 0.15em 0.15em',
        background: 'transparent',
      },
    },
  }),

  tiles: css({
    padding: '0.25em',
    margin: '0.25em',
    background: '#333',
    overflowX: 'hidden',
    flexGrow: 1,
  }),
};

export default styles;
