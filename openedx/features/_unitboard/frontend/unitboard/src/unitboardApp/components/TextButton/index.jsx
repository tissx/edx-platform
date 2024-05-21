import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import styles from './TextButton.module.css';
import classNames from 'classnames';

const TextButton = ({ text, disabled, onClick, accent, color }) => {
  return (
    <Button
      component="span"
      disabled={disabled}
      onClick={onClick}
      className={classNames({
        [styles.secondary]: accent === 'secondary',
        [styles.primary]: accent === 'primary',
        [styles['primary-color']]: color === 'primary-color',
        [styles['secondary-color']]: color === 'secondary-color',
      })}
    >
      {text}
    </Button>
  );
};

TextButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default TextButton;
