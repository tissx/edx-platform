/**
 * Global context.
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { contextAvailable } from './data/actions';

const ContextContainer = ({ contextData }) => {
  const dispatch = useDispatch();
  dispatch(contextAvailable(contextData));

  // useEffect(() => {
  //   dispatch(contextAvailable(contextData));
  // }, []);

  return null;
};

export default ContextContainer;
