import Cookies from "js-cookie";
import querystring from "querystring";
import * as R from "ramda";

export const withParams = (url, params = {}) => `${url}${R.isEmpty(params) ? "" : "?"}${querystring.stringify(params)}`;

export const withAuth = (headers = {}) => ({
  ...headers,
  "X-CSRFToken": Cookies.get("csrftoken")
});

export const makeHeaders = (headers = {}) => ({
  ...headers,
  "Content-Type": "application/json"
});

// Backend API routes:
export const apiUrls = {
  landing_page: {
    course_program: "/unitboard/api/lms-landing-page/course-program-list",
  },

 
  
  
};

// I18N: OeX Mako templates context includes `django.gettext` tool:
export const gettext = (window.django && window.django.gettext) || (text => text);
