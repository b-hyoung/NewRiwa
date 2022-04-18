
from django.urls import path
from rest_framework import routers



from .apis import UserInfoViewSet, UserGameViewSet

router = routers.DefaultRouter()
router.register(r'Userdata', UserInfoViewSet, basename="api_user")
router.register(r'UserGame', UserGameViewSet, basename="api_gamerecord")