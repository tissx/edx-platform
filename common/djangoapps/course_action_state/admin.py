from django.contrib import admin
from .models import CourseRerunState
# Register your models here.

class CourseRerunStateAdmin(admin.ModelAdmin):
    list_display = ('source_course_key', 'course_key', 'state', 'display_name')

admin.site.register(CourseRerunState, CourseRerunStateAdmin)


