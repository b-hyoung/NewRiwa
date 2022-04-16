from django.db import models
# Create your models here.

class ER_Base_Model(models.Model):
	nickname = models.CharField(max_length=30)

	#승률
	winning_rate = models.FloatField(null=True,)
	averageKills = models.FloatField(null=True,)
	averageHunts = models.FloatField(null=True,)
	averageDeal = models.FloatField(null=True,)
	averageProficiency = models.FloatField(null=True,)

	#티어
	soloTier = models.CharField(max_length=10)
	# duoTier = models.CharField(max_length=10)
	# squadTier = models.CharField(max_length=10)
	# averageAssistants = models.FloatField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)