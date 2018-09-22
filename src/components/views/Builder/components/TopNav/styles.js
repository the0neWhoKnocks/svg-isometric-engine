import { css } from 'glamor';

const btnActive = {
  outline: 'none',
  background: '#39c4ff60',
};
const btnHover = {
  background: '#ffffff15',
};
const subBtnPadding = '0.7em 3em 0.7em 1.25em';
const navFontSize = '0.75rem';
const styles = {
  root: css({
    background: '#333',
    position: 'relative',

    ' .flyout': {
      ' label:hover': {
        ...btnHover,
      },

      ' input:checked + label, label:focus': {
        ...btnActive,
      },

      ' .flyout__btn': {
        color: '#eee',
        fontFamily: 'Arial',
        fontSize: navFontSize,
        padding: '0.5em 1em',
        display: 'inline-block',
      },

      ' .flyout__content': {
        fontSize: navFontSize,
        marginTop: '1px',
        background: '#333',
        display: 'flex',
        flexDirection: 'column',

        ' button': {
          color: '#eee',
          fontSize: navFontSize,
          textAlign: 'left',
          padding: subBtnPadding,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',

          ':hover': {
            ...btnHover,
          },

          ':focus,:active': {
            ...btnActive,
          },
        },

        ' .flyout__btn': {
          padding: subBtnPadding,
          display: 'block',
        },

        ' .has--icon': {
          position: 'relative',

          ' svg': {
            position: 'absolute',
            top: '50%',
            right: '0.5em',
            transform: 'translateY(-50%)',
          },
        },
      },
    },
  }),

  projectBtns: css({
    whiteSpace: 'nowrap',
  }),

  projectTitle: css({
    color: '#fff',
    opacity: 0.5,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    userSelect: 'none',
  }),
};

export default styles;
