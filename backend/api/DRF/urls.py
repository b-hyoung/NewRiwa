
from django.urls import path
from rest_framework import routers


from .apis import TrollsDataViewSet, UserDataViewSet

router = routers.DefaultRouter()
router.register(r'Userdata', UserDataViewSet, basename="api_user")