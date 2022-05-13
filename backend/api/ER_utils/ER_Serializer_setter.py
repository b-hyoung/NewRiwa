
from api.ER_utils.ER_DB_utils_transfom import get_ER_char_name


def set_mostpick_Serializer(rtn):
	temp = {}
	temp["most_one_charName"] = get_ER_char_name(rtn.most_one_charcode)
	temp["most_one_charimg"] = rtn.most_one_charcode
	temp["most_two_charName"] = get_ER_char_name(rtn.most_two_charcode)
	temp["most_two_charimg"] = rtn.most_two_charcode
	temp["most_three_charName"] = get_ER_char_name(rtn.most_three_charcode)
	temp["most_three_charimg"] = rtn.most_three_charcode
	return temp