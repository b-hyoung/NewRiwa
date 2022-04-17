import requests

from time import sleep
from Eriwa.settings import ER_API_KEY, ER_API_SEASON
from api.error_utils import error_msg

from rest_framework import exceptions

from .ER_utils import get_ER_Tier, get_ER_char_name, get_season
from ..models import ER_Base_Model, ER_Game_Record

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
	return res

def get_ER_user_games(userNum):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	user_status = "https://open-api.bser.io/v1/user/games/"+str(userNum)+'/'
	res = requests.get(user_status, headers=headers).json()
	return res

def set_ER_api_data(instance:ER_Base_Model):
	ER_userStats_Solo = 0
	ER_userStats_Duo = 1
	ER_userStats_Squad = 2

	most_one = 0
	most_two = 1
	most_squad = 2

	userNum = get_ER_userNum(instance.nickname)
	sleep(1)
	user_stats = get_ER_userstatus(userNum)

	#평균 K A H
	instance.winning_rate = int(user_stats["userStats"][ER_userStats_Squad]["averageRank"])
	instance.averageKills = user_stats["userStats"][ER_userStats_Solo]["averageKills"]
	instance.averageHunts = user_stats["userStats"][ER_userStats_Solo]["averageHunts"]

	# todo : 추후 game나 이런 api로 들어가서 평균 딜량을 측정등 추가 작업이 필요함으로 일단 보류
	# instance.averageProficiency = user_stats["userStats"][ER_userStats_Solo]["averageProficiency"]
	# instance.averageDeal = user_stats["userStats"][ER_userStats_Solo]["averageHunts"]
	
	# # 티어는
	instance.soloTier = get_ER_Tier(int(user_stats["userStats"][ER_userStats_Solo]["mmr"]))
	instance.duoTier	= get_ER_Tier(int(user_stats["userStats"][ER_userStats_Duo]["mmr"]))
	instance.squadTier= get_ER_Tier(int(user_stats["userStats"][ER_userStats_Squad]["mmr"]))

	# 모스트픽이 있지만 모스픽은 솔로에 3가지 듀오에 3가지 스쿼드에 3가지 이렇게 9가지가 있다 그렇다면 어떻게 하는게 좋을까?
	# 솔로의 3가지만 띄우는게 베스트 라고생각한다 일단 솔로 3가지를 띄우는 방향으로 가겠다.
	# temp = {}
	# try :
	# 	temp["most_one"] = {
	# 		"charcode" : get_ER_char_name(user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_one]["characterCode"]),
	# 		"averageRank" : user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_one]["averageRank"],}
	# 	temp["most_two"] = {
	# 		"charcode" : get_ER_char_name(user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_two]["characterCode"]),
	# 		"averageRank" : user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_two]["averageRank"],}
	# 	temp["most_squad"] = {
	# 		"charcode" : get_ER_char_name(user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_squad]["characterCode"]),
	# 		"averageRank" : user_stats["userStats"][ER_userStats_Solo]["characterStats"][most_squad]["averageRank"],}
	# except IndexError:
	# 	pass
	# instance.most_pick = temp
def set_ER_game_record_data(instance:ER_Game_Record):
	inckname = instance.nickname
	userNum=get_ER_userNum(inckname)

	user_games = get_ER_user_games(userNum)

	res = {}
	for i, content in enumerate(user_games["userGames"]):
		temp = {}
		temp["season"] = get_season(content["seasonId"])
		temp["gameRank"] = content["gameRank"]
		temp["Kill"] = content["playerKill"]
		temp["Assistant"] = content["playerAssistant"]
		temp["monsterKill"] = content["monsterKill"]
		temp["character"] = get_ER_char_name(content["characterNum"])
		res[i] = temp
	
	return res