from rest_framework import serializers
from django.contrib.auth.models import User

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

class UserSerializer(serializers.ModelSerializer): #해당 모델을 받아와서 Json파일로 변환해주기
    class Meta:
        model = User
        field = ['username' , 'tier' , 'KDA']