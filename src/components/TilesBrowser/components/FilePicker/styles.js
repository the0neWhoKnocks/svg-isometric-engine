import { css } from 'glamor';

const styles = {
  root: css({
    display: 'inline-block',
    verticalAlign: 'top',
    position: 'relative',
  }),

  chooseBtn: css({
    width: '100%',
    color: '#333',
    fontSize: '16px',
    fontWeight: '700',
    textDecoration: 'none',
    padding: '5px 20px',
    border: '1px solid #808080',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
    background: '#ddd',

    ':hover': {
      backgroundColor: '#eee',
      opacity: 1,
    },
  }),

  fileInput: css({
    width: '100%',
    height: '100%',
    fontSize: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'pointer',
  }),
};

export default styles;
