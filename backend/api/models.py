from django.db import models
# Create your models here.

"""
자자 생각해보자고

일단 어떡해 데이터를 쪼갤것이냐 ->
mmr 별로 쪼개기엔 너무나도 데이터가 방대해 질것 같다.
그렇기에 티어별로 쪼개서 데이터를 만드는게 맞다고 본다(브실골)

일단 그러면 ER_mastery_model을 만들어서 각각의 데이터를 저장하는것이 조금 이로울거 같다
왜냐하면 마우스를 가져다 댓을떄 떠야하는 평균 숙련도 데이터도 필요하고
그걸다 합친 평균 마스터리 레벨도 필요하기 때문이다


"""

class Mastery(models.Model):
	nickname = models.CharField(max_length=30)
	mmr = models.IntegerField(null=True, default=0)

	averagebestWeaponLevel = models.IntegerField(null=True,)
	averageTraplevel = models.IntegerField(null=True,)
	averageProductionlevel = models.IntegerField(null=True,)
	averageSearchlevel = models.IntegerField(null=True,)
	averageMovelevel = models.IntegerField(null=True,)
	averageStrengthlevel = models.IntegerField(null=True,)
	averageDefenselevel = models.IntegerField(null=True,)
	averageHuntinglevel = models.IntegerField(null=True,)

	def get_averageProficiency(self):
		averageProficiency = (\
		self.averagebestWeaponLevel + \
		self.averageTraplevel + \
		self.averageProductionlevel + \
		self.averageSearchlevel + \
		self.averageMovelevel + \
		self.averageStrengthlevel + \
		self.averageDefenselevel + \
		self.averageHuntinglevel) / 8
		return averageProficiency

class ER_Stats_Model(models.Model):
	rank = models.CharField(max_length=30, null=True)

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
	mmr = models.IntegerField(null=True, default=0)
	# skin = models.CharField(max_length=30)

	#승률보단 평균 순위로
	averagerank = models.FloatField(null=True,)
	averageKills = models.FloatField(null=True,)
	averageHunts = models.FloatField(null=True,)
	averageAssistants = models.FloatField(null=True, default=0)
	averageDeal = models.FloatField(null=True,)
	averageProficiency = models.FloatField(null=True,)

	mastery = models.ForeignKey(Mastery, on_delete=models.CASCADE, related_name="mastery")
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

	character = models.CharField(max_length=50)
	characterlevel = models.IntegerField(default=1)
	bestWeapon = models.CharField(max_length=30)
	bestWeaponLevel = models.IntegerField(default=1)
	# 나중에 image로 변환 가능
	# skin = models.CharField(max_length=30)
	# bestWeaponLevel = models.CharField(max_length=30)

	Kills = models.FloatField(null=True,)
	Hunts = models.FloatField(null=True,)
	Assistants = models.FloatField(null=True,)

	mmr = models.IntegerField(null=True, default=0)

	# items = models.CharField()

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)
