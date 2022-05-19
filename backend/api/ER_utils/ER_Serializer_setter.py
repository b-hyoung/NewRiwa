
from api.ER_utils.ER_DB_utils_transfom import get_ER_char_name
from api.ER_utils.ER_DB_utils_image import get_ER_charicon_image
from api.ER_utils.ER_API_getter import get_ER_userstatus



def set_mostpick_Serializer(rtn, userNum):
	temp = {}
	Teammode = int(rtn.matchingTeamMode) - 1
	userstats = get_ER_userstatus(userNum)
	temp["most_one_charName"] = get_ER_char_name(rtn.most_one_charcode)
	temp["most_one_charimg"] = get_ER_charicon_image(rtn.most_one_charcode)
	try :
		temp["most_one_char_totalGame"] = userstats["userStats"][Teammode]["characterStats"][0]["totalGames"]
	except IndexError:
		try:
			temp["most_one_char_totalGame"] = userstats["userStats"]["characterStats"][0]["totalGames"]
		except TypeError:
			pass
	try :
		temp["most_one_char_wins"] = userstats["userStats"][Teammode]["characterStats"][0]["wins"]
	except IndexError:
		try:
			temp["most_one_char_wins"] = userstats["userStats"]["characterStats"][0]["wins"]
		except TypeError:
			pass


	temp["most_two_charName"] = get_ER_char_name(rtn.most_two_charcode)
	temp["most_two_charimg"] = get_ER_charicon_image(rtn.most_two_charcode)
	try :
		temp["most_two_char_totalGames"] = userstats["userStats"][Teammode]["characterStats"][1]["totalGames"]
	except IndexError:
		try:
			temp["most_two_char_totalGames"] = userstats["userStats"]["characterStats"][1]["totalGames"]
		except TypeError:
			pass
	try :
		temp["most_two_char_wins"] = userstats["userStats"][Teammode]["characterStats"][1]["wins"]
	except IndexError:
		try:
			temp["most_two_char_wins"] = userstats["userStats"]["characterStats"][1]["wins"]
		except TypeError:
			pass

	temp["most_three_charName"] = get_ER_char_name(rtn.most_three_charcode)
	temp["most_three_charimg"] = get_ER_charicon_image(rtn.most_three_charcode)
	try :
		temp["most_three_char_totalGames"] = userstats["userStats"][Teammode]["characterStats"][2]["totalGames"]
	except IndexError:
		try:
			temp["most_three_char_totalGames"] = userstats["userStats"]["characterStats"][2]["totalGames"]
		except TypeError:
			pass
	try :
		temp["most_three_char_wins"] = userstats["userStats"][Teammode]["characterStats"][2]["wins"]
	except IndexError:
		try:
			temp["most_three_char_wins"] = userstats["userStats"]["characterStats"][2]["wins"]
		except TypeError:
			pass
	return temp