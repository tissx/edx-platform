
from urllib.parse import urljoin
import requests
import logging
log = logging.getLogger(__name__)

COURSE_CATALOG_API_URL= "http://discovery.local.overhang.io:8381/api/v1/"

def get_header_from_discovery():

    # import pdb; pdb.set_trace()
    url = urljoin(COURSE_CATALOG_API_URL, 'lms-header')
    # import time
    # time.sleep(2)
    try:
            # time.sleep(1)
            res = requests.get(url)
    except Exception as exc:
            log.error('Discovery LMS API connection failure: {}'.format(exc))
            return {}
    else:
        if res.status_code != 200:
            log.error('Discovery LMS failure: {}'.format(res.content))
            return {}

        return res.json()
    

#     param = {
#     "subject": [
#         {
#             "subject_name": "subject 1",
#             "subject_slug": "subject-1"
#         },
#         {
#             "subject_name": "Mathematics",
#             "subject_slug": "mathematics"
#         },
#         {
#             "subject_name": "English",
#             "subject_slug": "english"
#         },
#         {
#             "subject_name": "Engineering Physics",
#             "subject_slug": "engineering-physics"
#         }
#     ],
#     "program_group": [
#         {
#             "program_group_name": "Engagement Certificate Programs",
#             "program_group_slug": "engagement-certificate-programs",
#             "program_group_type": "program"
#         },
#         {
#             "program_group_name": "Graded Certificate Programs",
#             "program_group_slug": "graded-certificate-programs",
#             "program_group_type": "program"
#         },
#         {
#             "program_group_name": "Digital Badge Programs",
#             "program_group_slug": "digital-badge-programs",
#             "program_group_type": "program"
#         },
#         {
#             "program_group_name": "Free Programs",
#             "program_group_slug": "free-programs",
#             "program_group_type": "program"
#         },
#         {
#             "program_group_name": "Other Programs",
#             "program_group_slug": "other-programs",
#             "program_group_type": "program"
#         }
#     ],
#     "degree_group": [
#         {
#             "degree_group_name": "Bachelor Degrees",
#             "degree_group_slug": "bachelor-degrees",
#             "degree_group_type": "degree"
#         },
#         {
#             "degree_group_name": "Master Degrees",
#             "degree_group_slug": "master-degrees",
#             "degree_group_type": "degree"
#         },
#         {
#             "degree_group_name": "Diploma",
#             "degree_group_slug": "diploma",
#             "degree_group_type": "degree"
#         }
#     ],
#     "school": [
#         {
#             "school_name": "MX School 01",
#             "school_slug": "37de430d-6faa-471c-b5ac-ce46bc7c399f"
#         },
#         {
#             "school_name": "MX School 02",
#             "school_slug": "mx-school-02"
#         },
#         {
#             "school_name": "MX School 3",
#             "school_slug": "mx-school-3"
#         }
#     ],
#     "center": [
#         {
#             "center_name": "MX Independent Center 01",
#             "center_slug": "mx-independent-center-01"
#         },
#         {
#             "center_name": "MX School Center 01",
#             "center_slug": "mx-school-center-01"
#         },
#         {
#             "center_name": "MX School Center 02",
#             "center_slug": "mx-school-center-02"
#         },
#         {
#             "center_name": "MX School Center 06",
#             "center_slug": "mx-school-center-06"
#         },
#         {
#             "center_name": "MX School Center 03",
#             "center_slug": "mx-school-center-03"
#         },
#         {
#             "center_name": "MX School Center 04",
#             "center_slug": "mx-school-center-04"
#         }
#     ]
# }
    
#     return param