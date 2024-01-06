import './assessment-admin-submission-list.css';
import React, {useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from './assessmentAdminModal';
import ReleaseGradeModal from './adminReleaseGradeModal';
import OverrideModal from './adminGradeOverrideModal';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AssessmentAdminSubmissionList = ({ assessmentadminListDetail = {}}) => {
  const classes = useStyles();
      
  const [isOpen, setIsOpen] = useState(false);
  const [isOpengrade, opengrademodal] = useState(false);
  const [isReleasegrade, openReleaseGrademodal] = useState(false);
  const [sub, subvar] = useState("")
  const [itemvar, item_var_set] = useState("")
  const [studentvar, student_var_set] = useState("")
  const [coursevar, course_var_set] = useState("")
  const [course_id_var, course_id_var_setter] = useState("")
  const [submission_variable, overide_submission_variable] = useState("")
  const [gradeoverride_variable, gradeoveride_submission_state] = useState("")
  var submission_id = ''
  var override_submission_id = ''
  var grade_override_submissionid = ''
  var courseid = ''
  var itemid = ''
  var studentid = ''
    
  const scroll_up = () =>  {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    }

    

    const showdetails = (submission, item_id, course_id, student_id) =>{
      setIsOpen(true);
      subvar(submission);
      item_var_set(item_id)
      course_var_set(course_id)
      student_var_set(student_id)
    }

    const showgrademodal = (submission_ref) =>{
      opengrademodal(true);
      overide_submission_variable(submission_ref);
      override_submission_id = submission_ref    
    }

    const gradeoverridedetails = (grade_submission_var, course_id_ref, student_id, item_id) => {
      openReleaseGrademodal(true);
      subvar(grade_submission_var);
      item_var_set(item_id)
      course_var_set(course_id_ref)
      student_var_set(student_id)
    }
    
    return (
      // <React.Fragment>
      <TableContainer component={Paper}>
        {isOpen && <Modal style={{opacity:10}} animation={false} 
        dialogClassName="fullscreenmodal" submission_id_for_modal={{
          "submission_id": sub, 
          "course_id": coursevar, 
          "item_id": itemvar,
          "student_id": studentvar
        }} 
        setIsOpen={setIsOpen} />}
        
        
        {isOpengrade && <OverrideModal style={{opacity:10}} animation={false} 
          dialogClassName="fullscreenmodal" 
          submission_id_for_override_modal={{
            "submission_id": submission_variable}}
          opengrademodal={opengrademodal} />}
         

        {isReleasegrade && <ReleaseGradeModal 
          style={{opacity:10}} 
          animation={false} 
          dialogClassName="fullscreenmodal" 
          course_id_release_grade={{
            "submission_id": sub, 
            "course_id": coursevar, 
            "item_id": itemvar,
            "student_id": studentvar}}
          
        grade_override_submission_id={{"submission_id": gradeoverride_variable}}
         openReleaseGrademodal={openReleaseGrademodal} />}
         
         <div className={'course_heading'}><span>{assessmentadminListDetail.display_name}</span></div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Submission ID</TableCell> */}
              <TableCell align="right">Submission-ID</TableCell>
              <TableCell align="right">Student Email</TableCell>
              <TableCell align="right">Student Name</TableCell>
              <TableCell align="right">Submitted On</TableCell>
              <TableCell align="right">Evaluated On</TableCell>
              <TableCell align="right">Evaluated By</TableCell>
              <TableCell align="right">Moderated On</TableCell>
              <TableCell align="right">Moderated By</TableCell>
              <TableCell align="right">Days Since Submitted</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Released</TableCell>
              {/* <TableCell align="right">Days since submitted</TableCell> */}
              {/* <TableCell align="right">Assessment id</TableCell> */}
              {/* <TableCell align="right">Graded By</TableCell> */}
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assessmentadminListDetail.graded_list.map((row) => 
            (
              <TableRow key={row.submission_uuid}>
                {/* <TableCell component="th" scope="row">
                  {row.submission_uuid}
                </TableCell> */}
                <TableCell align="right">{row.ext_id}</TableCell>
                <TableCell align="right">
                  <div className={'text-container'}>
                      {row.learner_email}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className={'text-container'}>
                    {row.learner_name}
                  </div>
                 </TableCell>
                
                <TableCell align="right">{row.submitted_on}</TableCell>
                <TableCell align="right">{row.evaluated_on}</TableCell>
                <TableCell align="right">{row.evaluated_by}</TableCell>
                <TableCell align="right">{row.moderated_on}</TableCell>
                <TableCell align="right">{row.moderated_by}</TableCell>
                <TableCell align="right">{row.days_since_submitted}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.grade_released}</TableCell>
                <TableCell align="left" style={{display: "contents"}}>
                  <a style={{cursor: "pointer"}} onClick={(e) => {showdetails(row.submission_uuid, row.item_id, row.course_id, row.student_id); scroll_up()}}>Mod. Feedback</a><br />
                  {/* {row.submission_uuid  ? ( */}
                  {/* // <a style={{cursor: "pointer"}} onClick={() => showgrademodal(row.submission_uuid)}>Override</a>
                  // ):(sa
                  //   <a href={`/unitware/units/${row.course_id}/assessment/?context_block=${row.item_id}`}  target="_blank">Override</a>
                  // )}/<br /> */}
                   <a href={`/unitware/units/${row.course_id}/assessment/?context_block=${row.item_id}`}  target="_blank">Override</a><br />
                  
                  {/* <a style={{cursor: "pointer"}} onClick={handleClickOpen(row.submission_uuid)}>OverRide</a>/{'\n'} */}
                  <a style={{cursor: "pointer"}} onClick={() => {gradeoverridedetails(row.submission_uuid, row.course_id, row.student_id, row.item_id); scroll_up()}}>Release</a>
                </TableCell>
                
                      
                {/* <TableCell align="right"> <a href={`/unitware/units/${row.course_id}/assessment/?context_block=${row.item_id}`}  target="_blank">View</a></TableCell> */}
                  
                      
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default AssessmentAdminSubmissionList;

  