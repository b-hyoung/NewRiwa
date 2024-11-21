from rest_framework import exceptions

from django.db.models import Q

from api.ER_utils.ER_API_getter import get_ER_user_games
from api.error_utils import error_msg
from api.models import ER_User_Info_Model


def ER_user_averageDeal(userNum,nickname, user_games, matchingTeamMode):
	data_len = len(user_games["userGames"])
	sum_data = 0

	playcount = 0
	nextcount = 0
	while True:
		for data in user_games["userGames"]:
			if data["matchingTeamMode"] == matchingTeamMode:
				sum_data = sum_data + data["damageToPlayer"]
				playcount += 1
			else:
				continue
		if playcount > 10:
			break
		else :
			next = user_games["next"]
			user_games = get_ER_user_games(userNum, next)
			nextcount += 1
			if nextcount > 5:
				temp = ER_User_Info_Model.objects.get(Q(nickname=nickname) & Q(matchingTeamMode=matchingTeamMode))
				temp.delete()
				raise exceptions.ValidationError(error_msg(302), code=404)

	return round(sum_data / data_len, 2)
