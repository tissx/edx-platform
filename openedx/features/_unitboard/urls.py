"""
Unitboard urls.
"""
from django.conf.urls import include, url
from openedx.features._unitboard.views import UnitboardView
from rest_framework.routers import DefaultRouter
from openedx.features._unitboard.api import LandingPageViewSet


urlpatterns = [
    url(
        r'^$',
        UnitboardView.as_view(),
        name='dashboard'
    ),
    
    # url ('api/post_data', OverRideGradeDetails.as_view(), name='post_data')
]

# API endpoints:
api_router = DefaultRouter()
api_router.register('lms-landing-page', LandingPageViewSet, basename='lms-landing-page')



urlpatterns += [
    url(r'^api/', include(api_router.urls)),
]
