import { css } from 'glamor';

const styles = {
  root: css({
    fontFamily: 'Arial',
  }),
  
  inputContainer: css({
    textAlign: 'center',
    marginTop: '0.5em',
    
    ' input, button': {
      border: 'solid 1px #aaa',
      padding: '0.3em 0.5em',
    },
    
    ' input': {
      borderRight: 'none',
      borderRadius: '0.25em 0 0 0.25em',
      
      ' + button': {
        borderRadius: '0 0.25em 0.25em 0',
      },
    },
  }),
};

export default styles;
