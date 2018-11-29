import { css } from 'glamor';

const toggleRadius = 60;
const toggleBorderSize = 3;
const toggleBorderSizePX = `${ toggleBorderSize }px`;
const toggleAnimSpeed = '0.15s';

const styles = {
  baseToggle: css({
    display: 'inline-block',
  }),

  baseLabel: css({
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    display: 'block',

    '.is--custom &': {
      ' .toggle__sprite': {
        ' > :last-child': {
          display: 'none',
        },
      },
    },
  }),

  baseCheckbox: css({
    marginLeft: '-9999px',
    visibility: 'hidden',
    position: 'absolute',

    '.is--custom &': {
      ':checked + label .toggle__sprite': {
        ' > :first-child': {
          display: 'none',
        },
        ' > :last-child': {
          display: 'inline-block',
        },
      },
    },
  }),

  toggle: css({
    verticalAlign: 'middle',
  }),

  label: css({
    width: `${ toggleRadius }px`,
    height: `${ (toggleRadius / 3) }px`,
    backgroundColor: '#ccc',
    backgroundImage: 'linear-gradient(#ccc, #fff)',
    borderRadius: `${ (toggleRadius / 2) }px`,
    position: 'relative',

    '::before,::after': {
      content: "''",
      display: 'block',
      position: 'absolute',
    },

    '::before': {
      backgroundColor: '#AD7C7C',
      borderRadius: `${ (toggleRadius / 3) }px`,
      top: toggleBorderSizePX,
      left: toggleBorderSizePX,
      bottom: toggleBorderSizePX,
      right: toggleBorderSizePX,
      transition: `background ${ toggleAnimSpeed }`,
    },

    '::after': {
      width: `${ (toggleRadius / 2) }px`,
      borderRadius: `${ (toggleRadius / 3) }px`,
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      transition: `margin ${ toggleAnimSpeed }`,
      marginLeft: toggleBorderSizePX,
      top: toggleBorderSizePX,
      bottom: toggleBorderSizePX,
    },
  }),

  checkbox: css({
    ':checked + label::before': {
      backgroundColor: '#52F28B',
    },

    ':checked + label::after': {
      marginLeft: `${ ((toggleRadius / 2) - toggleBorderSize) }px`,
    },
  }),
};

export default styles;
