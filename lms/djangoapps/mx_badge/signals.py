# import logging
# from django.db.models.signals import post_save,post_delete,pre_save
# from django.contrib.auth.models import User
# from django.dispatch import receiver
# from courseware.models import StudentModule
# from mx_badge.tasks import is_course_passed_task,course_badge_check_task
# # from certificates.models import CertificateGenerationCourseSetting
# # ------------------------
# from openedx.core.djangoapps.signals.signals import COURSE_GRADE_CHANGED, COURSE_GRADE_NOW_PASSED
# from grades.signals.signals import SUBSECTION_SCORE_CHANGED
# # --------------------------------------
# from submissions.models import Score,Submission,score_reset,score_set # Signal to inform listeners that a score has been changed
# from openassessment.workflow.models import AssessmentWorkflow
# from openassessment.assessment. signals import assessment_complete_signal
# from opaque_keys.edx.keys import CourseKey

# LOGGER = logging.getLogger(__name__)

# def user_byy_anonymous_id(uid):
#     """
#     Return user by anonymous_user_id using AnonymousUserId lookup table.

#     Do not raise `django.ObjectDoesNotExist` exception,
#     if there is no user for anonymous_student_id,
#     because this function will be used inside xmodule w/o django access.
#     """

#     if uid is None:
#         return None
#     try:
#         return User.objects.get(anonymoususerid__anonymous_user_id=uid)
#     except User.DoesNotExist:
#         return None

# # @receiver(post_save, sender=StudentModule)
# # @receiver(post_delete, sender=StudentModule)
# # def create_course_passed_badge(sender, instance, **kwargs):
# #     from certificates.models import CertificateGenerationCourseSetting
# #     LOGGER.info('-----------create_course_passed_badge function  called due to post_save signal triggered on StudentModule-------------')
# #     course_key=instance.course_id
# #     course_certs_enabled = CertificateGenerationCourseSetting.is_enabled_for_course(course_key)
# #     if course_certs_enabled :
# #         LOGGER.info('self-generated certificates/badges is enabled  for the course [%s] ',course_key)
# #         return
# #     student_id=instance.student_id
# #     grade=instance.grade
# #     LOGGER.info('Created  is_course_passed_task for student [%s] and course [%s] with grade[%s]',student_id,course_key,grade)
# #     is_course_passed_task.delay(student_id,str(course_key))


# @receiver(COURSE_GRADE_NOW_PASSED, dispatch_uid="mx_new_passing_learner")# pylint: disable=unused-argument
# def create_course_passed_badge(sender, user, course_key, **kwargs):
#     """
#     Standard signal hook to create course badges when a when  COURSE_GRADE_NOW_PASSED signal triggered(when a user obtained a passing grade).
#     """
#     # from certificates.models import CertificateGenerationCourseSetting
#     from certificates import api as certs_api

#     LOGGER.info('User got passed in the course [%s]',course_key)
#     course_certs_enabled =  certs_api.cert_generation_enabled(course_key) #CertificateGenerationCourseSetting.is_enabled_for_course(course_key)
#     if course_certs_enabled :
#         LOGGER.info('self-generated certificates/badges is enabled  for the course [%s] ',course_key)
#         return
#     user_id=user.id
#     LOGGER.info('Created  course_badge_check_task for student [%s] and course [%s] ',user_id,str(course_key))
#     course_badge_check_task.delay(user_id,str(course_key))



# # @receiver(score_set)
# # @receiver(score_reset)
# # def mx_submissions_score_reset_handler(sender, **kwargs):  # pylint: disable=unused-argument
# #     """
# #     Consume the score_reset signal defined in the Submissions API, and convert
# #     it to a PROBLEM_WEIGHTED_SCORE_CHANGED signal indicating that the score
# #     has been set to 0/0. Converts the unicode keys for user, course and item
# #     into the standard representation for the PROBLEM_WEIGHTED_SCORE_CHANGED signal.

# #     This method expects that the kwargs dictionary will contain the following
# #     entries (See the definition of score_reset):
# #       - 'anonymous_user_id': unicode,
# #       - 'course_id': unicode,
# #       - 'item_id': unicode
# #     """
# #     LOGGER.info('---------------------In mx_submissions_score_reset_handler-------------')
# #     points_possible = kwargs['points_possible']
# #     points_earned = kwargs['points_earned']
# #     course_id = kwargs['course_id']
# #     usage_id = kwargs['item_id']
# #     user = user_byy_anonymous_id(kwargs['anonymous_user_id'])
# #     LOGGER.info('SCORE SET/RESET with args: 1. points_possible[%s] 2.points_earned[%s] 3. course_id[%s] 4. usage_id[%s] 5.user_id [%s] ',
# #        points_possible,points_earned,course_id,usage_id,user.id)
# #     if user is None:
# #         return
# #     if points_possible == 0:
# #         # This scenario is known to not succeed, see TNL-6559 for details.
# #         return
# #     if points_earned==0:
# #         return
# #     from certificates.models import CertificateGenerationCourseSetting
# #     course_key = CourseKey.from_string(course_id)
# #     course_certs_enabled = CertificateGenerationCourseSetting.is_enabled_for_course(course_key)
# #     if course_certs_enabled :
# #         LOGGER.info('self-generated certificates/badges is enabled  for the course [%s] ',course_key)
# #         return
# #     is_course_passed_task.delay(user.id,course_id)
