def ER_user_averageDeal(user_games):
	data_len = len(user_games["userGames"])
	sum_data = 0
	for data in user_games["userGames"]:
		sum_data = sum_data + data["damageToPlayer"]
	
	return sum_data / data_len
