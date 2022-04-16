from .ER_Data_base import ER_char_name, ER_Tier

def get_Tier(rank_point):
	Tier = ER_Tier[rank_point]
	return Tier

def get_Tier_Num(rank_point):
	tier_num = rank_point // 100
	if tier_num == 0:
		return 4
	elif tier_num == 1:
		return 3
	elif tier_num == 2:
		return 2
	else:
		return 1

def get_ER_char_name(charcode:int):
	return (ER_char_name[charcode])

def get_ER_Tier(mmr:int):
	rank = mmr // 400

	Tier = get_Tier(rank)
	Tier_num = get_Tier_Num(mmr % 400)
	league_point = (rank % 100) + 1

	Tier_LP = str(Tier) + " " + str(Tier_num) + " " + str(league_point)
	return Tier_LP
