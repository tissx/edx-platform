import { SNACKBAR_DESTROY, SNACKBAR_ENQUEUE } from './actionTypes';

export const showMessage = (message, options) => ({
  type: SNACKBAR_ENQUEUE,
  meta: { key: new Date().getTime() + Math.random() },
  payload: { message, options },
});

export const destroyMessage = key => ({
  type: SNACKBAR_DESTROY,
  meta: { key },
});
