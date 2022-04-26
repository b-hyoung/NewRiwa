from rest_framework import serializers

from api.models import Mastery, MostPick, ItemModels

class MasterySerializer(serializers.ModelSerializer):
	class Meta:
		model = Mastery
		exclude = ("id", "nickname", "mmr")

class MostpickSerializer(serializers.ModelSerializer):
	class Meta:
		model = MostPick
		exclude = ("id", "nickname")

class ItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = ItemModels
		exclude = ("id")