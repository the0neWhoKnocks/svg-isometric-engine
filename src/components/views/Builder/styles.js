import { css } from 'glamor';

const globals = () => {
  css.insert(`
    .view.is--builder {
      background-color: #666;
    }
  `);
};

const styles = {
  // root: css({
  //   backgroundColor: '#666',
  // }),
};

export default styles;
export {
  globals,
};
