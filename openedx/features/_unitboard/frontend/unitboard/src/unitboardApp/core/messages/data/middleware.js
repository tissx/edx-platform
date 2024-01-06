import { gettext as _ } from 'setupAPI';
import { showMessage } from './actions';

const messagesMiddleware = ({ dispatch }) => next => action => {
  next(action);

  // API:
  if (action.type.includes('FAILURE')) {
    if (action.error === true) {
      // Status: 403
      if (action.payload.status === 403) {
        dispatch(showMessage(_('Authorisation problem detected. Please refresh the page.')));
      }

      // Status: 404
      if (action.payload.status === 404) {
        dispatch(showMessage(_('Not Found...')));
      }

      // Status: 400
      if (action.payload.status === 400) {
        dispatch(showMessage(_('Server rejected request...')));
      }

      // Status: 500
      if (action.payload.status === 500) {
        dispatch(showMessage(_('Server informed about issues...')), { preventDuplicate: true });
      } else {
        dispatch(showMessage(_('Something went wrong...')));
      }
    }
  }
};

export default messagesMiddleware;
