import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import styles from "../../unitItem/unitItem.module.css";

const Centered = ({ children }) => {
  return (
    <Box display="flex">
      <Box m="auto" className={styles['unit-item-width']}>{children}</Box>
    </Box>
  );
};

Centered.propTypes = {
  children: PropTypes.node,
};

export default Centered;
