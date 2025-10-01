from django.urls import path
from .views import (
    CreateJobView,
    GetPendingJobView,
    approve_job,
    create_session,
    validate_session,
    mark_session_used,
    book_with_session,   # ✅ new
)

urlpatterns = [
    # Job endpoints
    path("job/create/", CreateJobView.as_view(), name="create-job"),
    path("job/get_pending/", GetPendingJobView.as_view(), name="get-pending-jobs"),
    path("job/<int:pk>/approve/", approve_job, name="approve-job"),

    # Session endpoints
    path("session/create/", create_session, name="create-session"),
    path("session/<str:token>/validate/", validate_session, name="validate-session"),
    path("session/<str:token>/use/", mark_session_used, name="use-session"),
    path("session/<str:token>/book/", book_with_session, name="book-with-session"),  # ✅ new
]
