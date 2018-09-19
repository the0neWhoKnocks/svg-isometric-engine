const NAME = 'Builder';
const initialState = () => ({
  dialogError: undefined,
  nextPage: undefined,
  previousView: undefined,
  project: '',
  projects: [],
  shellClass: '',
  scrollPos: {},
  viewData: {},
});

export {
  NAME,
  initialState,
};
