from email.policy import default
from time import sleep
from django.conf import settings
from rest_framework import serializers, exceptions
from api.ER_utils.ER_API_utils import set_ER_api_data, set_ER_game_record_data

from api.models import ER_Game_Record
from api.models_utils import instance_save
from api.ER_utils.ER_stats import set_ER_stats_data
from ..ER_utils.ER_API_utils import get_ER_user_games, get_ER_userNum

class UserGameRecordSerializer(serializers.ModelSerializer):
	nickname = serializers.CharField()

	rank = serializers.IntegerField(read_only=True)
	season = serializers.CharField(read_only=True,max_length=10,default=0)

	matchingMode = serializers.CharField(read_only=True, max_length=10) #일반2 랭크3
	matchingTeamMode = serializers.CharField(read_only=True, max_length=10)

	character = serializers.CharField(max_length=50, read_only=True)
	characterlevel = serializers.IntegerField(default=1, read_only=True)
	bestWeapon = serializers.CharField(max_length=30, read_only=True)

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
