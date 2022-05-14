from .ER_DB import ER_char_img, ER_charhalf_img
from Eriwa.settings import STATIC_URL

def get_ER_charicon_image(charcode:int):
	return ("/image/Char/icon/" + ER_char_img[charcode])

def get_ER_charhalf_image(charcode:int):
	return ("/image/Char/Full/" + ER_charhalf_img[charcode])

# def get_ER_itemsa_Amor_image(itemcode:int):
# 	return ("image/item/Amor" + )

# def get_ER_itemsa_Weapon_image(itemcode:int):
# 	return ("image/item/Weapon/" + )