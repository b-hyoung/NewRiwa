import requests
from Eriwa.settings import ER_API_KEY, ER_API_SEASON
from api.error_utils import error_msg

from rest_framework import exceptions

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

def get_ER_user_games(userNum, _next=None):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	user_status = "https://open-api.bser.io/v1/user/games/"+str(userNum)+'/'
	res = requests.get(user_status, headers=headers, params={"next" : _next}).json()
	if res['code'] == 404:
		raise exceptions.ValidationError(error_msg(2), code=404)
	return res

def get_ER_game(gameId, next=None):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	user_status = "https://open-api.bser.io/v1/user/games/"+str(gameId)+'/'
	res = requests.get(user_status, headers=headers).json()
	if res['code'] == 404:
		raise exceptions.ValidationError(error_msg(2), code=404)
	return res

def	get_ER_games(gameId, _next=None):
	headers = {"accept": "applications/json", "x-api-key": ER_API_KEY}
	user_status = "https://open-api.bser.io/v1/games/"+str(gameId)+'/'
	res = requests.get(user_status, headers=headers).json()
	if res['code'] == 404:
		raise exceptions.ValidationError(error_msg(2), code=404)
	return res