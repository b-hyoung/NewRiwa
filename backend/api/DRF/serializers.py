from time import sleep
from rest_framework import serializers, exceptions
from api.ER_utils.ER_API_utils import set_ER_api_data, set_ER_game_record_data

from api.models import ER_Base_Model, ER_Game_Record
from api.models_utils import instance_save
from ..ER_utils.ER_API_utils import get_ER_user_games, get_ER_userNum

class UserGameRecordSerializer(serializers.ModelSerializer):
	rank = serializers.IntegerField(read_only=True,)
	season = serializers.CharField(read_only=True,max_length=10,default=0)

	lavel = serializers.IntegerField(read_only=True,default=1)
	character = serializers.CharField(read_only=True,max_length=50)

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

		for i, content in enumerate(usergames["userGames"]):
			instance = ER_Game_Record()
			instance.nickname = nickname
			set_ER_game_record_data(instance, userNum, content)

			instance_save(instance, commit)
		return instance
	
	def change(self, request, data, id, commit=True):
		instance = ER_Game_Record.objects.filter(id=id).first()

		set_ER_api_data(instance)

		instance_save(instance, commit)
		return instance

class UserDataSerializer(serializers.ModelSerializer):
	
	#평균 ada
	winning_rate = serializers.FloatField(read_only=True)
	averageKills = serializers.FloatField(read_only=True)
	averageHunts = serializers.FloatField(read_only=True)
	averageAssistants = serializers.FloatField(read_only=True)
	averageDeal = serializers.FloatField(read_only=True)
	averageProficiency = serializers.FloatField(read_only=True)
	#티어
	soloTier = serializers.CharField(max_length=10, read_only=True)
	duoTier = serializers.CharField(max_length=10, read_only=True)
	squadTier = serializers.CharField(max_length=10, read_only=True)

	# most_pick = serializers.JSONField(default='{}', read_only=True)
	game_record = serializers.JSONField(read_only=True)
	class Meta:
		model = ER_Base_Model
		excludes = ("averageDeal", "averageProficiency")
		fields = ('__all__')

class UserDataCreateSerializer(serializers.Serializer):
	nickname = serializers.CharField()

	def create(self, request, data, commit=True):
		instance = ER_Base_Model()
		instance.nickname = data.get("nickname", None)
		set_ER_api_data(instance)
		instance_save(instance, commit)

		return instance
	
	def change(self, request, data, id, commit=True):
		instance = ER_Base_Model.objects.filter(id=id).first()

		set_ER_api_data(instance)
		instance_save(instance, commit)
		return instance
