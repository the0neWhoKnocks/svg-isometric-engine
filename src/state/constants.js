const NAME = 'Builder';
const initialState = () => ({
  nextPage: undefined,
  previousView: undefined,
  projects: [],
  shellClass: '',
  scrollPos: {},
  viewData: {},
});

export {
  NAME,
  initialState,
};
