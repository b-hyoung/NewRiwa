import requests

from time import sleep
from Eriwa.settings import ER_API_KEY, ER_API_SEASON
from api.error_utils import error_msg

from rest_framework import exceptions

from .ER_utils import get_ER_Tier, get_ER_char_name, get_season
from ..models import ER_User_Info_Model, ER_Game_Record, Mastery

def get_ER_userNum(nickname):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	usernick_url = "https://open-api.bser.io/v1/user/nickname?query="+str(nickname)
	res = requests.get(usernick_url, headers=headers).json()
	if res['code'] == 404:
		raise exceptions.ValidationError(error_msg(2), code=400)
	userNum = res["user"]["userNum"]
	return userNum

def get_ER_userstatus(userNum):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	user_status = "https://open-api.bser.io/v1/user/stats/"+str(userNum)+'/'+str(ER_API_SEASON)
	res = requests.get(user_status, headers=headers).json()
	if res['code'] == 404:
		raise exceptions.ValidationError(error_msg(2), code=404)
	return res

def get_ER_user_games(userNum):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	user_status = "https://open-api.bser.io/v1/user/games/"+str(userNum)+'/'
	res = requests.get(user_status, headers=headers).json()
	if res['code'] == 404:
		raise exceptions.ValidationError(error_msg(2), code=404)
	return res

def ER_user_averageDeal(user_games):
	data_len = len(user_games["userGames"])
	sum_data = 0
	for data in user_games["userGames"]:
		sum_data = sum_data + data["damageToPlayer"]
	
	return sum_data / data_len

def set_ER_averageMastery(instance, user_games):
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
		mastery = Mastery.objects.create(nickname = instance.nickname, mmr = instance.mmr)
	else:
		mastery = Mastery.objects.filter(id = instance.mastery_id).first()
		
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


def set_ER_api_data(instance:ER_User_Info_Model):
	ER_userStats_Solo = 0
	ER_userStats_Duo = 1
	ER_userStats_Squad = 2
	most_one = 0
	most_two = 1
	most_squad = 2

	userNum = get_ER_userNum(instance.nickname)
	sleep(1)
	user_stats = get_ER_userstatus(userNum)
	sleep(1)
	user_games = get_ER_user_games(userNum)
	instance.mmr = int(user_stats["userStats"][ER_userStats_Solo]["mmr"])
	#평균 K A H
	instance.averagerank = int(user_stats["userStats"][ER_userStats_Squad]["averageRank"])
	instance.averageKills = user_stats["userStats"][ER_userStats_Solo]["averageKills"]
	instance.averageHunts = user_stats["userStats"][ER_userStats_Solo]["averageHunts"]
	instance.averageAssistants = user_stats["userStats"][ER_userStats_Solo]["averageAssistants"]
	instance.averageDeal = ER_user_averageDeal(user_games)
	set_ER_averageMastery(instance, user_games)

	instance.soloTier = get_ER_Tier(int(user_stats["userStats"][ER_userStats_Solo]["mmr"]))
	instance.duoTier	= get_ER_Tier(int(user_stats["userStats"][ER_userStats_Duo]["mmr"]))
	instance.squadTier= get_ER_Tier(int(user_stats["userStats"][ER_userStats_Squad]["mmr"]))

	most_pick = {}
	try :
		most_pick["most_one"] = {
			"charcode" : get_ER_char_name(user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_one]["characterCode"]),
			"averageRank" : user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_one]["averageRank"],}
		most_pick["most_two"] = {
			"charcode" : get_ER_char_name(user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_two]["characterCode"]),
			"averageRank" : user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_two]["averageRank"],}
		most_pick["most_squad"] = {
			"charcode" : get_ER_char_name(user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_squad]["characterCode"]),
			"averageRank" : user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_squad]["averageRank"],}
	except IndexError:
		pass
	instance.most_pick = most_pick

def set_ER_game_record_data(instance:ER_Game_Record, userNum, content):
		instance.rank = content["gameRank"]
		instance.season = get_season(content["seasonId"])

		instance.matchingMode = "일반" if content["matchingMode"] == 3 else "랭크"
		instance.matchingTeamMode = "솔로" if content["matchingTeamMode"] == 1 else "듀오" if content["matchingTeamMode"] == 2 else "스쿼드"
		
		instance.character = get_ER_char_name(content["characterNum"])
		instance.characterlevel = content["characterLevel"]
		instance.bestWeapon = content["bestWeapon"]
		instance.bestWeaponLevel = content["bestWeaponLevel"]
		
		instance.Kills = content["playerKill"]
		instance.Hunts = content["playerAssistant"]
		instance.Assistants = content["monsterKill"]
		try :
			instance.mmr = content["mmrAfter"]
		except :
			instance.mmr = 0