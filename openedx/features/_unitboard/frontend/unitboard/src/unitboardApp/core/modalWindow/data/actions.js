import { MODAL_WINDOW_OPEN, MODAL_WINDOW_CLOSED } from './actionTypes';

export const openModal = body => ({
  type: MODAL_WINDOW_OPEN,
  payload: body,
});

export const closeModal = () => ({
  type: MODAL_WINDOW_CLOSED,
});
