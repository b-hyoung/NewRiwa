
from api.ER_utils.ER_API_utils import ER_user_averageDeal
from api.models import ER_Stats_Model, MasteryModel


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
		
	mastery.averagebestWeaponLevel = round(bestWeaponLevel / data_len, 2)
	mastery.averageTraplevel = round(Traplevel / data_len, 2)
	mastery.averageProductionlevel = round(Productionlevel / data_len, 2)
	mastery.averageSearchlevel = round(Searchlevel / data_len, 2)
	mastery.averageMovelevel = round(Movelevel / data_len, 2)
	mastery.averageStrengthlevel = round(Strengthlevel / data_len, 2)
	mastery.averageDefenselevel = round(Defenselevel / data_len, 2)
	mastery.averageHuntinglevel = round(Huntinglevel / data_len, 2)
	mastery.save()
	instance.mastery_id = mastery.id
	return mastery.get_averageProficiency()

def set_ER_graph_data(instance, user_stats, user_games, ER_user_status_mode:int):
	ER_user_status_mode = ER_user_status_mode- 1
	instance.averageRanking = int(user_stats["userStats"][ER_user_status_mode]["averageRank"])
	instance.averageKills = user_stats["userStats"][ER_user_status_mode]["averageKills"]
	instance.averageHunts = user_stats["userStats"][ER_user_status_mode]["averageHunts"]
	instance.averageAssistants = user_stats["userStats"][ER_user_status_mode]["averageAssistants"]
	instance.averageDeal = ER_user_averageDeal(user_games)
	instance.averageProficiency = set_ER_averageMastery(instance, user_games)