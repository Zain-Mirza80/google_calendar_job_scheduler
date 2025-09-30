from django.db import models
from django.contrib.auth.models import User

class SessionLink(models.Model):
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)


# Create your models here.
class Job(models.Model):
    session = models.ForeignKey(SessionLink, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=254)
    mobile = models.CharField(max_length=20)
    address = models.TextField()
    date = models.DateTimeField()
    description = models.CharField(max_length=60)
    # images = models.ImageField(upload_to="job_images/", blank=True, null=True)

    def __str__(self):
        return self.name
