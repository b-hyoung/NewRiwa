from django.db import models

class UserInfo(models.Model):
    username = models.CharField(max_length=10)
    tier =models.IntegerField()