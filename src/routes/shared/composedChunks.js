import composeChunk from 'UTILS/composeChunk';

export const Builder = composeChunk({
  load: () => import(
    /* webpackChunkName: "Builder" */
    'COMPONENTS/views/Builder'
  ),
  type: 'builder',
});

export const NotFound = composeChunk({
  load: () => import(
    /* webpackChunkName: "NotFound" */
    'COMPONENTS/views/NotFound'
  ),
  type: 'notfound',
});
