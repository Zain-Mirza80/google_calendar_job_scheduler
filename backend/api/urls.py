from django.urls import path
from .views import CreateJobView, GetPendingJobView, approve_job

urlpatterns = [
    path("job/create/", CreateJobView.as_view(), name="create-job"),
    path("job/get_pending", GetPendingJobView.as_view(), name="get-pending-jobs"),
    path("job/<int:pk>/approve", approve_job, name="approve-job")
]


