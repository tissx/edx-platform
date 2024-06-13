"""
Unitboard urls.
"""
from django.conf.urls import include, url
from openedx.features._unitboard.views import UnitboardView, SearchView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    url(
        r'^$',
        UnitboardView.as_view(),
        name='dashboard'
    ),

    url(
    r'^program-detail/{}'.format(
        r'(?P<program_uuid>[0-9a-f-]+)',
    ),
    UnitboardView.as_view(),
    name='program-detail'
    ),

    url(
    r'^degree-detail/{}'.format(
        r'(?P<program_uuid>[0-9a-f-]+)',
    ),
    UnitboardView.as_view(),
    name='degree-detail'
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
    r'^center-detail/{}'.format(
        r'(?P<slug>[0-9a-z-]+)',
    ),
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

    url(
    r'^search',
    SearchView.as_view(),
    name='search'
    ),
    
]

# API endpoints:
api_router = DefaultRouter()

urlpatterns += [
    url(r'^api/', include(api_router.urls)),
]
