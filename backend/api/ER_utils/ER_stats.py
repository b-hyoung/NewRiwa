from api.ER_utils.ER_Data_base_utils2 import get_Tier
from ..models import ER_Stats_Model, ER_User_Info_Model, ER_Game_Record, Mastery

def set_ER_stats_data(instance:ER_Stats_Model, rank):

	'''
	mmr을 랭크고 변환하고
	filter로 mmr이 비슷한것들을 가져온다 (골드, 실버,...)
	그다음 for문을 통해서
	'''
	tempsolo = ER_User_Info_Model.objects.filter(soloTier__istartswith=rank)
	averageKills = 0
	averageAssistants = 0
	averageDeal = 0
	averageHunts = 0
	averageProficiency = 0
	solo_len = len(tempsolo)
	for i in tempsolo:
		averageAssistants += i.averageAssistants
		averageDeal += i.averageDeal
		averageKills += i.averageKills
		averageHunts += i.averageHunts
		averageProficiency += i.averageProficiency

	instance.averageKills = averageKills/solo_len
	instance.averageHunts = averageHunts/solo_len
	instance.averageAssistants = averageAssistants/solo_len
	instance.averageDeal = averageDeal/solo_len
	instance.averageProficiency = averageProficiency/solo_len

def ER_status_update(instance:ER_User_Info_Model):
	'''
	user/game 에서 gameid를가져온다
	games에서 닉네임을 리스트로 가져온다
	각각의 닉네임으로 ER_stats_data를 추가해준다?
	'''