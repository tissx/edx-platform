import React from 'react';
import PropTypes from 'prop-types';

const UnitTitle = ({ text = null }) => text && <h2 className="course-name">{text}</h2>;

UnitTitle.propTypes = {
  text: PropTypes.string,
};

export default UnitTitle;
