"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path, path, include
from django.views.generic import TemplateView


from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

from rest_framework import routers
from backend.db.views import SubjectViewSet, StimulusViewSet, TrialViewSet

router = routers.DefaultRouter()
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'stimulus', StimulusViewSet, basename='stimulus')
router.register(r'trials', TrialViewSet, basename='experiment')

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

urlpatterns = [

    path(r'', index, name='home'),
    re_path(r'exp/.*', index),


    path(r'data/', include(router.urls)),

    path('admin/', admin.site.urls),
    path(r'api-auth/', include('rest_framework.urls')),
    path(r'api/', include('backend.api.urls'))


]
