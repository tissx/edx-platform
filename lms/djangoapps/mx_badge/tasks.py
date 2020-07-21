import logging
from celery.task import task
from django.contrib.auth.models import User
from opaque_keys.edx.keys import CourseKey
from badges.events.course_complete import course_badge_check
# -----------------------------------
from openassessment.workflow.api import update_from_assessments


LOGGER = logging.getLogger(__name__)

@task()
def is_course_passed_task(student_id,course_id):
    '''
     if  is_course_passed is True create course complete badge as certification id disbled for the given course_id(str)
    '''
    LOGGER.info(" In is_coursed_passed_task")
    from courseware.courses import get_course_by_id
    from courseware.views.views import is_course_passed
    try:
        student=User.objects.get(id=student_id)
        course_key = CourseKey.from_string(course_id)
        course = get_course_by_id(course_key, depth=2)
    except Exception as e:
        LOGGER.error('Exception in is_course_passed_task [%s]',e)
    else:
        passed = is_course_passed(course, student=student)
        if passed:
            LOGGER.info("is_coursed_passed True for student_id[%s] in course_id[%s]",student_id,course_id)
            course_badge_check(student, course_key)
        else:
            LOGGER.info('User Doesnot passed the course')
            return

@task()
def course_badge_check_task(student_id,course_id):
    '''
     call by COURSE_GRADE_NOW_PASSED  signal to generate course complete badge on course_passed.
    '''
    LOGGER.info(" In course_badge_check_task")
    try:
        student=User.objects.get(id=student_id)
        course_key = CourseKey.from_string(course_id)
    except Exception as e:
        LOGGER.error('Exception in course_badge_check_task [%s]',e)
    else:
        LOGGER.info(" Call by COURSE_GRADE_NOW_PASSED  signal to generate course complete badge for student[%s] in course_id[%s]",student.username,course_id)
        course_badge_check(student, course_key)
