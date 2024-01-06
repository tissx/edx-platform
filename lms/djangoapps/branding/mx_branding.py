
from urllib.parse import urljoin
import requests
import logging
log = logging.getLogger(__name__)

COURSE_CATALOG_API_URL= "http://discovery.local.overhang.io:8381/api/v1/"

def get_header_from_discovery():

    # import pdb; pdb.set_trace()
    url = urljoin(COURSE_CATALOG_API_URL, 'lms-header')
    import time
    # time.sleep(2)
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
    


    # param = {
    #         "subject": [
    #             {
    #                 "subject_name": "subject 1"
    #             },
    #             {
    #                 "subject_name": "Mathematics"
    #             },
    #             {
    #                 "subject_name": "English"
    #             },
    #             {
    #                 "subject_name": "Engineering Physics"
    #             }
    #         ],
    #         "program": [
    #             {
    #                 "program_name": "MX Program 01"
    #             },
    #             {
    #                 "program_name": "MX Program 2"
    #             },
    #             {
    #                 "program_name": "MX Python Program"
    #             },
    #             {
    #                 "program_name": "MX Degree 01"
    #             },
    #             {
    #                 "program_name": "B.TECH Degree"
    #             },
    #             {
    #                 "program_name": "MX Degree 02"
    #             }
    #         ]
    #     }
    
    # return param