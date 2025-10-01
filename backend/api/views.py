from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import User, Job, SessionLink
from .serializers import UserSerializer, JobSerializer

from googleapiclient.discovery import build
from google.oauth2 import service_account

from datetime import timedelta, datetime, timezone
import secrets


# -------------------------
# USER
# -------------------------
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# -------------------------
# JOBS
# -------------------------
class CreateJobView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    permission_classes = [AllowAny]


class GetPendingJobView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Job.objects.filter(is_scheduled=False)


@api_view(["POST"])
def approve_job(request, pk):
    job = get_object_or_404(Job, pk=pk)

    # Google Auth
    SCOPES = ["https://www.googleapis.com/auth/calendar"]
    SERVICE_ACCOUNT_FILE = "credentials.json"
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    service = build("calendar", "v3", credentials=creds)

    # Event payload
    event = {
        "summary": f"Job for {job.name}",
        "location": job.address,
        "description": f"{job.mobile} \n {job.description}",
        "start": {
            "dateTime": job.datetime.isoformat(),
            "timeZone": "Europe/London",
        },
        "end": {
            "dateTime": (job.datetime + timedelta(hours=1)).isoformat(),
            "timeZone": "Europe/London",
        },
    }

    created_event = (
        service.events()
        .insert(calendarId="zainmirza88@gmail.com", body=event)
        .execute()
    )

    job.is_scheduled = True
    job.save()

    return Response(
        {"message": "Job approved and added to Google Calendar", "event": created_event},
        status=status.HTTP_201_CREATED,
    )


# -------------------------
# SESSION LINKS
# -------------------------
@api_view(["POST"])
def create_session(request):
    """Generate a new session link valid for 48 hours."""
    token = secrets.token_urlsafe(32)
    expires_at = datetime.now(timezone.utc) + timedelta(hours=48)

    session = SessionLink.objects.create(token=token, expires_at=expires_at)

    return Response({"token": session.token}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def validate_session(request, token):
    """Check if a session token is valid and not expired/used."""
    try:
        session = SessionLink.objects.get(token=token)
    except SessionLink.DoesNotExist:
        return Response({"valid": False}, status=status.HTTP_404_NOT_FOUND)

    if session.is_used or session.expires_at < datetime.now(timezone.utc):
        return Response({"valid": False}, status=status.HTTP_200_OK)

    return Response({"valid": True}, status=status.HTTP_200_OK)


@api_view(["POST"])
def book_with_session(request, token):
    """Book a job using a valid session token."""
    session = get_object_or_404(SessionLink, token=token)

    # reject expired/used links
    if session.is_used or session.expires_at < datetime.now(timezone.utc):
        return Response(
            {"error": "Session expired or already used"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        job = serializer.save()
        session.is_used = True
        session.save()
        return Response(
            {"message": "Job booked successfully", "job": JobSerializer(job).data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def mark_session_used(request, token):
    """Mark a session link as used (if needed manually)."""
    session = get_object_or_404(SessionLink, token=token)
    session.is_used = True
    session.save()
    return Response({"message": "Session marked as used"}, status=status.HTTP_200_OK)
