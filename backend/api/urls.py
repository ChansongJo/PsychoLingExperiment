from django.urls import path, include
from backend.api.views import bulkUploadFromFile

urlpatterns = [
    path('bulk_upload/', bulkUploadFromFile)
]
