from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job, SessionLink


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}  # don’t expose password

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"
        # we’re not linking jobs directly to sessions in this simplified version


class SessionLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionLink
        fields = ["id", "token", "created_at", "expires_at", "is_used"]
        read_only_fields = ["id", "token", "created_at", "expires_at", "is_used"]
