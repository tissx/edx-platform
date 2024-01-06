/**
 * Unitboard Search
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import classNames from 'classnames';
import styles from "./unitboardSearch.module.css";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { searchResultFetching, searchResultClean } from "./data/actions";
import * as R from "ramda";

const UnitboardSearchContainer = () => {
    const unitItems = useSelector(state => state.unitItems);
    const [searchQuery, setValue] = useState('');
    const dispatch = useDispatch();
    const handleSearchSubmit = (unitItems, searchQuery) => {
        setValue(searchQuery);
        if (unitItems && searchQuery.length >= 3) {
            dispatch(searchResultFetching(unitItems, searchQuery));
        } else if (searchQuery.length < 3) {
            dispatch(searchResultClean());
        }
    };
    const handleSearchClean = () => {
        setValue('');
        dispatch(searchResultClean())
    }

    return (
        <div className={classNames(styles['unitboard-search']) + " collapsible-course-description"}>
            <TextField
                id="standard-search"
                label="Type at least 3 characters to search"
                type="search"
                className={classNames(styles['search-field'])}
                value={searchQuery}
                onChange={(e) => handleSearchSubmit(unitItems, e.target.value)}
            />
            <Button
                className={classNames(styles['search-btn'])}
                component="span"
                onClick={handleSearchClean}>
                <ClearIcon />
            </Button>
        </div>
    );
};

UnitboardSearchContainer.propTypes = {}

export default UnitboardSearchContainer
