import React, { useEffect, useState, useRef } from "react";
// import styles from './_assessment-submissions-moderator-list.css';
import './assessment-admin-dash.css';





 
const Modal = ({ submission_id_for_modal, setIsOpen }) => {
  const submissionid = submission_id_for_modal.submission_id
  const student_id   = submission_id_for_modal.student_id
  const item_id      = submission_id_for_modal.item_id
  const course_id    = submission_id_for_modal.course_id
  const [record, setRecord] = useState([])
  // const [record2, setData] = useState([])
  const [count, setCount] = React.useState(0);
    
  const getData = () =>
  { 
      fetch('/unitboard/api/detail/get-assessment-evaluated-details?submission=' +submissionid+
      '&course_id=' +course_id+ '&item_id=' +item_id+ '&course_id=' +course_id+ 
      '&student_id=' +student_id)
      .then(response => response.json())
      .then(res => setRecord(res.data))

  }

 
  const closeModal = () => {
    setIsOpen(false);

  }

 
  useEffect(() => {
    getData();
    setCount(1);
}, []);

  


  return (
    <div>
      {(() => {
        if(!submissionid){
          return (
            <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
                <div className="centered">
                      <div className="modal">
                        <div className="modalContent">
                            <h4 className="text-heading-turnitin">Your Feedback :&nbsp;&nbsp;</h4>    
                            <br /><br />   
                            {record.map((names,index)=> 
                                <textarea className="text-heading" value={names.feedback}>
                                </textarea>
                              )}
                        </div>  
              </div>
              </div>
              </>
          )
        }
    else{
      return(
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
       
          <div className="modalHeader">
            <h4 className="heading"> Details</h4>
          </div>
          <div className="modalContent">
            <div className="assessment-prompt">
            <h4 className="text-heading">Assessment Prompt</h4>
            {record.map((names,index)=> <p className="paragraph-text">{names.assessment_question}</p> )}
        </div> 
        <div className="assessment-prompt">
            <h4 className="text-heading">Learner Response</h4>
           
                {record.map((names,index)=> <p className="paragraph-text">{names.learner_answer}</p> )}
            </div><hr />
               <h4 className="text-heading">Staff Response</h4>
            <div class="tbl-header">
              <table>
                <thead>
                  <tr>
                  <th hidden='hidden'>Submission</th>
                  <th hidden='hidden'>Assessment</th>
                    <th>Criterion</th>
                    {/* <th>Option selected</th> */}
                    <th>Score Received</th>
                    <th>Max. Score</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
              </table>
            </div>
          <div class="tbl-content">
            <table>
                    <tbody>
                          
                    {record.map((names,index)=> 
                            <tr key={index}>
                              <td hidden='hidden'>{names.submission_uuid}</td>
                              <td hidden='hidden'>{names.assessment}</td>
                              <td>{names.criterion}</td>
                              {/* <td>{names.option_selected}</td> */}
                              <td>{names.score_recieved}</td>
                              <td>{names.max_score}</td>
                              <td>{names.feedback}</td>
                                  {/* <td><button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#myModal">View Details</button></td> */}
                                </tr>    
                          )}
                    </tbody>
            </table>
          </div>
           <div className="assessment-prompt">
                   <h4 className="text-heading">Moderator Feedback&nbsp;&nbsp;</h4>
                    {record.map((names,index)=> <p className="paragraph-text">{names.moderator_feedback}</p> )}
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button id="testing" className="deleteBtn" onClick={() => setIsOpen(false)}>
                CANCEL
              </button>
              {/* <button
                className="cancelBtn"
                onClick={closeModal}
              >
                SAVE
              </button> */}
            </div>
          </div>

        </div>
      </div>
    </>
   
        )  }

    })()}
    </div>
  );
};

export default Modal;