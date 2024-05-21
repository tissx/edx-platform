from common.djangoapps.student.models import CourseAccessRole



class DashboardTabMiddleware(object):

    def __init__(self, get_response=None):
        if get_response is not None:
            self.get_response = get_response

    def __call__(self, request):
        self.process_request(request)
        return self.get_response(request)

    def process_request(self, request):
        # user = request.user
        # request.show_dashboard_tab = CourseAccessRole.objects.filter(user_id=user.id).exists()
        pass