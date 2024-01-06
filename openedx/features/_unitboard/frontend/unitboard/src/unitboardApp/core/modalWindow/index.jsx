/**
 * Modal Window
 */

import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import ModalWindow from './ModalWindow'
import {closeModal} from "./data/actions";


export const ModalWindowContainer = () => {
  const {open, body} = useSelector(state => state.modalWindow);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal())
  };

  return <ModalWindow open={open} onClose={handleClose}>
      {body}
  </ModalWindow>;
};

ModalWindowContainer.propTypes = {};

export default ModalWindowContainer

