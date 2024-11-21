
from api.ER_utils.ER_API_getter import (
	get_ER_userNum,get_ER_user_games, get_ER_games
)
from api.ER_utils.ER_DB_utils_transfom import get_ER_Tier
from api.ER_utils.ER_API_setter import set_ER_info_data
from api.models_utils import instance_save
from ..models import ER_Stats_Model, ER_User_Info_Model

def ER_status_update(instance:ER_User_Info_Model):
	#1. 랭크게임가져오기 
	userNum = get_ER_userNum(instance.nickname)
	_next = None
	solo_gameId = 0
	duo_gameId = None
	squad_gameId = None

	# +len(duo_gameId) + len(squad_gameId)
	# 솔로 데이터 만 일단 하는걸로 하는데 나중에는... 모든게 1개이상일때까지 기다리기
	while solo_gameId  < 1:
		user_games = get_ER_user_games(userNum, _next)
		for games in user_games["userGames"]:
			if games["matchingMode"] == 3:
				if games["matchingTeamMode"] == 1 :
					solo_gameId = games["gameId"]
				# elif games["matchingTeamMode"] == 2 :
				# 	duo_gameId = games["gameId"]
				# elif games["matchingTeamMode"] == 3 :
				# 	squad_gameId = games["gameId"]
				break
			pass
		_next = user_games["next"]
	
	#2. 랭크게임의 유저num 리스트로 가져오기
	userNum_list = []
	nickname_list = []
	temp = 0
	solo_games = get_ER_games(solo_gameId)

	# duo_games = get_ER_games(duo_gameId)
	# squad_games = get_ER_games(squad_gameId)
	for game in solo_games["userGames"]:
		userNum_list.append(game["userNum"])
		nickname_list.append(game["nickname"])
		temp += game["mmrBefore"]
	temp = temp / len(solo_games["userGames"])
	rank = get_ER_Tier(int(temp)).split()[0]
	
	# 3. 그곳에 있는 유저를 등록한다 ( 표본을 늘린다)
	for _usernum, _nickname in zip(userNum_list, nickname_list):
		temp_instanse = ER_User_Info_Model.objects.filter(userNum=_usernum).first()
		if temp_instanse == None:
			temp_instanse = ER_User_Info_Model.objects.create(userNum=_usernum, nickname=_nickname)
			set_ER_info_data(temp_instanse, 1)
			instance_save(temp_instanse, True)
		else :
			print("유저 데이터가 있습니다")
