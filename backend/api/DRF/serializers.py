from email.policy import default
from time import sleep
from rest_framework import serializers, exceptions
from api.ER_utils.ER_API_utils import set_ER_api_data, set_ER_game_record_data

from api.models import ER_User_Info_Model, ER_Game_Record, Mastery, ER_Stats_Model
from api.models_utils import instance_save
from api.ER_utils.ER_stats import set_ER_stats_data
from ..ER_utils.ER_API_utils import get_ER_user_games, get_ER_userNum

class MasterySerializer(serializers.ModelSerializer):
	class Meta:
		model = Mastery
		exclude = ("id", "nickname", "mmr")

class UserStatsSerializer(serializers.ModelSerializer):
	rank = serializers.CharField()

	#맞는 데이터 찾기용
	matchingMode = serializers.CharField(read_only=True,)
	matchingTeamMode = serializers.CharField(read_only=True,)
	season = serializers.CharField(read_only=True,)
	
	#캐릭터 정보를 위해서
	character = serializers.CharField(read_only=True,)
	lavel = serializers.IntegerField(read_only=True,)
	bestWeapon = serializers.CharField(read_only=True,)
	#특성은 나중에

	# 옆의 통계를 위해서
	survivalTime = serializers.IntegerField(read_only=True,)
	averagerank = serializers.IntegerField(read_only=True,)
	averageKills = serializers.FloatField(read_only=True,)
	averageHunts = serializers.FloatField(read_only=True,)
	averageAssistants = serializers.FloatField(read_only=True,)
	averageDeal = serializers.FloatField(read_only=True,)
	averageProficiency = serializers.FloatField(read_only=True,)
	class Meta:
		model = ER_Stats_Model
		exclude = ("id",)

class UserStatsSerializerCreateSerializer(serializers.Serializer):
	rank = serializers.CharField()

	def create(self, request, data, commit=True):
		rank = data.get("rank", None)
		instance = ER_Stats_Model.objects.filter(rank=rank).first()
		if not instance:
			instance =ER_Stats_Model()
		instance.rank = rank
		
		set_ER_stats_data(instance, rank)

		instance_save(instance, commit)
		return instance

class UserInfoSerializer(serializers.ModelSerializer):
	#평균 ada
	nickname = serializers.CharField()
	mmr = serializers.IntegerField(read_only=True)
	averagerank = serializers.FloatField(read_only=True)
	averageKills = serializers.FloatField(read_only=True)
	averageHunts = serializers.FloatField(read_only=True)
	averageAssistants = serializers.FloatField(read_only=True)
	averageDeal = serializers.FloatField(read_only=True)
	averageProficiency = serializers.FloatField(read_only=True)

	# averagebestWeaponLevel = serializers.FloatField(default=1, read_only=True)
	mastery = MasterySerializer(read_only=True)

	#티어
	soloTier = serializers.CharField(max_length=10, read_only=True)
	duoTier = serializers.CharField(max_length=10, read_only=True)
	squadTier = serializers.CharField(max_length=10, read_only=True)

	most_pick = serializers.JSONField(default='{}', read_only=True)
	class Meta:
		model = ER_User_Info_Model
		fields = ('__all__')

class UserInfoCreateSerializer(serializers.Serializer):
	nickname = serializers.CharField()

	def create(self, request, data, commit=True):
		nickname = data.get("nickname", None)
		instance = ER_User_Info_Model.objects.filter(nickname=nickname).first()
		if not instance:
			instance = ER_User_Info_Model()
		instance.nickname = nickname

		set_ER_api_data(instance)
		# ER_status_updata(instance)

		instance_save(instance, commit)
		return instance



class UserGameRecordSerializer(serializers.ModelSerializer):
	nickname = serializers.CharField()

	rank = serializers.IntegerField(read_only=True)
	season = serializers.CharField(read_only=True,max_length=10,default=0)

	matchingMode = serializers.CharField(read_only=True, max_length=10) #일반2 랭크3
	matchingTeamMode = serializers.CharField(read_only=True, max_length=10)

	character = serializers.CharField(max_length=50, read_only=True)
	characterlevel = serializers.IntegerField(default=1, read_only=True)
	bestWeapon = serializers.CharField(max_length=30, read_only=True)
	bestWeaponLevel = serializers.IntegerField(default=1, read_only=True)

	Kills = serializers.FloatField(read_only=True)
	Hunts = serializers.FloatField(read_only=True)
	Assistants = serializers.FloatField(read_only=True)

	mmr = serializers.IntegerField(read_only=True)

	class Meta:
		model = ER_Game_Record
		fields = ('__all__')

class UserGameRecordCreateSerializer(serializers.Serializer):
	nickname = serializers.CharField()

	def create(self, request, data, commit=True):
		nickname = data.get("nickname", None)
		userNum=get_ER_userNum(nickname)
		sleep(1)
		usergames = get_ER_user_games(userNum)

		for i, content in reversed(list(enumerate(usergames["userGames"]))):
			instance = ER_Game_Record()
			instance.nickname = nickname
			set_ER_game_record_data(instance, userNum, content)

			instance_save(instance, commit)
		return ER_Game_Record.objects.filter(nickname=nickname).order_by("-id")[:20]
	
	def change(self, request, data, id, commit=True):
		instance = ER_Game_Record.objects.filter(id=id).first()

		set_ER_api_data(instance)

		instance_save(instance, commit)
		return instance
