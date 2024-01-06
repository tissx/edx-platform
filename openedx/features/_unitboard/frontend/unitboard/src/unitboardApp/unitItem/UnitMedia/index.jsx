import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { openModal } from '../../core/modalWindow/data/actions';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './UnitMedia.module.css';

const UnitMedia = ({ imageUrl, videoUrl }) => {
  const dispatch = useDispatch();
  const videoAvailable = !!videoUrl;

  const handleOpen = () => {
    if (videoAvailable) {
      dispatch(openModal(body));
    }
  };

  const body = (
    <div className={styles['player-wrapper']}>
      <ReactPlayer className={styles['react-player']} url={videoUrl} playing width="100%" height="100%" />
    </div>
  );

  return (
    <div className="collapsible-course-description__visual">
      {imageUrl && (
        <div
          onClick={handleOpen}
          className={classNames('media', { [styles.video]: videoAvailable })}
        >
          <div className="hero" style={{ backgroundImage: `url(${imageUrl})` }}>
            {videoUrl && (
              <div className="play-intro">
                <svg>
                  <use xlinkHref="#play-btn" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

UnitMedia.propTypes = {
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
};

export default UnitMedia;
