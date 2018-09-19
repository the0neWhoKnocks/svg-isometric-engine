import { css } from 'glamor';

const accentColor = '#aaa';
const styles = {
  absFill: css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
  
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  }),
  
  overlay: css({
    background: 'rgba(255, 255, 255, 0.75)',
  }),
  
  nav: css({
    padding: '0.1em 0.15em 0.2em 0.15em',
    textAlign: 'right',
    background: accentColor,
    
    ' button': {
      lineHeight: '1em',
      padding: '0.15em 0.25em',
      border: 'none',
      borderRadius: '0.25em',
      cursor: 'pointer',
      background: '#fff',
      
      '[disabled]': {
        opacity: 0,
        cursor: 'default',
      },
    },
  }),
  
  body: css({
    overflow: 'hidden',
    border: `solid 1px ${ accentColor }`,
    borderRadius: '0.4em',
    margin: '0 1em',
    boxShadow: '0 20px 35px 0px rgba(0,0,0,0.25)',
    background: '#fff',
    position: 'relative',
  }),
  
  content: css({
    padding: '0.5em 1em',
  }),
};

export default styles;