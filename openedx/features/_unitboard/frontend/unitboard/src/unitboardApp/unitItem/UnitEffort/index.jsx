import React from 'react';
import PropTypes from 'prop-types';

const UnitEffort = ({ effort = null }) =>
  effort && (
    <div className="item">
      <svg>
        <use xlinkHref="#clock" />
      </svg>
      <span>{effort}</span>
    </div>
  );

UnitEffort.propTypes = {
  effort: PropTypes.string,
};

export default UnitEffort;
