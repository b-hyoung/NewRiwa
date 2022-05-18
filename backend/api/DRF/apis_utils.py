
from api.ER_utils.ER_DB_utils_image import get_ER_WeaponIconImg, get_ER_TierImg, get_ER_charhalf_image, get_ER_ItemsImg, get_ER_charicon_image
from api.ER_utils.ER_DB_utils_transfom import get_season, get_ER_char_name
from api.ER_utils.ER_Serializer_setter import set_mostpick_Serializer



def set_userinfo_serializers_data(api, data):
	api["mostpick"] = set_mostpick_Serializer(data.mostpick)
	api["mainCharImg"] = get_ER_charhalf_image(data.mostpick.most_one_charcode)
	api["season"] = get_season(int(api["seasonId"]))
	api["mainTireImg"] = get_ER_TierImg(api)

def set_usergame_serializers_data(api, data, i):
	api[i]["itemImage"] = get_ER_ItemsImg(data.items)
	api[i]["charImg"] = get_ER_charicon_image(data.charnum)
	api[i]["bestWeaponImg"] = get_ER_WeaponIconImg(data.bestWeapon)
	# api[i]["TraitImg"] = get_ER_TraitImg(data)