from rest_framework import serializers, exceptions
from api.ER_utils.ER_API_utils import set_ER_api_data

from api.models import ER_Base_Model
from api.models_utils import instance_save

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
	# duoTier = serializers.CharField(max_length=10, read_only=True)
	# squadTier = serializers.CharField(max_length=10, read_only=True)
	# most_pick = serializers.JSONField(default='{}', read_only=True)
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
