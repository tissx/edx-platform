import React, { useState } from 'react';
import * as R from "ramda";
import UnitItem from "../../unitItem";
import { Typography } from "@material-ui/core";
import styles from "../unitboardSearch.module.css"

const UnitboardSearchResultsContainer = ({ searchResults = {}}) => {
    return (
        <>
            {
                R.isEmpty(searchResults.units) &&
                <Typography variant="h6" align="center" className={styles['no-results']}>
                    Sorry, no results were found.
                </Typography>}
            {
                !R.isEmpty(searchResults.unit) && R.map(
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
                    searchResults.units
                )
            }
        </>
    );
}

export default UnitboardSearchResultsContainer;
