/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Enrollments Counter
 */

import React from 'react';
import * as R from "ramda";

export const EnrollmentsCounterContainer = ({count = null}) => {
  return (
      !R.isNil(count) && (
          <div className="item">
              <svg>
                  <use xlinkHref="#user" />
              </svg>
              <span>{count}</span>
          </div>
      )
  );
};

EnrollmentsCounterContainer.propTypes = {};

export default EnrollmentsCounterContainer;
