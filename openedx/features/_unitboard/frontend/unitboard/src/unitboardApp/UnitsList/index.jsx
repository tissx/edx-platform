import React from 'react';
import * as R from 'ramda';
import UnitItem from "../unitItem";

const UnitsList = ({ unitItems = [] }) => {
    return (
        <>
            {
                R.map(
            ({ title, effort, count, completion_status, progress, image, video, go_to_unit_url }) => (
                    <UnitItem
                        title={title}
                        effort={effort}
                        count={count}
                        completionStatus={completion_status}
                        progress={progress}
                        imageUrl={image}
                        videoUrl={video}
                        goToUnitUrl={go_to_unit_url}
                    />
                    ),
                    unitItems
                )
            }
        </>
    );
}

export default UnitsList;
