/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Completion Status
 */

import React from 'react';
import * as R from "ramda";
import LoopIcon from "@material-ui/icons/Loop";

export const CompletionStatusContainer = ({completionStatus = null}) => {

    return (
        !R.isNil(completionStatus) && (
            <div className="item">
                <LoopIcon htmlColor="#1180ae" />
                <span>{completionStatus}</span>
            </div>
        )
    );
};

CompletionStatusContainer.propTypes = {};

export default CompletionStatusContainer;
