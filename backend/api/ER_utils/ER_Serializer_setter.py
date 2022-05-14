
from api.ER_utils.ER_DB_utils_transfom import get_ER_char_name
from api.ER_utils.ER_DB_utils_image import get_ER_charicon_image



def set_mostpick_Serializer(rtn):
	temp = {}
	temp["most_one_charName"] = get_ER_char_name(rtn.most_one_charcode)
	temp["most_one_charimg"] = get_ER_charicon_image(rtn.most_one_charcode)
	temp["most_two_charName"] = get_ER_char_name(rtn.most_two_charcode)
	temp["most_two_charimg"] = get_ER_charicon_image(rtn.most_two_charcode)
	temp["most_three_charName"] = get_ER_char_name(rtn.most_three_charcode)
	temp["most_three_charimg"] = get_ER_charicon_image(rtn.most_three_charcode)
	return temp