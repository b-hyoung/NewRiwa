from django.db import models
# Create your models here.

class ER_Game_Record(models.Model):
	nickname = models.CharField(max_length=30)
	rank = models.IntegerField()
	season = models.CharField(max_length=10,default=0)

	lavel = models.IntegerField(default=1)
	character = models.CharField(max_length=50)

	Kills = models.FloatField(null=True,)
	Hunts = models.FloatField(null=True,)
	Assistants = models.FloatField(null=True,)

	mmr = models.IntegerField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)


class ER_Base_Model(models.Model):
	nickname = models.CharField(max_length=30)

	#승률
	winning_rate = models.FloatField(null=True,)
	averageKills = models.FloatField(null=True,)
	averageHunts = models.FloatField(null=True,)
	averageDeal = models.FloatField(null=True,)
	averageProficiency = models.FloatField(null=True,)

	#티어
	soloTier = models.CharField(max_length=15, null=True, default="Unrank")
	duoTier = models.CharField(max_length=15, null=True, default="Unrank")
	squadTier = models.CharField(max_length=15, null=True, default="Unrank")
	# averageAssistants = models.FloatField()

	game_record = models.JSONField(read_only=True)

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)
