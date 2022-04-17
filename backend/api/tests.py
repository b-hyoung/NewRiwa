from django.test import TestCase

import requests
from .ER_utils.ER_Data_base import ER_char_name

from error_utils import error_msg

from rest_framework import exceptions
# Create your tests here.
ER_API_KEY = "3bUFddKUDZ6aQPWMxL5U5aFZyGXMy6NO2hht7gM6"

def get_season(seasonId):
	if seasonId == 0:
		return "일반"
	seasonNum = (seasonId // 2)+1
	seasonName = "" if seasonId % 2 == 1 else "프리"
	return("{}시즌 {}".format(seasonName, seasonNum))

def get_ER_userNum(nickname):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	usernick_url = "https://open-api.bser.io/v1/user/nickname?query="+str(nickname)
	res = requests.get(usernick_url, headers=headers).json()
	if res['code'] == 404:
		raise exceptions.ValidationError(error_msg(2), code=400)
	userNum = res["user"]["userNum"]
	return userNum

def get_ER_char_name(charcode:int):
	return (ER_char_name[charcode])

def main():
	userNum=get_ER_userNum("어후러")
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	user_status = "https://open-api.bser.io/v1/user/games/"+str(userNum)+'/'
	res = requests.get(user_status, headers=headers).json()
	for i, content in enumerate(res["userGames"]):
		print("===={}번쨰 게임====".format(i))
		print("시즌 = {}".format(get_season(content["seasonId"])))
		print("순위 = {}".format(content["gameRank"]))
		print("k/a/h = {}/{}/{}".format(content["playerKill"],
																		content["playerAssistant"],
																		content["monsterKill"]))
		print("캐릭터 = {}".format(get_ER_char_name(content["characterNum"])))


# 리스트는 총 2개임
# 1. 종합적으로 나오는 게임들 #1 #2 #5 이렇게 등수가 나옴
# 보여줘야할 내용
# c. 사용한 케릭터, 케릭터 스킨
# d. 사용한 아이템
# e. mmr <- 
# f. 게임모드 (랭크, 노말) <- 시즌 id
# 솔로, 듀오, 스쿼드
# g. 지나간 날짜?
# h. 특성
# i. 루트

# 2. 안에 눌러서 세부적인 내용들


if __name__ == '__main__':
    main()