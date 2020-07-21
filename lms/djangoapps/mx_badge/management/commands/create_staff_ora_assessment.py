"""
Create dummy submissions and assessments for testing.
"""
import logging

from django.core.management.base import BaseCommand, CommandError
# from courseware.models import StudentModule
# from django.contrib.auth.models import User
# from opaque_keys.edx.keys import CourseKey
# from student.models import anonymous_id_for_user, get_user_by_username_or_email,AnonymousUserId
# from openassessment.workflow.models import AssessmentWorkflow
# from submissions import api as sub_api
from openassessment.workflow import api as workflow_api
from openassessment.assessment.api import staff as staff_api
from openassessment.xblock.data_conversion import clean_criterion_feedback, verify_assessment_parameters
from openassessment.assessment.errors import (
    StaffAssessmentRequestError, StaffAssessmentInternalError
)
from mx_badge.utils import get_staff_anonymous_id,get_incomplete_submissions

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    """
    This will do:
        * get incomplete peer ORA submissions
        * create staff assessment for these submissions to overirde/give the grade.
    """

    help = 'Create staff  assessment for the submission'
    prompts=[{'description': u'Prepare a plan for online class with your students (of any grade) using either a synchronous or asynchronous communication tool and post it here. You can upload the plan as a PDF or image file. Your plan should have:\n- Topic for online session \n- Approximate number of student attendees\n- Mention which synchronous/asynchronous communication tool you will use and why\n- What all features of the tool will you be using during the session\n- Will the session include lecture or interactive student activities? Mention giving brief details.\n- Will there be any home assignment for students post your session? If yes, mention briefly.\n- Will you be creating any resources to conduct the session like for example- Powerpoint, Video or audio? If yes, please mention in brief.\n'}]

    rubric_criteria_with_labels=[{u'prompt': u'Assess the content of the submission', u'feedback': u'required', u'label': u'Content of the Plan', u'order_num': 0, u'options': [{u'order_num': 0, u'explanation': u'Difficult for the reader to understand the main idea of the plan. Includes little information with few or no details or unrelated details as mentioned in the assignment to be covered by learner. ', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'Presents the main idea or plan with sufficient information and supporting details included many points as mentioned in the assignment with only few details missing.  Still the plan stays focused on topic and task.  ', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'Includes in-depth information and exceptional supporting details including almost all the points as mentioned in the assignment.  Explores all facets of the assignment.', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Ideas'}, {u'prompt': u'Assess the pedagogy(methods of instructions) mentioned in the submitted plan', u'feedback': u'required', u'label': u'Pedagogy as mentioned in the plan', u'order_num': 1, u'options': [{u'order_num': 0, u'explanation': u'The plan does not mention any scope for interactive session allowing active participation of students, exploring resources, discussion. The plan focuses on lecture method pedagogy, leaving no or very less room for active participation.', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'The plan allows somewhat sufficient scope for application of different pedagogies allowing a blend of various activities like lecture session, two way student-teacher interaction, active participation of students in discussion and actviities.', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'The plan includes in-depth information and sufficient scope of blending different pedagogies in the online session for ensuring maximum student-teacher participation and active engagement. ', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Content'}]
    rubric_criteria=[{u'prompt': u'Assess the content of the submission', u'feedback': u'required', u'label': u'Content of the Plan', u'order_num': 0, u'options': [{u'order_num': 0, u'explanation': u'Difficult for the reader to understand the main idea of the plan. Includes little information with few or no details or unrelated details as mentioned in the assignment to be covered by learner. ', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'Presents the main idea or plan with sufficient information and supporting details included many points as mentioned in the assignment with only few details missing.  Still the plan stays focused on topic and task.  ', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'Includes in-depth information and exceptional supporting details including almost all the points as mentioned in the assignment.  Explores all facets of the assignment.', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Ideas'}, {u'prompt': u'Assess the pedagogy(methods of instructions) mentioned in the submitted plan', u'feedback': u'required', u'label': u'Pedagogy as mentioned in the plan', u'order_num': 1, u'options': [{u'order_num': 0, u'explanation': u'The plan does not mention any scope for interactive session allowing active participation of students, exploring resources, discussion. The plan focuses on lecture method pedagogy, leaving no or very less room for active participation.', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'The plan allows somewhat sufficient scope for application of different pedagogies allowing a blend of various activities like lecture session, two way student-teacher interaction, active participation of students in discussion and actviities.', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'The plan includes in-depth information and sufficient scope of blending different pedagogies in the online session for ensuring maximum student-teacher participation and active engagement. ', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Content'}]

    rubric_dict={
    "prompts" :  prompts,
    "criteria": rubric_criteria_with_labels
    }
    def staff_assess(self,data):
        """
        Create a staff assessment from a staff submission.
        """
        if 'submission_uuid' not in data:
            return {
                'success': False, 'msg': (u"The submission ID of the submission being assessed was not found.")
            }
        try:
            assessment = staff_api.create_assessment(
                data['submission_uuid'],
                data['scorer_id'],
                data['options_selected'],
                clean_criterion_feedback(self.rubric_criteria, data['criterion_feedback']),
                data['overall_feedback'],
                self.rubric_dict
            )
            assess_type = data.get('assess_type', 'regrade')
            #publish_assessment_event("openassessmentblock.staff_assess", assessment, type=assess_type)
            workflow_api.update_from_assessments(
                assessment["submission_uuid"],
                None,
                override_submitter_requirements=(assess_type == 'regrade')
            )

        except StaffAssessmentRequestError:
            logger.warning(
                u"An error occurred while submitting a staff assessment "
                u"for the submission {}".format(data['submission_uuid']),
                exc_info=True
            )
            msg ="Your staff assessment could not be submitted."
            return {'success': False, 'msg': msg}
        except StaffAssessmentInternalError:
            logger.exception(
                u"An error occurred while submitting a staff assessment "
                u"for the submission {}".format(data['submission_uuid']),
            )
            msg = "Your staff assessment could not be submitted."
            return {'success': False, 'msg': msg}
        else:
            return {'success': True, 'msg': u""}

    def handle(self, *args, **options):
        """
        Execute the command.

        Args:
            no argument or input data is internally created
        """
        course_id="course-v1:TISSx-COOL+COOLTOL01+2020_COOL_TOL_EN_01"
        staff_anonymous_user=get_staff_anonymous_id(course_id)
        staff_anonymous_user_id=staff_anonymous_user.anonymous_user_id
        scorer_id=staff_anonymous_user_id #"7adf5e337b2e9af2523f0aeacdb6822c" #staff_anonymous_user_id
        data={
                'scorer_id':scorer_id,
                'options_selected':{"Ideas": "Good", 'Content': "Good"},
                'criterion_feedback':
                    {
                            "Content of the Plan": "Includes in-depth information and exceptional supporting details including almost all the points as mentioned in the assignment.  Explores all facets of the assignment.",
                            "Pedagogy as mentioned in the plan": "The plan includes in-depth information and sufficient scope of blending different pedagogies in the online session for ensuring maximum student-teacher participation and active engagement."
                    },
                'overall_feedback': "System generated grades.",
                'assess_type':"regrade",
                }
        ass_qs=get_incomplete_submissions(course_id=course_id)
        if not ass_qs:
            logger.info ('No incomplete submission found')
        for sub in ass_qs:
            data['submission_uuid']=sub['submission_uuid']
            logger.info ('submission_uuid [%s]  in [%s] status',data['submission_uuid'],sub['status'])
            msg=self.staff_assess(data)
            logger.info ('staff_assess MSG [%s] ',msg)
