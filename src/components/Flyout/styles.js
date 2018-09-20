import { css } from 'glamor';

const TOP = 'top';
const BOTTOM = 'bottom';
const LEFT = 'left';
const RIGHT = 'right';
const positions = {
  [TOP]: 'is--top',
  [BOTTOM]: 'is--bottom',
  [LEFT]: 'is--left',
  [RIGHT]: 'is--right',
};

const styles = {
  root: css({
    display: 'inline-block',
    position: 'relative',
    
    ' input': {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      zIndex: 0,
      
      ':checked + label + .flyout__content-wrapper': {
        display: 'block',
      },
    },
  }),
  
  label: css({
    userSelect: 'none',
    position: 'relative',
    zIndex: 1,
    cursor: 'pointer',
  }),
  
  contentWrapper: css({
    display: 'none',
    position: 'absolute',
    
    [` .${ positions[BOTTOM] }`]: {
      top: '100%',
      left: 0,
    },
    
    [` .${ positions[RIGHT] }`]: {
      top: 0,
      left: '100%',
    },
  }),
};

export default styles;
export {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  positions,
};