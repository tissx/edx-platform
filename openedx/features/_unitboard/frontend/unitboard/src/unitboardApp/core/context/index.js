/**
 * Global context.
 */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { contextAvailable } from './data/actions';

const ContextContainer = ({ contextData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contextAvailable(contextData));
  }, []);

  return null;
};

export default ContextContainer;
