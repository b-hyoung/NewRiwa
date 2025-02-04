## 특정 url로 들어오면 정보를 만든 API 실행하기

from django.urls import path
from .views import HelloAPI

urlpatterns = [
    path('hello/', HelloAPI.as_view(), name='hello_api'),
]