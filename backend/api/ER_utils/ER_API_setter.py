from time import sleep
from Eriwa.settings import ER_API_SEASON

from api.ER_utils.ER_DB_utils_image import get_ER_char_image
from api.ER_utils.ER_API_getter import get_ER_userNum, get_ER_user_games, get_ER_userstatus
from api.ER_utils.ER_API_utils import ER_user_averageDeal
from api.error_utils import error_msg

from .ER_DB_utils_transfom import get_ER_Tier, get_ER_char_name, get_season
from ..models import ER_Stats_Model, ER_User_Info_Model, ER_Game_Record_Model, ItemModel, MasteryModel, MostPickModel

from rest_framework import exceptions

def set_ER_averageMastery(instance:ER_Stats_Model, user_games):
	data_len = len(user_games["userGames"])
	bestWeaponLevel = 0
	Traplevel = 0
	Productionlevel = 0
	Searchlevel = 0
	Movelevel = 0
	Strengthlevel = 0
	Defenselevel = 0
	Huntinglevel = 0

	for data in user_games["userGames"]:
		bestWeaponLevel += data["bestWeaponLevel"]
		Traplevel += data["masteryLevel"]["101"]
		Productionlevel += data["masteryLevel"]["102"]
		Searchlevel += data["masteryLevel"]["103"]
		Movelevel += data["masteryLevel"]["104"]
		Strengthlevel += data["masteryLevel"]["201"]
		Defenselevel += data["masteryLevel"]["202"]
		Huntinglevel += data["masteryLevel"]["204"]

	if instance.mastery_id == None:
		mastery = MasteryModel.objects.create(nickname = instance.nickname, mmr = instance.mmr)
	else:
		mastery = MasteryModel.objects.filter(id = instance.mastery_id).first()
		
	mastery.averagebestWeaponLevel = bestWeaponLevel / data_len
	mastery.averageTraplevel = Traplevel / data_len 
	mastery.averageProductionlevel = Productionlevel / data_len 
	mastery.averageSearchlevel = Searchlevel / data_len 
	mastery.averageMovelevel = Movelevel / data_len 
	mastery.averageStrengthlevel = Strengthlevel / data_len 
	mastery.averageDefenselevel = Defenselevel / data_len 
	mastery.averageHuntinglevel = Huntinglevel / data_len 
	mastery.save()
	instance.mastery_id = mastery.id

	instance.averageProficiency = mastery.get_averageProficiency()

def set_ER_mostpick(instance:ER_User_Info_Model, userstats, matchingTeamMode):
	if instance.mostpick_id == None:
		temp_mostpick = MostPickModel.objects.create(nickname = instance.nickname, matchingTeamMode=matchingTeamMode)
	else:
		temp_mostpick = MostPickModel.objects.filter(id = instance.mastery_id).first()

	try :
		list_index = matchingTeamMode-1
		temp_mostpick.season = ER_API_SEASON
		temp_mostpick.most_one_charName = get_ER_char_name(
			userstats["userStats"][list_index]["characterStats"][0]["characterCode"]
		)
		temp_mostpick.most_one_charImage = get_ER_char_image(
			userstats["userStats"][list_index]["characterStats"][0]["characterCode"]
		)
		temp_mostpick.most_one_averageRank=(
			userstats["userStats"][list_index]["averageRank"]
		)
	except IndexError:
		temp_mostpick.season = ER_API_SEASON
		temp_mostpick.most_one_charName = get_ER_char_name(
			userstats["userStats"]["characterStats"][0]["characterCode"]
		)
		temp_mostpick.most_one_charImage = get_ER_char_image(
			userstats["userStats"]["characterStats"][0]["characterCode"]
		)
		temp_mostpick.most_one_averageRank=(
			userstats["userStats"]["averageRank"]
		)
	temp_mostpick.save()
	instance.mostpick_id = temp_mostpick.id

def set_ER_api_data(instance:ER_User_Info_Model, matchingTeamMode):
	ER_userStats_Solo = 0
	ER_userStats_Duo = 1
	ER_userStats_Squad = 2

	if not instance.userNum:
		userNum = get_ER_userNum(instance.nickname)
		instance.userNum = userNum
		sleep(1)
	else :
		userNum = instance.userNum
	user_stats = get_ER_userstatus(userNum)
	sleep(1)
	user_games = get_ER_user_games(userNum)
	sleep(1)
	instance.mmr = int(user_stats["userStats"][ER_userStats_Solo]["mmr"])
	#평균 K A H
	print(instance.nickname)
	instance.averageRanking = int(user_stats["userStats"][ER_userStats_Solo]["averageRank"])
	instance.averageKills = user_stats["userStats"][ER_userStats_Solo]["averageKills"]
	instance.averageHunts = user_stats["userStats"][ER_userStats_Solo]["averageHunts"]
	instance.averageAssistants = user_stats["userStats"][ER_userStats_Solo]["averageAssistants"]
	instance.averageDeal = ER_user_averageDeal(user_games)
	set_ER_averageMastery(instance, user_games)
	set_ER_mostpick(instance, user_stats, matchingTeamMode)

	instance.soloTier = get_ER_Tier(int(user_stats["userStats"][ER_userStats_Solo]["mmr"]))
	# instance.duoTier	= get_ER_Tier(int(user_stats["userStats"][ER_userStats_Duo]["mmr"]))
	# instance.squadTier= get_ER_Tier(int(user_stats["userStats"][ER_userStats_Squad]["mmr"]))

def set_ER_game_record_data(instance:ER_Game_Record_Model, userNum, content):
		instance.ranking = content["gameRank"]
		instance.season = get_season(content["seasonId"])

		instance.gameId = content["gameId"]
		instance.matchingMode = "일반" if content["matchingMode"] == 2 else "랭크"
		instance.matchingTeamMode = "솔로" if content["matchingTeamMode"] == 1 else "듀오" if content["matchingTeamMode"] == 2 else "스쿼드"
		
		instance.character = get_ER_char_name(content["characterNum"])
		instance.characterlevel = content["characterLevel"]
		instance.bestWeapon = content["bestWeapon"]
		instance.bestWeaponLevel = content["bestWeaponLevel"]
		
		instance.Kills = content["playerKill"]
		instance.Hunts = content["monsterKill"]
		instance.Assistants = content["playerAssistant"]

      # "traitFirstCore": 7200201,
      # "traitFirstSub": [
      #   7210101,
      #   7210201
      # ],
      # "traitSecondSub": [
      #   7010101,
      #   7010401
      # ],
		instance.items = set_ER_items(content["equipment"], instance.character)
		# instance.Trait = content[""]
		instance.Route = content["routeIdOfStart"]
		
		try :
			instance.mmr = content["mmrAfter"]
		except :
			instance.mmr = 0

def set_ER_stats_data(instance:ER_Stats_Model, rank, matchingTeamMode="1"):
	'''
	mmr을 랭크고 변환하고
	filter로 mmr이 비슷한것들을 가져온다 (골드, 실버,...)
	그다음 for문을 통해서
	'''
	tempsolo = ER_User_Info_Model.objects.filter(soloTier__istartswith=rank).all()
	if not tempsolo.exists():
		raise exceptions.ValidationError(error_msg(101), code=404)
	averageKills = 0
	averageAssistants = 0
	averageDeal = 0
	averageHunts = 0
	averageProficiency = 0
	solo_len = len(tempsolo)
	for i in tempsolo:
		averageAssistants += i.averageAssistants
		averageDeal += i.averageDeal
		averageKills += i.averageKills
		averageHunts += i.averageHunts
		averageProficiency += i.averageProficiency

	instance.averageRanking = 9 if matchingTeamMode == "1" else 4.5 if matchingTeamMode == "2" else 3

	instance.averageKills = averageKills/solo_len
	instance.averageHunts = averageHunts/solo_len
	instance.averageAssistants = averageAssistants/solo_len
	instance.averageDeal = averageDeal/solo_len
	instance.averageProficiency = averageProficiency/solo_len


def set_ER_items(data, char):
	instance = ItemModel.objects.create()
	instance.charName = char
	instance.Weapon = data.get("0")
	instance.Haed = data.get("1")
	instance.Clothes = data.get("2")
	instance.Arm = data.get("3")
	instance.Leg = data.get("4")
	instance.Accessories = data.get("5")
	instance.save()
	return instance
# def set_ER_Trait():


# def set_ER_items_image(data):
# 	print(data)
# 	(data["Weapon"])
# 	(data["Haed"])
# 	(data["Clothes"])
# 	(data["Arm"])
# 	(data["Leg"])
# 	(data["Accessories"])