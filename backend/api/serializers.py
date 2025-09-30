from rest_framework import serializers
from django.contrib.auth.models import User
from models import Job, SessionLink


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}} # ensures password is only serialized on creation not on return of the data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"
        read_only_fields = ["session"]