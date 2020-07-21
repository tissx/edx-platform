

import logging
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from opaque_keys.edx.keys import CourseKey
from courseware.courses import get_course_by_id
from courseware.views.views import is_course_passed
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    """
    Create dummy submissions and assessments for testing.
    This will generate fake (lorem ipsum) data for:
        * Submission response text
        * Assessment rubric definition
        * Assessment rubric scores
        * Assessment feedback
    """

    help = 'generate course completion badges for the all students enrolled in the course'
    def handle(self, *args, **options):
        course_id="course-v1:TISSx-COOL+COOLTOL01+2020_COOL_TOL_EN_01"
        course_key=CourseKey.from_string(course_id)
        course= get_course_by_id(course_key, depth=2)
        students = User.objects.filter(courseenrollment__course_id=course_key)
        count=0
        for student in students:
            count=count+1
            print('----------------------------------------'+str(count)+'---------------------------------------')
            passed = is_course_passed(course, student=student)
            if passed:
                logger.info('User[%s] with email :[%s] PASSED the course',student.username,student.email)
            else:
                logger.info('User[%s] with email :[%s] DOES NOT PASSED the course',student.username,student.email)
