import React, { useEffect, useState, useRef } from "react";
import './assessment-admin-dash.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



const Modal = ({ submission_id_for_override_modal, opengrademodal  }) => {
  const submission_id = submission_id_for_override_modal.submission_id
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));

 
  const [record, setRecord] = useState([])
  const classes = useStyles();
  const [checked, setCheckBoxChecked] = useState(false);

  const onChangeAttribute = (value) => {
    setCheckBoxChecked(value);
  };
 
  

  const getData = () =>
  {
      fetch('/unitboard/api/detail/override-grade-details/?submission='+submission_id)
      .then(response => response.json())
      .then(res => setRecord(res.data))

  }
  // const scoreRef = useRef(null);
  // const feedbackRef = useRef(null);
  // const submission = useRef(null);
  // const [title, setTitle] = useState('')
  // const sabiha = (e) => {
  //   const gradetype = ''
  //   let ele = document.getElementsByTagName('input');
  //   for(var i = 0; i < ele.length; i++) {
  //     if(ele[i].type="radio") {
  //       if(ele[i].checked){
  //         if (!ele[i] == null){
  //           console.log("gradetype",ele[i].name);
  //           gradetype = ele[i].name
  //         }
            
  //       }
  //     }
  //   }
  //   console.log("title", title);
  //   const res = fetch('http://localhost:18000/unitboard/api/detail/grades_override_by_admin?typegrade='+'Good'+ '&received_score='+scoreRef.current.value+
  //   '&feedback=' +feedbackRef.current.value+ '&submission_uuid=' +submission.current.value, {
  //       method: 'get',
  //             headers: { 'Content-Type': 'application/json' },
  //       })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //           alert(responseJson)
  //           return "done";
  //       })
  //       .catch((error) => {
  //           console.error(error);
  //             //  e.preventDefault();
  //       });
  //       e.preventDefault();
  //     } 



  const closeModal = () => {
    opengrademodal(false);
}


  const [count, setCount] = React.useState(0);

  useEffect(() => {
        getData();
        setCount(1);
  }, []);


  function handleOnChange(e) {
    this.setState({ selectedOption: e.target.value});
  }


  const formSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    var ideas_feedback = formObject.ideas_feedback
    var content_feedback = formObject.content_feedback
    var idea_option = formObject.idea
    var content_option = formObject.content
    const res = fetch('/unitboard/api/detail/grades_override_by_admin?ideas_feedback='+ideas_feedback+ 
    '&content_feedback=' +content_feedback+ '&content_option=' +content_option+ 
    '&idea_option='+idea_option+ '&submission=' +submission_id, {
        method: 'get',
              headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return "done";
        })
        .catch((error) => {
            console.error(error);
              //  e.preventDefault();
        });
    
  }

  return (
    <>
      <div className="darkBG" onClick={() => opengrademodal(false)} />
      <div className="centered">
        <div className="modal">
        <form onSubmit={formSubmit}>
          <div className="modalHeader">
            <h4 className="heading">GRADE OVERRIDE DETAILS</h4>
          </div>
          <div className="modalContent">
             {record.map((names,index)=> 
             
          <div className="assessment-prompt">
                    <h2>Ideas</h2><br /> 
                    <div className="assessment-prompt">
                    <h4 className="text-heading">OPTIONS</h4><br />
                                 
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <Paper className={classes.paper}>POOR<br/>
                                    <input type="radio" value="poor" 
                                    name='idea' id='poor' 
                                />
                                </Paper>
                            </Grid>      

                            <Grid item xs>
                                <Paper className={classes.paper}>FAIR<br/>
                                <input type="radio" value="fair" 
                                name='idea'  id='fair'/>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className={classes.paper}>GOOD<br/>
                                <input type="radio" value="good"
                                name='idea' id='good'/>
                                </Paper>
                            </Grid>
                        </Grid>                            
                    <hr />  
                    <Grid container spacing={4}>
                    <Grid item xs>
                            <Paper className={classes.paper}>MAX SCORE <br/>
                                <label>
                                 {names.ideas_score_max}
                                </label>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className={classes.paper}> SCORE RECEIVED <br/>
                                <label>
                                <input type="number" placeholder={names.ideas_score_received} 
                                    name='score_ideas' maxlength="2" min="0" max={names.ideas_score_max}  />
                                </label>
                            </Paper>
                        </Grid>                 
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                                <Paper className={classes.paper}> FEEDBACK
                                <br/><label className="custom-field one">
                                        <textarea
                                        name ='ideas_feedback'
                                        className="text-heading">
                                         {names.ideas_feedback} 
                                        </textarea>
                                    </label>
                                </Paper>        
                            </Grid>
                    </Grid>
                    </div>          
                    <h2>Content</h2><br />
                    <div className="assessment-prompt">
                    <h4 className="text-heading">OPTIONS</h4><br />
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <Paper className={classes.paper}>POOR<br/>
                                    <input type="radio" value="poor" 
                                    name='content' id='poor' 
                                />
                                </Paper>
                            </Grid>      

                            <Grid item xs>
                                <Paper className={classes.paper}>FAIR<br/>
                                <input type="radio" value="fair" 
                                name='content' id='fair' />
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className={classes.paper}>GOOD<br/>
                                <input type="radio" value="good"
                                name='content' id='good' />
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className={classes.paper}>Excellent<br/>
                                <input type="radio" value="excellent"
                                name='content' id='excellent' />
                                </Paper>
                            </Grid>
                        </Grid>  
                        
                                                  
                    <hr />  
                    <Grid container spacing={4}>
                    <Grid item xs>
                            <Paper className={classes.paper}>MAX SCORE <br/>
                                <label>
                                 {names.content_score_max}       
                                </label>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className={classes.paper}> SCORE RECEIVED <br/>
                                <label>
                                <input type="number"
                                placeholder={names.content_score_recieved}
                                    name="content_score" maxlength='2' min="0" 
                                    max={names.content_score_max} />
                                </label>
                            </Paper>
                        </Grid>                 
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                                <Paper className={classes.paper}> FEEDBACK
                                <br/><label className="custom-field one">
                                        <textarea       
                                        name ='content_feedback'
                                        className="text-heading">
                                        {names.content_feedbacks}
                                        </textarea>
                                    </label>
                                </Paper>        
                            </Grid>
                    </Grid>
                    </div>      
            </div>
            )}            
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button id="testing" className="deleteBtn" onClick={() => opengrademodal(false)}>
                CANCEL
              </button>
              <button type="submit"
                className="cancelBtn"
                onClick={closeModal}
              >
                SAVE
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;