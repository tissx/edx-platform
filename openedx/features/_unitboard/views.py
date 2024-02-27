"""
Django views for Dashboard.
"""
from django.contrib.auth.views import redirect_to_login
from django.views.generic import TemplateView
from django.urls import reverse
from common.djangoapps.edxmako.shortcuts import render_to_response, render_to_string
from django.conf import Settings

discovery_URL = "http://discovery.local.overhang.io:8381"
# discovery_URL = Settings.LMS_DISCOVERY_URL

class UnitboardView(TemplateView):
    template_name = "_unitboard/unitboard.html"

    def dispatch(self, request, *args, **kwargs):
        # if not request.user.is_authenticated:
        #     return redirect_to_login(request.get_full_path())
        return super(UnitboardView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        """
        Prefetch any data for initial render for Unitboard.
        """
        context_data = {
            'my_discovery_url': discovery_URL
        }

        # api_urls = {
        #     "unit_items": {
        #         "items_info": reverse('unitboard:unit-items-items-info'),
        #     }
        
        # }

        context = super().get_context_data(**kwargs)
        context['context_data'] = context_data
        # context['api_urls'] = api_urls
        return context




# def search_view(request):  # lint-amnesty, pylint: disable=too-many-statements
#     """
#     Provides the LMS Search view
#     """
    
#     subject = request.GET.get('subject', None)
#     # import pdb; pdb.set_trace()
#     if subject:
#         learning_type = "courses"

#     context = {
#         "dashboard": "dashboard",
       
#     }

 

#     response = render_to_response('search.html', context)
    

#     return response
    


class SearchView(TemplateView):
    template_name = "_unitboard/unitboard.html"

    def dispatch(self, request, *args, **kwargs):
        # if not request.user.is_authenticated:
        #     return redirect_to_login(request.get_full_path())
        return super(SearchView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        """
        Prefetch any data for initial render for Unitboard.
        """
        context_data = {
            'my_discovery_url': discovery_URL
        }

        # api_urls = {
        #     "unit_items": {
        #         "items_info": reverse('unitboard:unit-items-items-info'),
        #     }
        
        # }

        context = super().get_context_data(**kwargs)
        context['context_data'] = context_data
        # context['api_urls'] = api_urls
        return context

