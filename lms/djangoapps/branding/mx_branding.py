
from urllib.parse import urljoin
import requests
import logging
from django.conf import settings

log = logging.getLogger(__name__)

COURSE_CATALOG_API_URL = getattr(settings, 'LMS_DISCOVERY_URL', "")

def get_header_from_discovery():

    url = urljoin(COURSE_CATALOG_API_URL, '/api/v1/lms-header')
   
    try:
            res = requests.get(url)
    except Exception as exc:
            log.error('Discovery LMS API connection failure: {}'.format(exc))
            return {}
    else:
        if res.status_code != 200:
            log.error('Discovery LMS failure: {}'.format(res.content))
            return {}

        return res.json()
    