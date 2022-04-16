from rest_framework import serializers

from backend.api.models import ER_Base_Model

class UserDataSerializer(serializers.ModelSerializer):
	winning_rate = serializers.FloatField(read_only=True)
	
	#평균 ada
	averageKills = serializers.FloatField(read_only=True)
	averageHunts = serializers.FloatField(read_only=True)
	averageAssistants = serializers.FloatField(read_only=True)

	#티어
	soloTier = serializers.CharField(max_length=10, read_only=True)
	# duoTier = serializers.CharField(max_length=10, read_only=True)
	# squadTier = serializers.CharField(max_length=10, read_only=True)
	# most_pick = serializers.JSONField(default='{}', read_only=True)
	class Meta:
		model = ER_Base_Model
		fields = ('__all__')