import { css } from 'glamor';

const styles = {
  container: css({
    width: '100%',
    height: '100%',

    ' .map-renderer__tile': {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  }),
};

export default styles;
