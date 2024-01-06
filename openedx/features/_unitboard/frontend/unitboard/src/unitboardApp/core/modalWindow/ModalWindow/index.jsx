import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@material-ui/core';
import styles from './ModalWindow.module.css';

const ModalWindow = ({ open, onClose, children }) => {
    return (
        children && (
            <Modal
                open={open}
                onClose={onClose}
                className={styles.paper}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {children}
            </Modal>
        )
    );
}


ModalWindow.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default ModalWindow;
