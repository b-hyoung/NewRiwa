from rest_framework import serializers

from api.models import MasteryModel, MostPickModel, ItemModel, TraitModel

class MasterySerializer(serializers.ModelSerializer):
	class Meta:
		model = MasteryModel
		exclude = ("id", "nickname", "mmr")

class MostpickSerializer(serializers.ModelSerializer):
	class Meta:
		model = MostPickModel
		exclude = ("id", "nickname")

class ItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = ItemModel
		exclude = ("id","charName")

class TraitSerializer(serializers.ModelSerializer):
	#image 추가하기
	class Meta:
		model = TraitModel
		exclude = ("id",)