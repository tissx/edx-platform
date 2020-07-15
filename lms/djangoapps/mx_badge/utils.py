import logging

from django.contrib.auth.models import User
from opaque_keys.edx.keys import CourseKey
from student.models import AnonymousUserId
from openassessment.workflow.models import AssessmentWorkflow

logger = logging.getLogger(__name__)


def convert_to_coursekey(str_course_id):
    ''' returns CourseKeyField type value of the provided str_course_id'''
    if str_course_id:
        return  CourseKey.from_string(str_course_id)
    else:
        return None

def get_staff_anonymous_id(str_course_id):
    ''' returns anonymous id of the admin user of the provided course'''
    coursekey=convert_to_coursekey(str_course_id)
    user = AnonymousUserId.objects.select_related('user').filter(user__is_superuser=True,course_id=coursekey).first()
    return user



def get_incomplete_submissions(course_id):
    ''' returns incomplete submissions of the passed course or course-v1:TISSx-COOL+COOLTOL01+2020_COOL_TOL_EN_01 '''
    if course_id:
        incomplte_status=['peer','waiting']
        qs=AssessmentWorkflow.objects.filter(course_id=course_id,status__in=incomplte_status).values('id','submission_uuid','status')
        return qs
    else:
        return None
