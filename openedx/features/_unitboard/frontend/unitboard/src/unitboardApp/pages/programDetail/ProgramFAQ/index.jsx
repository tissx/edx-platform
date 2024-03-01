/**
 * Program FAQ Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import classNames from 'classnames';
import styles from './Faq.module.css';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

const ProgramFAQContainer = (programfaq) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

// console.log("programfaq", programfaq)
    return (
        <>
        <section>
        <div className="container">
            <h1 className="theading-title pb-3 faq-title">FAQs</h1>
           

            <div className={classes.root}>
      
            {programfaq.programfaq.map((faq) => (
      
              <Accordion  className={styles.accordion} expanded={expanded === faq['id']} onChange={handleChange(faq['id'])}>
                <AccordionSummary 
                className={styles.accordionsummary}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id={faq['id']}
                >
                  <Typography className={styles.heading}>{faq['question']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={styles.accordioncontent}>
                  {faq['answer']}
                  </Typography>
                </AccordionDetails>
              </Accordion>

             ))} 
    
            </div>



        </div>
    </section>

       </>
    );
};

ProgramFAQContainer.propTypes = {}

export default ProgramFAQContainer
// 