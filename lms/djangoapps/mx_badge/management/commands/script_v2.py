"""
Create dummy submissions and assessments for testing.
"""
from uuid import uuid4
import copy
import logging
from django.core.management.base import BaseCommand, CommandError
import loremipsum
from submissions import api as sub_api
from openassessment.workflow import api as workflow_api
from openassessment.assessment.api import staff as staff_api
from openassessment.xblock.staff_assessment_mixin import StaffAssessmentMixin
from courseware.models import StudentModule
from django.contrib.auth.models import User
from opaque_keys.edx.keys import CourseKey
from student.models import anonymous_id_for_user, get_user_by_username_or_email
from openassessment.assessment.errors import (
    StaffAssessmentRequestError, StaffAssessmentInternalError
)

from openassessment.xblock.data_conversion import create_rubric_dict
from openassessment.xblock.data_conversion import clean_criterion_feedback, verify_assessment_parameters

logger = logging.getLogger(__name__)


class Command(BaseCommand,StaffAssessmentMixin):
    """
    Create dummy submissions and assessments for testing.
    This will generate fake (lorem ipsum) data for:
        * Submission response text
        * Assessment rubric definition
        * Assessment rubric scores
        * Assessment feedback
    """

    help = 'Create staff  assessment for the submission'

    prompts=[{'description': u'Prepare a plan for online class with your students (of any grade) using either a synchronous or asynchronous communication tool and post it here. You can upload the plan as a PDF or image file. Your plan should have:\n- Topic for online session \n- Approximate number of student attendees\n- Mention which synchronous/asynchronous communication tool you will use and why\n- What all features of the tool will you be using during the session\n- Will the session include lecture or interactive student activities? Mention giving brief details.\n- Will there be any home assignment for students post your session? If yes, mention briefly.\n- Will you be creating any resources to conduct the session like for example- Powerpoint, Video or audio? If yes, please mention in brief.\n'}]

    rubric_criteria_with_labels=[{u'prompt': u'Assess the content of the submission', u'feedback': u'required', u'label': u'Content of the Plan', u'order_num': 0, u'options': [{u'order_num': 0, u'explanation': u'Difficult for the reader to understand the main idea of the plan. Includes little information with few or no details or unrelated details as mentioned in the assignment to be covered by learner. ', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'Presents the main idea or plan with sufficient information and supporting details included many points as mentioned in the assignment with only few details missing.  Still the plan stays focused on topic and task.  ', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'Includes in-depth information and exceptional supporting details including almost all the points as mentioned in the assignment.  Explores all facets of the assignment.', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Ideas'}, {u'prompt': u'Assess the pedagogy(methods of instructions) mentioned in the submitted plan', u'feedback': u'required', u'label': u'Pedagogy as mentioned in the plan', u'order_num': 1, u'options': [{u'order_num': 0, u'explanation': u'The plan does not mention any scope for interactive session allowing active participation of students, exploring resources, discussion. The plan focuses on lecture method pedagogy, leaving no or very less room for active participation.', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'The plan allows somewhat sufficient scope for application of different pedagogies allowing a blend of various activities like lecture session, two way student-teacher interaction, active participation of students in discussion and actviities.', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'The plan includes in-depth information and sufficient scope of blending different pedagogies in the online session for ensuring maximum student-teacher participation and active engagement. ', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Content'}]
    rubric_dict={
     "prompts" :  prompts,
       "criteria": rubric_criteria_with_labels
      }
    rubric_criteria=[{u'prompt': u'Assess the content of the submission', u'feedback': u'required', u'label': u'Content of the Plan', u'order_num': 0, u'options': [{u'order_num': 0, u'explanation': u'Difficult for the reader to understand the main idea of the plan. Includes little information with few or no details or unrelated details as mentioned in the assignment to be covered by learner. ', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'Presents the main idea or plan with sufficient information and supporting details included many points as mentioned in the assignment with only few details missing.  Still the plan stays focused on topic and task.  ', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'Includes in-depth information and exceptional supporting details including almost all the points as mentioned in the assignment.  Explores all facets of the assignment.', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Ideas'}, {u'prompt': u'Assess the pedagogy(methods of instructions) mentioned in the submitted plan', u'feedback': u'required', u'label': u'Pedagogy as mentioned in the plan', u'order_num': 1, u'options': [{u'order_num': 0, u'explanation': u'The plan does not mention any scope for interactive session allowing active participation of students, exploring resources, discussion. The plan focuses on lecture method pedagogy, leaving no or very less room for active participation.', u'points': 1, u'name': u'Poor', u'label': u'Poor'}, {u'order_num': 1, u'explanation': u'The plan allows somewhat sufficient scope for application of different pedagogies allowing a blend of various activities like lecture session, two way student-teacher interaction, active participation of students in discussion and actviities.', u'points': 3, u'name': u'Fair', u'label': u'Fair'}, {u'order_num': 2, u'explanation': u'The plan includes in-depth information and sufficient scope of blending different pedagogies in the online session for ensuring maximum student-teacher participation and active engagement. ', u'points': 5, u'name': u'Good', u'label': u'Good'}], u'name': u'Content'}]
    # def get_anonymous_user_id(self, username, course_id):
    #     """
    #     Get the anonymous user id for a user.

    #     Args:
    #         username(str): username of a user.
    #         course_id(str): course id of particular course.

    #     Returns:
    #         A unique anonymous_user_id for (user, course) pair.
    #         None for Non-staff users.
    #     """
    #     # if not self.get_current_user().opt_attrs.get(ATTR_KEY_USER_IS_STAFF):
    #     #     return None

    #     try:
    #         user = get_user_by_username_or_email(username_or_email=username)
    #     except User.DoesNotExist:
    #         return None

    #     course_id = CourseKey.from_string(course_id)
    #     return anonymous_id_for_user(user=user, course_id=course_id, save=False)

    # def get_ora_modules(self,course_id):
    #     if course_id:
    #         sm_objs = StudentModule.objects.filter(
    #             course_id__exact=course_id,
    #             grade__isnull=False,
    #             module_type__exact="openassessment",
    #         )
    #     else:
    #         sm_objs=None
    #     return sm_objs

    # def _serialize_opaque_key(self, key):
    #     """
    #     Gracefully handle opaque keys, both before and after the transition.
    #     https://github.com/edx/edx-platform/wiki/Opaque-Keys

    #     Currently uses `to_deprecated_string()` to ensure that new keys
    #     are backwards-compatible with keys we store in ORA2 database models.

    #     Args:
    #         key (unicode or OpaqueKey subclass): The key to serialize.

    #     Returns:
    #         unicode

    #     """
    #     if hasattr(key, 'to_deprecated_string'):
    #         return key.to_deprecated_string()
    #     else:
    #         return unicode(key)

    # def get_student_item_dict(self, anonymous_user_id=None):
    #     """Create a student_item_dict from our surrounding context.

    #     See also: submissions.api for details.

    #     Args:
    #         anonymous_user_id(str): A unique anonymous_user_id for (user, course) pair.
    #     Returns:
    #         (dict): The student item associated with this XBlock instance. This
    #             includes the student id, item id, and course id.
    #     """
    #     username=""
    #     course_id=""
    #     student_item_dict = dict(
    #         student_id=self.get_anonymous_user_id(username, course_id),
    #         item_id=item_id,
    #         course_id=course_id,
    #         item_type='openassessment'
    #     )
    #     return student_item_dict

    def rubric_criteria_with_labels(self):
        """
        Backwards compatibility: We used to treat "name" as both a user-facing label
        and a unique identifier for criteria and options.
        Now we treat "name" as a unique identifier, and we've added an additional "label"
        field that we display to the user.
        If criteria/options in the problem definition do NOT have a "label" field
        (because they were created before this change),
        we create a new label that has the same value as "name".

        The result of this call is cached, so it should NOT be used in a runtime
        that can modify the XBlock settings (in the LMS, settings are read-only).

        Returns:
            list of criteria dictionaries

        """
        criteria = copy.deepcopy(self.rubric_criteria)
        for criterion in criteria:
            if "label" not in criterion:
                criterion["label"] = criterion["name"]
            for option in criterion["options"]:
                if "label" not in option:
                    option["label"] = option["name"]
        return criteria

    def staff_assess(self,data):
        """
        Create a staff assessment from a staff submission.
        """
        # rubric_dict={
        #     "prompts" : self.prompts,
        #     "criteria":self.rubric_criteria_with_labels
        # }
        if 'submission_uuid' not in data:
            return {
                'success': False, 'msg': (u"The submission ID of the submission being assessed was not found.")
            }

        try:
            assessment = staff_api.create_assessment(
                data['submission_uuid'],
               "7adf5e337b2e9af2523f0aeacdb6822c", #self.get_student_item_dict()["student_id"],
                data['options_selected'],
                clean_criterion_feedback(self.rubric_criteria, data['criterion_feedback']),
                data['overall_feedback'],
                self.rubric_dict
            )
            assess_type = data.get('assess_type', 'regrade')
            # self.publish_assessment_event("openassessmentblock.staff_assess", assessment, type=assess_type)
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
            course_id (unicode): The ID of the course to create submissions for.
            item_id (unicode): The ID of the item in the course to create submissions for.
            num_submissions (int): Number of submissions to create.
            percentage (int or float): Percentage for assessments to be made against submissions.
        """
        # scorer_id=self.get_student_item_dict()["student_id"]

        data={
            'submission_uuid': "dbb931ed-c5ae-11ea-bc5d-1251753c009f",
            'options_selected':{"Ideas": "Good", 'Content': "Good"},
            'criterion_feedback':
                {
                        "Content of the Plan": "Includes in-depth information and exceptional supporting details including almost all the points as mentioned in the assignment.  Explores all facets of the assignment.",
                         "Pedagogy as mentioned in the plan": "The plan includes in-depth information and sufficient scope of blending different pedagogies in the online session for ensuring maximum student-teacher participation and active engagement."
                },
            'overall_feedback': "grade overrided by management script",
            'assess_type':"regrade",
            'overall_feedback':"grade overrided by management script",
            }
        response=self.staff_assess(data)
