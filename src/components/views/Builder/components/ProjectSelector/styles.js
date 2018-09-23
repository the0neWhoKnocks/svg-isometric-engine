import { css } from 'glamor';

const styles = {
  root: css({
    display: 'flex',
    flexdDirection: 'row',
    flexGrow: 1,

    ' .column': {
      width: '50%',
      padding: '2em',
      borderLeft: 'solid 1px',

      ':first-of-type': {
        border: 'none',
      },
    },

    ' .create-project__input-container': {
      textAlign: 'unset',
      display: 'flex',
      flexdDirection: 'row',

      ' input': {
        width: '80%',
      },

      ' button': {
        width: '20%',
      },
    },
  }),

  columnTitle: css({
    color: '#eee',
    textShadow: '0px 2px 2px #000',
  }),

  projectList: css({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    ' .projects': {
      color: '#eee',
      padding: '0.5em',
      borderRadius: '0.5em',
      flexGrow: 1,
      background: '#333',

      ' ul': {
        listStyle: 'none',
        padding: 0,

        ' button': {
          width: '100%',
          color: 'inherit',
          textAlign: 'left',
          padding: '0.5em',
          border: 'none',
          borderLeft: 'solid 0.5em transparent',
          marginBottom: '2px',
          cursor: 'pointer',
          background: '#ffffff10',
          transition: 'border-left-color 0.25s',

          ':hover,:focus': {
            borderColor: 'currentColor',
          },
        },
      },
    },

    '.no--projects': {
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0.25,
    },
  }),
};

export default styles;
