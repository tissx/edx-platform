/**
 *
 * Notistack
 *
 */

/* eslint-disable react/prop-types,react-hooks/exhaustive-deps,import/no-unresolved */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { destroyMessage } from '../data/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const Notistack = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const { enqueueSnackbar } = useSnackbar();

  let displayed = [];

  const storeDisplayed = id => {
    displayed = [...displayed, id];
  };

  useEffect(
    () => {
      messages.forEach(notification => {
        // Do nothing if snackbar is already displayed
        if (displayed.includes(notification.key)) return;
        // Display snackbar using notistack
        enqueueSnackbar(notification.message, notification.options);
        // Keep track of snackbars that we've displayed
        storeDisplayed(notification.key);
        // Dispatch action to remove snackbar from redux store
        dispatch(destroyMessage(notification.key));
      });
    },
    [messages],
  );

  return null;
};

Notistack.propTypes = {
  enqueueSnackbar: PropTypes.func,
  displayed: PropTypes.array,
};

export default Notistack;
