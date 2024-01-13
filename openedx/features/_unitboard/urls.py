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


    url(
    r'^program-detail-slug/{}'.format(
        r'(?P<program_uuid>[0-9a-f-]+)',
    ),
    UnitboardView.as_view(),
    name='program-detail-slug'
    ),

    url(
    r'^program-degree-listing',
    UnitboardView.as_view(),
    name='program-degree-listing'
    ),

    url(
    r'^school-center-listing',
    UnitboardView.as_view(),
    name='school-center-listing'
    ),

    url(
    r'^center-detail',
    UnitboardView.as_view(),
    name='center-detail'
    ),

    url(
    r'^school-detail/{}'.format(
        r'(?P<slug>[0-9a-z-]+)',
    ),
    UnitboardView.as_view(),
    name='school-detail'
    ),
    
    
]

# API endpoints:
api_router = DefaultRouter()
api_router.register('lms-landing-page', LandingPageViewSet, basename='lms-landing-page')



urlpatterns += [
    url(r'^api/', include(api_router.urls)),
]
