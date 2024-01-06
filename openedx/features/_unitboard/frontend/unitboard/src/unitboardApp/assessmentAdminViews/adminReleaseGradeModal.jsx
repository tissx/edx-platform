import React, { useEffect, useState, useRef } from "react";
// import styles from './_assessment-submissions-moderator-list.css';
import './admin-grade-release.css';

const Modal = ({ course_id_release_grade, openReleaseGrademodal }) => {

  const submissionid = course_id_release_grade.submission_id
  const course_id = course_id_release_grade.course_id
  const student_id = course_id_release_grade.student_id
  const item_id  = course_id_release_grade.item_id
   const [count, setCount] = React.useState(0);
  const [records, setRecords] = useState("")
  var released = false

  const releasegrades = () => 

  {
    fetch('/unitboard/api/detail/release_grades?submission=' +submissionid+ 
    '&course_id='+course_id+ '&item_id=' +item_id+ 
    '&student_id=' +student_id)
    .then(response => response.json())

}

    const released_grades = () => 

      {
        fetch('/unitboard/api/detail/released_grade_status?course_id='+course_id+ 
        '&item_id=' +item_id+ 
        '&student_id=' +student_id)
        .then(response => response.json())
        .then(res => setRecords(res.data))

    }

    if(records){
      released = records[0].is_released  
      
    }
  
  
  useEffect(() => {
    released_grades();
    setCount(20);
    }, []);
  
  
  
    return(
      <div>
          {(() => {
            if (released){
              return(
                <>
                <div className="darkBG" onClick={() => openReleaseGrademodal(false)} />
                <div className="centered">
                  <div className="modal">
                    <div className="modalHeader">
                      <h5 className="heading">Release Grade</h5>
                    </div>
                    <div className="modalContent">
                      <div className="assessment-prompt">
                      <h3 className="released-grade-text">GRADE HAS BEEN RELEASED!!. 
                      
                    </h3> 
                  </div> 
                    </div>
                    <div className="modalActions">
                      <div className="actionsContainer">
                      <button id="testing" className="cancelBtn"
                        onClick={() => openReleaseGrademodal(false)}>
                          NO
                        </button>
                        <button
                          className="cancelBtn" 
                          onClick={() => {releasegrades(); openReleaseGrademodal(false)}}
                        disabled>
                          YES
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>

              )

            }
            else{
              return (
                  <>
                    <div className="darkBG" onClick={() => openReleaseGrademodal(false)} />
                    <div className="centered">
                      <div className="modal">
                        <div className="modalHeader">
                          <h5 className="heading">Release Grade</h5>
                        </div>
                        <div className="modalContent">
                          <div className="assessment-prompt">
                          <p className="paragraph-text">By clicking on YES, these given feedback will be shared with the respective learner. 
                          
                          <br>
                          </br>
                          Please make sure before proceeding....</p> 
                      </div> 
                        </div>
                        <div className="modalActions">
                          <div className="actionsContainer">
                          <button id="testing" className="cancelBtn"
                            onClick={() => openReleaseGrademodal(false)}>
                              NO
                            </button>
                            <button
                              className="cancelBtn" 
                              onClick={() => {releasegrades(); openReleaseGrademodal(false)}}
                            >
                              YES
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );

            }
              })()}
      </div>

  )

  // return (
  //   <>
  //     <div className="darkBG" onClick={() => openReleaseGrademodal(false)} />
  //     <div className="centered">
  //       <div className="modal">
  //         <div className="modalHeader">
  //           <h5 className="heading">Release Grade</h5>
  //         </div>
  //         <div className="modalContent">
  //           <div className="assessment-prompt">
  //           <p className="paragraph-text">By clicking on YES, these given feedback will be shared with the respective learner. 
            
  //           <br>
  //           </br>
  //           Please make sure before proceeding....</p> 
  //       </div> 
  //         </div>
  //         <div className="modalActions">
  //           <div className="actionsContainer">
  //           <button id="testing" className="cancelBtn"
  //             onClick={() => openReleaseGrademodal(false)}>
  //               NO
  //             </button>
  //             <button
  //               className="cancelBtn" 
  //               onClick={() => {releasegrades(); openReleaseGrademodal(false)}}
  //             >
  //               YES
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Modal;      	

