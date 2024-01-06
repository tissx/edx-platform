/**
 * Unit Item.
 */

/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import UnitEffort from './UnitEffort';
import UnitTitle from './UnitTitle';
import UnitProgress from './UnitProgress';
import UnitMedia from './UnitMedia';
import EnrollmentsCounter from "./EnrollmentsCounter";
import CompletionStatus from "./CompletionStatus";
import Button from '@material-ui/core/Button';
import styles from "./unitItem.module.css";

export const UnitItemContainer = ({title, effort, count, completionStatus, progress, imageUrl, videoUrl, goToUnitUrl}) => {

    return (
      <div className={'collapsible-course-description'}>
          <div className="collapsible-course-description__text">
              <div className="course-name-holder">
                  <UnitTitle text={title} />
              </div>
              <div className={styles['bottom-holder']}>
                  <div className="wrap">
                      <UnitEffort effort={effort} />
                      <EnrollmentsCounter count={count} />
                      <CompletionStatus completionStatus={completionStatus} />
                  </div>
                  <div className={styles['progress-and-button']}>
                      <Button
                          className={styles.btn}
                          href={goToUnitUrl}
                      >
                          Go to unit
                      </Button>
                      <UnitProgress progressValue={progress} />
                  </div>
              </div>
          </div>
          <UnitMedia imageUrl={imageUrl} videoUrl={videoUrl} />
      </div>
  );
};

UnitItemContainer.propTypes = {};

export default UnitItemContainer;
