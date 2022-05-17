from api.models import ItemModel
from .ER_DB import ER_Items, ER_char_img, ER_charhalf_img
from Eriwa.settings import STATIC_URL

def get_ER_charicon_image(charcode:int):
	if charcode == None:
		return None
	return ("/image/Char/icon/" + ER_char_img[charcode])

def get_ER_charhalf_image(charcode:int):
	if charcode == None:
		return None
	return ("/image/Char/Full/" + ER_charhalf_img[charcode])

def get_ER_WeaponImg(itemcode:int):
	if itemcode == None:
		return None
	return ("image/Item/Weapon/" + ER_Items[itemcode])

def get_ER_AmorImg(itemcode:int):
	if itemcode == None:
		return None
	return ("image/Item/Amor/"+ ER_Items[itemcode])

def get_ER_ItemsImg(items:ItemModel):
	ItemsImage = {}
	ItemsImage["WeaponImg"] = get_ER_WeaponImg(items.Weapon)
	ItemsImage["Haed"] = get_ER_AmorImg(items.Haed)
	ItemsImage["Clothes"] = get_ER_AmorImg(items.Clothes)
	ItemsImage["Arm"] = get_ER_AmorImg(items.Arm)
	ItemsImage["Leg"] = get_ER_AmorImg(items.Leg)
	ItemsImage["Accessories"] = get_ER_AmorImg(items.Accessories)
	return ItemsImage

# def get_ER_itemsa_Amor_image(itemcode:int):
# 	return ("image/item/Amor" + )

# def get_ER_itemsa_Weapon_image(itemcode:int):
# 	return ("image/item/Weapon/" + )