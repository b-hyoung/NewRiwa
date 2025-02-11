from django.db import models
from pymongo import MongoClient

# 몽고DB 연결하기
client = MongoClient("mongodb://localhost:27017/")
db = client("kimbob") ## 사용 할 Mongo DB 데이터 베이스
collection = db["item"] #사용 할 컬렉션


class UserInfo(models.Model):
    username = models.CharField(max_length=10)
    tier =models.IntegerField()