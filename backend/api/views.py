from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer, JobSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class CreateUserView(generics.CreateAPIView):
     queryset = User.objects.all()
     serializer_class = UserSerializer
     permission_classes = [AllowAny]


class CreateJobView(generics.ListCreateAPIView):
     serializer_class = JobSerializer
     queryset = User.objects.all()
     permission_classes = [AllowAny]