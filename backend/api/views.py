from django.shortcuts import render
from rest_framework import generics, status
from .models import User, Job
from .serializers import UserSerializer, JobSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from googleapiclient.discovery import build
from google.oauth2 import service_account

from datetime import timedelta



# Create your views here.
class CreateUserView(generics.CreateAPIView):
     queryset = User.objects.all()
     serializer_class = UserSerializer
     permission_classes = [AllowAny]


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
     job = Job.objects.get(pk=pk)

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
     
     created_event = service.events().insert(calendarId="zainmirza88@gmail.com", body=event).execute()


     job.is_scheduled = True
     job.save()


     return Response(
        {"message": "Job approved and added to Google Calendar", "event": created_event},
        status=status.HTTP_201_CREATED,
    )


