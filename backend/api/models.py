from django.db import models
# Create your models here.

class ER_Stats_Model(models.Model):
	mmr = models.IntegerField()

	#맞는 데이터 찾기용
	matchingMode = models.CharField(max_length=10)
	matchingTeamMode = models.CharField(max_length=10)
	season = models.CharField(max_length=10,default=0)
	
	#캐릭터 정보를 위해서
	character = models.CharField(max_length=50)
	lavel = models.IntegerField(default=1)
	bestWeapon = models.CharField(max_length=30)
	#특성은 나중에

	# 옆의 통계를 위해서
	survivalTime = models.IntegerField(null=True,)
	averagerank = models.IntegerField(null=True,)
	averageKills = models.FloatField(null=True,)
	averageHunts = models.FloatField(null=True,)
	averageAssistants = models.FloatField(null=True,)
	averageDeal = models.FloatField(null=True,)
	averageProficiency = models.FloatField(null=True,)

class ER_User_Info_Model(models.Model):
	nickname = models.CharField(max_length=30)
	most_pick = models.JSONField(default='{}')
	# skin = models.CharField(max_length=30)

	#승률보단 평균 순위로
	averagerank = models.FloatField(null=True,)
	averageKills = models.FloatField(null=True,)
	averageHunts = models.FloatField(null=True,)
	averageDeal = models.FloatField(null=True,)
	averageProficiency = models.FloatField(null=True,)

	#티어
	soloTier = models.CharField(max_length=15, null=True, default="Unrank")
	duoTier = models.CharField(max_length=15, null=True, default="Unrank")
	squadTier = models.CharField(max_length=15, null=True, default="Unrank")

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class ER_Game_Record(models.Model):
	#데이터를 찾기위한 nickname
	nickname = models.CharField(max_length=30)

	season = models.CharField(max_length=10,default=0)
	rank = models.IntegerField()
	matchingMode = models.CharField(max_length=10) #일반2 랭크3
	matchingTeamMode = models.CharField(max_length=10)

	lavel = models.IntegerField(default=1)
	character = models.CharField(max_length=50)
	# 나중에 image로 변환 가능
	# skin = models.CharField(max_length=30)
	# bestWeapon = models.CharField(max_length=30)

	Kills = models.FloatField(null=True,)
	Hunts = models.FloatField(null=True,)
	Assistants = models.FloatField(null=True,)

	mmr = models.IntegerField()

	# items = models.CharField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)
