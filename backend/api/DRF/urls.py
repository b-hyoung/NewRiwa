
from django.urls import path
from rest_framework import routers



from .apis import UserDataViewSet, UserGameViewSet

router = routers.DefaultRouter()
router.register(r'Userdata', UserDataViewSet, basename="api_user")
router.register(r'UserGame', UserGameViewSet, basename="api_gamerecord")
# router.register(r'UserGame/(?P<nickname>\d+)', UserGameViewSet, basename="api_gamerecord")