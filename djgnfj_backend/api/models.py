from email.policy import default
from django.db import models
# Create your models here.

#특성
class TraitModel(models.Model):
	FirstCore = models.IntegerField(null=True)
	FirstSub_one = models.IntegerField(null=True)
	FirstSub_two = models.IntegerField(null=True)
	SecondSub_one = models.IntegerField(null=True)
	SecondSub_two = models.IntegerField(null=True)

class ItemModel(models.Model):
	charnum = models.IntegerField(null=True,)
	Weapon = models.IntegerField(null=True,)
	Haed = models.IntegerField(null=True,)
	Clothes = models.IntegerField(null=True,)
	Arm = models.IntegerField(null=True,)
	Leg = models.IntegerField(null=True,)
	Accessories = models.IntegerField(null=True,)

class MasteryModel(models.Model):
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
		return round(averageProficiency,2)

class MostPickModel(models.Model):
	nickname = models.CharField(max_length=30, null=False)
	matchingTeamMode = models.IntegerField(null=True)
	season = models.CharField(max_length=10,default=0, null=True)

	most_one_charcode = models.IntegerField(null=True)
	most_two_charcode = models.IntegerField(null=True)
	most_three_charcode = models.IntegerField(null=True)

# 통계 데이터
class ER_Stats_Model(models.Model):
	#랭크 맞음 Gold, Silver ...
	rank = models.CharField(max_length=30, null=True)

	#맞는 데이터 찾기용
	matchingTeamMode = models.IntegerField(null=True)
	seasonId = models.IntegerField(default=0, null=True)
	season = models.CharField(max_length=10,default=0, null=True)
	
	#캐릭터 정보를 위해서
	character = models.CharField(max_length=50)
	lavel = models.IntegerField(default=1)
	bestWeapon = models.CharField(max_length=30)
	
	# 나중에 따로 뺴자 너무 겹쳐있음 그래프와 기타등등이
	# 평균 특성, 평균 아이템 이건 나중에 그캐릭터의 특성이나 아이템을 보여주기 위한 창에서 쓰일것 다른곳으로 안빼고 하나로 합쳐놓음
	averageTrait = models.ForeignKey(TraitModel, on_delete=models.CASCADE, null=True)
	averageItem = models.ForeignKey(ItemModel, on_delete=models.CASCADE, null=True)

	# 그래프용 데이터
	averageRanking = models.FloatField(default=9, null=False)
	averageKills = models.FloatField(null=True,)
	averageHunts = models.FloatField(null=True,)
	averageDeal = models.FloatField(null=True,)
	averageProficiency = models.FloatField(null=True,)

	averageAssistants = models.FloatField(null=True,)

class ER_User_Info_Model(models.Model):
	nickname = models.CharField(max_length=30)
	matchingTeamMode = models.IntegerField(null=False, default=1)
	userNum = models.CharField(max_length=20, null=False)
	seasonId = models.IntegerField(default=0)
	mmr = models.IntegerField(null=True, default=0)

	#티어
	soloTier = models.CharField(max_length=15, null=True, default="Unrank")
	duoTier = models.CharField(max_length=15, null=True, default="Unrank")
	squadTier = models.CharField(max_length=15, null=True, default="Unrank")

	#그래프 데이터
	averageRanking = models.FloatField(null=True,)
	averageKills = models.FloatField(null=True,)
	averageHunts = models.FloatField(null=True,)
	averageDeal = models.FloatField(null=True,)
	averageProficiency = models.FloatField(null=True,)
	mastery = models.ForeignKey(MasteryModel, on_delete=models.CASCADE, related_name="mastery", null=True)

	averageAssistants = models.FloatField(null=True, default=0)
	
	mostpick = models.ForeignKey(MostPickModel, on_delete=models.CASCADE, related_name="mostpick", null=True)

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

class ER_Game_Record_Model(models.Model):
	nickname = models.CharField(max_length=30)

	season = models.CharField(max_length=10,default=0)
	ranking = models.IntegerField()
	matchingMode = models.CharField(max_length=10) #일반2 랭크3
	matchingTeamMode = models.CharField(max_length=10)

	gameId = models.IntegerField(null=True)
	charnum = models.IntegerField(null=True)
	characterlevel = models.IntegerField(default=1)
	bestWeapon = models.IntegerField(null=True)
	bestWeaponLevel = models.IntegerField(default=1)

	Kills = models.FloatField(null=True,)
	Hunts = models.FloatField(null=True,)
	Assistants = models.FloatField(null=True,)

	mmr = models.IntegerField(null=True, default=0)

	Route = models.IntegerField(null=True, default=0)
	items = models.ForeignKey(ItemModel, on_delete=models.CASCADE, null=True)
	Trait= models.ForeignKey(TraitModel, on_delete=models.CASCADE, null=True)

	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)
