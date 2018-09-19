export default (param, value) => {
  const params = new URLSearchParams(window.location.search);
  
  params.set(param, value);
  window.history.replaceState(
    {}, '', 
    decodeURIComponent(`${ window.location.pathname }?${ params }`)
  );
};