/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Completion Status
 */

import React from 'react';
import styles from './unitProgress.module.css'

export const UnitProgressContainer = ({ progressValue = 0, heading = 'Unit Progress' }) => {
    if (progressValue > 100) {
        console.error(`UnitProgress: progress value must be in 0-100 range - got ${progressValue}`);
        progressValue = 100;
    }

    const roundedValue = Math.round(progressValue);

    return (
        <div className="unit-progress">
            <p>{heading}</p>
            <div className={styles.wrap}>
                <div className="unit-progressbar">
                    <div className="unit-progressbar-value" style={{ width: `${roundedValue}%` }} />
                </div>
                <span className="unit-progressbar-count">{`${roundedValue}%`}</span>
            </div>
        </div>
    );
};

UnitProgressContainer.propTypes = {};

export default UnitProgressContainer;
