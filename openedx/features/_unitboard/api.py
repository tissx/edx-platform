from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from urllib.parse import urljoin
import requests
from django.conf import settings
import logging
log = logging.getLogger("")



COURSE_CATALOG_API_URL = getattr(settings, 'LMS_DISCOVERY_URL', "")

class LandingPageViewSet(viewsets.GenericViewSet):
    """
    Course Program Degrees API.
    """
    permission_classes = []

    @action(methods=['get'], detail=False, url_path='course-program-list')
    def course_program_list(self, request, **kwargs):
        """
        Course Program Degrees Listing

        GET /unitboard/api/lms-landing-page/course-program-list/
        """

        param = {
                "courses": [
                    {
                        "course_name": "MX Course 001",
                        "short_description": "null",
                        "course_image": "http://local.overhang.io:8000/asset-v1:Manprax+mx_course_001+2023_001+type@asset+block@images_course_image.jpg",
                        "course_id": "course-v1:Manprax+mx_course_001+2023_001"
                    },
                    {
                        "course_name": "MX Course 002",
                        "short_description": "null",
                        "course_image": "http://local.overhang.io:8000/asset-v1:Manprax+mx_course_002+2023_002+type@asset+block@images_course_image.jpg",
                        "course_id": "course-v1:Manprax+mx_course_002+2023_002"
                    }
                ]
            }
        return Response(param)

