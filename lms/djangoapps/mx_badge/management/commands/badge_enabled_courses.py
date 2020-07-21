import logging
from django.core.management.base import BaseCommand, CommandError
from openedx.core.djangoapps.content.course_overviews.models import CourseOverview
from xmodule.modulestore.django import modulestore

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

    help = 'returns courses  in which openbadges are enabled'
    def handle(self, *args, **options):
        count=0
        courses=CourseOverview.objects.all()
        for course in courses:
            count=count+1
            print(count)
            course_modulestore=modulestore().get_course(course.id)
            if course_modulestore:
                if course_modulestore.issue_badges:
                    # logger.info("Course {%s} is configured to issue badges.",course.id)
                    print(str(course.id))
                else:
                    print('badges not configured ',str(course.id))
            else:
                print("Course {%s} didn't have modulestore.",course.id)
