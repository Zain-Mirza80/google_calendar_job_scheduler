from django.urls import path
from .views import CreateJobView, GetPendingJobView

urlpatterns = [
    path("job/create", CreateJobView.as_view(), name="job"),
    path("job/get_pending", GetPendingJobView.as_view(), name="job")
]


