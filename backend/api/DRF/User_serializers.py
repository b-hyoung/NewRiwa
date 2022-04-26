
from rest_framework import serializers
from api.ER_utils.ER_API_setter import set_ER_api_data, set_ER_stats_data

from api.models import ER_User_Info_Model, ER_Stats_Model
from api.models_utils import instance_save
from api.DRF.Base_serialzers import MasterySerializer, MostpickSerializer
from api.ER_utils.ER_DB_stats_utils import ER_status_update

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
	averagerank = serializers.IntegerField(read_only=True,)
	averageKills = serializers.FloatField(read_only=True,)
	averageHunts = serializers.FloatField(read_only=True,)
	averageAssistants = serializers.FloatField(read_only=True,)
	averageDeal = serializers.FloatField(read_only=True,)
	averageProficiency = serializers.FloatField(read_only=True,)
	survivalTime = serializers.IntegerField(read_only=True,)

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
	mostpick = MostpickSerializer(read_only=True)

	#티어
	soloTier = serializers.CharField(max_length=10, read_only=True)
	duoTier = serializers.CharField(max_length=10, read_only=True)
	squadTier = serializers.CharField(max_length=10, read_only=True)

	class Meta:
		model = ER_User_Info_Model
		exclude = ("id", "userNum", "updated_at", "created_at")

class UserInfoCreateSerializer(serializers.Serializer):
	nickname = serializers.CharField()

	def create(self, request, data, commit=True):
		nickname = data.get("nickname", None)
		instance = ER_User_Info_Model.objects.filter(nickname=nickname).first()
		if not instance:
			instance = ER_User_Info_Model()
		instance.nickname = nickname
		matchingTeamMode = request.GET.get("matchingTeamMode",1)
		set_ER_api_data(instance, matchingTeamMode)
		ER_status_update(instance)

		instance_save(instance, commit)
		return instance
