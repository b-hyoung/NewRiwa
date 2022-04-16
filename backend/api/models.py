from django.db import models
# Create your models here.

class ER_Base_Model(models.Model):
	nickname = models.CharField(max_length=30)
	# most_pick = models.JSONField(default='{}')

	#승률
	winning_rate = models.FloatField()
	averageKills = models.FloatField()
	averageHunts = models.FloatField()
	averageDeal = models.FloatField()
	averageProficiency = models.FloatField()
	#평균 ada

	#티어
	soloTier = models.CharField(max_length=10)
	# duoTier = models.CharField(max_length=10)
	# squadTier = models.CharField(max_length=10)

	# averageAssistants = models.FloatField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)