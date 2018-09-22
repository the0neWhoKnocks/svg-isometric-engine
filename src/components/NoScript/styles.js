import { css } from 'glamor';

const col1 = '#000';
const col2 = 'yellow';
const stripeWidth = 20;
const styles = {
  root: css({
    fontSize: '1.25rem',
    textAlign: 'center',
    padding: '0.5em',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: `repeating-linear-gradient(135deg, ${ col1 }, ${ col1 } ${ stripeWidth }px, ${ col2 } ${ stripeWidth }px, ${ col2 } ${ stripeWidth * 2 }px)`,

    ' span': {
      padding: '0.25em 2em',
      position: 'relative',
      display: 'inline-block',

      ':before': {
        content: "''",
        background: '#fff',
        boxShadow: '0 0px 15px 2px',
        transform: 'skew(-45deg)',
        position: 'absolute',
        zIndex: '-1',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    },
  }),
};

export default styles;
