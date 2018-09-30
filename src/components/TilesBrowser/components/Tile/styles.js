import { css } from 'glamor';
import {
  DARK_THEME__ACCENT_COLOR,
} from 'CONSTANTS/styles';

const styles = {
  tileInput: css({
    display: 'none',

    ':checked + .tile': {
      borderLeftColor: DARK_THEME__ACCENT_COLOR,
      backgroundColor: '#ffffff15',
    },
  }),

  tile: css({
    width: '100%',
    height: '100%',
    padding: '0.25em',
    borderLeft: 'solid 0.25em transparent',
    backgroundColor: '#0000004a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    cursor: 'pointer',
    transition: 'border-left-color 0.25s, background-color 0.25s',
  }),
};

export default styles;
